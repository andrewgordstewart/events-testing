# events-testing
Reproduction of an issue around events testing using ethers.


```
// Install dependencies
$ yarn

// passes
$ yarn test 

$ git checkout 6730ee3827662a29ea96e9576b0a9a1e96a47102
// fails
$ yarn test

// passes
$ yarn testInBand
```
