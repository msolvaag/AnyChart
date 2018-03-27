#!/bin/bash

# ---- Variables (for all builds) --------------------------------------------------------------------------------------
COMMIT_HASH=$(git rev-parse --short HEAD)
BUILD_VERSION=$(python build.py version)
IS_RELEASE_BUILD=false
IS_RC_BUILD=false
IS_PREVIEW_BUILD=false
IS_DEV_BUILD=false

if [ "${TRAVIS_BRANCH}" = "master" ]; then
    VERSION=${BUILD_VERSION}
    IS_RELEASE_BUILD=true
elif [ "${TRAVIS_BRANCH}" = "develop" ]; then
    VERSION=${BUILD_VERSION}-${COMMIT_HASH}
    IS_PREVIEW_BUILD=true
elif [[ "${TRAVIS_BRANCH}" =~ ^RC-([0-9]+\.[0-9]+\.[0-9]+)$ ]]; then
    RC_VERSION=${BASH_REMATCH[1]}
    if [ "${BUILD_VERSION}" = "${RC_VERSION}" ]; then
        VERSION=$(python build.py version)
        IS_RC_BUILD=true
    else
        VERSION=${TRAVIS_BRANCH}
        IS_DEV_BUILD=true
    fi
else
    VERSION=${TRAVIS_BRANCH}
    IS_DEV_BUILD=true
fi
INSTALL_PACKAGE_NAME=anychart-installation-package-${VERSION}.zip

echo Version: ${VERSION}
echo Branch: ${TRAVIS_BRANCH}
echo Commit Hash: ${COMMIT_HASH}

echo Is release build: ${IS_RELEASE_BUILD}
echo Is RC build: ${IS_RC_BUILD}
echo Is dev preview build: ${IS_PREVIEW_BUILD}
echo Is develop build: ${IS_DEV_BUILD}
# ---- Variables (for all builds) --------------------------------------------------------------------------------------


# ---- Drop CDN cache for uploaded files (for all builds) --------------------------------------------------------------
echo Dropping CDN cache
echo ${VERSION} ${CDN_ALIASE} ${CDN_CONSUMER_KEY} ${CDN_CONSUMER_SECRET} ${CDN_ZONE_ID}
