#!/usr/bin/env sh

set -e

npm run build

cd dist/lib

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:kolesnikovav/vuetify-toolkit.git master:gh-pages

cd -