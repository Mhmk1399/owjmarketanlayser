#!/usr/bin/env bash
set -euo pipefail

archive="${1:?Usage: load-offline-image.sh IMAGE.tar.gz}"
sha256sum --check "${archive}.sha256"
gunzip --stdout "${archive}" | docker load
printf 'Loaded image: %s\n' "$(cat "${archive}.image")"
