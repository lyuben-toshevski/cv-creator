#!/bin/bash
RESTORE='\033[0m'
RED='\033[00;31m'
YELLOW='\033[00;33m'
BLUE='\033[00;34m'

FOUND_FORBIDDEN=''
FOUND_WARNING=''

#tests staged spec.ts files

  for i in `git diff --cached --name-only -- '*.spec.ts'`
  do

    if git show :$i | grep -q -E '^[[:space:]]*fdescribe\(|^[[:space:]]*fit\('; then

      FOUND_FORBIDDEN+="${BLUE}$i ${RED}contains ${RESTORE}\"fit or fdescribe\"${RESTORE}\n"

    fi

    if git show :$i | grep -E '^[[:space:]]*xit\(|^[[:space:]]*xdescribe\('; then

      FOUND_WARNING+="${YELLOW}$i ${RED}contains ${RESTORE}\"xit or xdescribe\"${RESTORE}\n"

    fi
  done

# if FOUND_WARNING is not empty print warning
# PRINT the results (colorful-like)
if [[ ! -z $FOUND_WARNING ]]; then
  printf "${YELLOW}WARNING\n"
  printf "$FOUND_WARNING"
fi

# if FOUND_FORBIDDEN is not empty, REJECT the COMMIT
# PRINT the results (colorful-like)
if [[ ! -z $FOUND_FORBIDDEN ]]; then
  printf "${YELLOW}COMMIT REJECTED\n"
  printf "$FOUND_FORBIDDEN"
  exit 1
fi

# nothing found? let the commit happen
exit 0
