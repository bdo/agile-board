#!/bin/sh

yarn global add serve
yarn install
yarn css
yarn build
serve -s build -l 80
