#!/usr/bin/env bash

yarn build &&
cd build &&
git init &&
git add . &&
git commit -m 'deploy' &&
git remote add origin git@gitee.com:sulimi/sim-shop.git&&
git branch gh-pages &&
git push -u origin gh-pages -f &&
cd -