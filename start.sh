#!/bin/bash
set -a
source .env.production
set +a
exec node_modules/next/dist/bin/next start
