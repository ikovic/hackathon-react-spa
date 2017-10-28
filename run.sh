#!/bin/bash
set -e

trap 'exit 0' SIGINT SIGTERM

npm run build
npm run serve
