#!/bin/bash

#production
git reset --hard
git checkout master
git pull origin master

npm i yarn -g
yarn
yarn run build
pm2 start ecosystem.config.js


#development
# git reset --hard
# git checkout develops
# git pull origin develop

# npm i
# pm2 start "npm run dev" --name=BookNest
