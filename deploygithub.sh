#!/usr/bin/env bash

set -e &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m 'deploy' &&
git push -f git@github.com:sulimi/sim-shop.git master:gh-pages &&
cd -