#!/bin/sh
# Publishes posts to Standard.site with the app password from the macOS Keychain.
# Store it once: security add-generic-password -a woza.ink -s sequoia-atp -w
set -eu
ATP_APP_PASSWORD="$(security find-generic-password -a woza.ink -s sequoia-atp -w)"
ATP_IDENTIFIER=woza.ink
export ATP_APP_PASSWORD ATP_IDENTIFIER
exec pnpm dlx sequoia-cli@0.5.7 publish "$@"
