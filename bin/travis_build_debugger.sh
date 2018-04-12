#!/usr/bin/env bash

export TRAVIS_BRANCH=$(git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
./bin/travis_build.sh