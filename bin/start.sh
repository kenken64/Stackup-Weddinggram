#!/bin/bash
export AWS_ACCESS_KEY_ID=AKIAIWKXTGYCOTZW6QYA
export AWS_SECRET_ACCESS_KEY=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
forever start ../server/app.js > ../logs/output.log &
