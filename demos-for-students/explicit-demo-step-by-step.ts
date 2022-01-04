import hashJs from 'https://deno.land/x/hash/mod-hashjs.ts'

const exampleArray = ["dog", "horse", "cow", "chicken"]

for (const entry of exampleArray) {
    const hashValue = hashJs.sha256().update(entry).digest('hex')
    console.log(`the hash of ${entry} is ${hashValue}.`)
}

// the hash of dog is cd6357efdd966de8c0cb2f876cc89ec74ce35f0968e11743987084bd42fb8944. E(1,1)
// the hash of horse is fd62862b6dc213bee77c2badd6311528253c6cb3107e03c16051aa15584eca1c. E(1,2)
// the hash of cow is beb134754910a4b4790c69ab17d3975221f4c534b70c8d6e82b30c165e8c0c09. E(1,3)
// the hash of chicken is 811eb81b9d11d65a36c53c3ebdb738ee303403cb79d781ccf4b40764e0a9d12a. E(1,4)

const e11Ande12 = "cd6357efdd966de8c0cb2f876cc89ec74ce35f0968e11743987084bd42fb8944fd62862b6dc213bee77c2badd6311528253c6cb3107e03c16051aa15584eca1c"
const proofElement1e21 = hashJs.sha256().update(e11Ande12).digest('hex')
console.log(`proof element number 1 e21: ${proofElement1e21}`)
const e13Ande14 = "beb134754910a4b4790c69ab17d3975221f4c534b70c8d6e82b30c165e8c0c09811eb81b9d11d65a36c53c3ebdb738ee303403cb79d781ccf4b40764e0a9d12a"
const proofElement2e22 = hashJs.sha256().update(e13Ande14).digest('hex')
console.log(`proof element number 2 e22: ${proofElement2e22}`)

const e21Ande22 = "fd0b63475c07217708eef70ed11984a9d5a71b1c059955e88da9b9750a9f52caa12b2f7a5ddb20963c22654f6b22a6955c9956a20c76a0e8f169a437aafb4c98"
const rootHash = hashJs.sha256().update(e21Ande22).digest('hex')
console.log(`rootHash e31: ${rootHash}`)
