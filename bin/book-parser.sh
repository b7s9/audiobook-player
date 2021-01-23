#!/bin/sh

# ----------------------------------------
# Functions
# ----------------------------------------

# ----------------------------------------
# Procedure
# ----------------------------------------
cd "$(dirname "$0")"
files=`ls audio/**/chapter-parser.sh`

for entry in $files
do
  echo "running $entry"
  $entry
done
echo ""
echo "remember JSON cannot include trailing commas"

