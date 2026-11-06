# Offline Ubuntu deployment

The production topology uses one immutable image and three independently
restartable processes: API, crawler, and scorer. Only the API joins the
existing `web_app-network`; no Analytics port is published on the host.

## Build and transfer

```bash
./scripts/build-offline-image.sh 20261106-split1
ssh-copy-id root@109.122.247.27
ssh root@109.122.247.27 'mkdir -p /opt/apps/analytics'
scp \
  owj-market-analytics-20261106-split1.tar.gz \
  owj-market-analytics-20261106-split1.tar.gz.sha256 \
  owj-market-analytics-20261106-split1.tar.gz.image \
  compose.production.yaml \
  root@109.122.247.27:/opt/apps/analytics/
scp scripts/load-offline-image.sh root@109.122.247.27:/opt/apps/analytics/
```

`ssh-copy-id` asks for the root password once. Never place the password in a
script, shell history, repository, or chat.

## Server configuration

Create these files directly on the server with mode `0600`:

- `/opt/apps/analytics/.env`: image tag and crawler control token, based on
  `deploy/env.deploy.example`.
- `/opt/apps/analytics/.env.production.shared`: rotated Atlas URI and bounded
  crawler settings, based on `deploy/env.production.shared.example`.
- `/opt/apps/analytics/.env.production.api`: rotated API-only OpenAI/Neshan
  credentials, based on `deploy/env.production.api.example`.

Generate the control token on the server:

```bash
openssl rand -hex 32
chmod 600 /opt/apps/analytics/.env*
```

Ensure Atlas allows `109.122.247.27/32` before starting the services.

## Load and start

```bash
cd /opt/apps/analytics
chmod +x load-offline-image.sh
./load-offline-image.sh owj-market-analytics-20261106-split1.tar.gz
docker compose -f compose.production.yaml config --quiet
docker compose -f compose.production.yaml up -d
docker compose -f compose.production.yaml ps
docker compose -f compose.production.yaml logs --since 10m
```

## Verification

```bash
docker exec owj-analytics-api node -e \
  "fetch('http://127.0.0.1:4567/health').then(r=>r.text()).then(console.log)"
docker exec owj-analytics-crawler node -e \
  "fetch('http://127.0.0.1:4568/health').then(r=>r.text()).then(console.log)"
docker stats --no-stream owj-analytics-api owj-analytics-crawler owj-analytics-scorer
docker inspect --format '{{.Name}} oom={{.State.OOMKilled}} restarts={{.RestartCount}}' \
  owj-analytics-api owj-analytics-crawler owj-analytics-scorer
```

Resource samples are emitted every minute as structured Docker logs:

```bash
docker compose -f compose.production.yaml logs --since 30m | grep 'resource.sample'
```

Do not add the Nginx route until the API health check passes. Add the API to a
dedicated authenticated subdomain where possible; do not route crawler or
scorer health/control ports through Nginx.
