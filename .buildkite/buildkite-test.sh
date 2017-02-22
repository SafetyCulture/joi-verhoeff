# .buildkite/buildkite-test.sh

set -e

n 0.10.33 && rm -rf ./node_modules && npm i && npm t && \
n 4.7.2 && rm -rf ./node_modules && npm i && npm t && \
n 6.9.4 && rm -rf ./node_modules && npm i && npm t
