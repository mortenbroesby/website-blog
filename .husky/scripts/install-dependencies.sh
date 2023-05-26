#!/usr/bin/env sh
PACKAGE_CHANGE_BIN="./node_modules/.bin/package-changed"

if [ -f "$PACKAGE_CHANGE_BIN" ]; then
    # We ensure to install dependencies in case anything changed in package.json
    $PACKAGE_CHANGE_BIN --hash-filename .package-changed-hash run "echo 'Found changes in package.json, running pnpm install' && pnpm install || echo 'No changes found...'"
fi
