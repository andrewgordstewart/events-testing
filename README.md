# events-testing
Reproduction of an issue around events testing using ethers.

```
// Install dependencies
$ yarn

// Checkout commit where tests use transaction receipt
$ git checkout 6f6f51dedb5f291714f191b45b32ee1f3a9672f7

// This was tested locally against a ganache-cli server running on localhost
// on its default port, which is 8545.
// It's best to run this in a separate shell, but for completeness, start one in
// a background process
$ npx ganache-cli &

// passes
$ yarn test 

// Checkout commit where tests use this technique
// https://docs.ethers.io/ethers.js/html/cookbook-testing.html#contract-events
$ git checkout 6730ee3827662a29ea96e9576b0a9a1e96a47102
// fails
$ yarn test

// passes
$ yarn testInBand
```
