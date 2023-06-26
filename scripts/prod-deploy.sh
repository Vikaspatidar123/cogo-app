#!/bin/bash

# 1. Pull the latest code from the repository
git pull

# 2. Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 3. Check if node, pnpm and pm2 are installed
which node
which pnpm
which pm2

# 4. Install dependencies and build the project
pnpm install --frozen-lockfile
pnpm build

# 5. Start/Restart the project
pnpm pm2 describe project-new-app > /dev/null
APP_RUNNING=$?
if [ "${APP_RUNNING}" -ne 0 ]; then
  pnpm run pm2:start
else
  pnpm run pm2:restart
fi;



