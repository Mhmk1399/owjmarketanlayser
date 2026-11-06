#!/usr/bin/env bash
set -euo pipefail

tag="${1:-$(date -u +%Y%m%dT%H%M%SZ)}"
image="owj-market-analytics:${tag}"
archive="owj-market-analytics-${tag}.tar.gz"

docker buildx build --platform linux/amd64 --load --tag "${image}" .
docker image inspect "${image}" --format 'Built {{.RepoTags}} for {{.Architecture}}/{{.Os}} ({{.Size}} bytes)'
docker save "${image}" | gzip -1 > "${archive}"
sha256sum "${archive}" > "${archive}.sha256"

printf '%s\n' "${image}" > "${archive}.image"
printf 'Created %s, %s, and %s\n' "${archive}" "${archive}.sha256" "${archive}.image"
