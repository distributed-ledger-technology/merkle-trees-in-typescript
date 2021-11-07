import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { MerkleTree, Helper } from "../mod.ts";

Deno.test("should return valid as the investigated entry is in array", async () => {

    // const exampleArray = ["dog", "horse", "cow", "chicken", "rabbit", "bird", "bee", "me"]
    const exampleArray = ["dog", "horse", "cow", "chicken"]

    const merkleTree = new MerkleTree(exampleArray)

    const investigatedEntry = "dog"
    const proof = merkleTree.getProofElements(exampleArray.indexOf(investigatedEntry))
    const investigatedEntryHashed = Helper.sha256(investigatedEntry)
    const rootHash = merkleTree.getRootHash()
    const isValid = merkleTree.verify(proof, investigatedEntryHashed, rootHash, exampleArray.indexOf(investigatedEntry))

    if (isValid) {
        console.log(`we can be pretty sure that ${investigatedEntry} is in the array at index: ${exampleArray.indexOf(investigatedEntry)}`)
    } else {
        console.log(`${investigatedEntry} is not in the array`)
    }
})

Deno.test("should return the correct proof for an element at index 0", async () => {

    const exampleArray = ["dog", "horse", "cow", "chicken"]
    const merkleTree = new MerkleTree(exampleArray)

    const proof = merkleTree.getProofElements(exampleArray.indexOf("dog"))

    const expectedProofElement1 = "fd62862b6dc213bee77c2badd6311528253c6cb3107e03c16051aa15584eca1c"
    const expectedProofElement2 = "a12b2f7a5ddb20963c22654f6b22a6955c9956a20c76a0e8f169a437aafb4c98"

    assertEquals(proof[0], expectedProofElement1)
    assertEquals(proof[1], expectedProofElement2)


})

Deno.test("should return the correct proof for an element at index 1", async () => {

    const exampleArray = ["dog", "horse", "cow", "chicken"]
    const merkleTree = new MerkleTree(exampleArray)

    const proof = merkleTree.getProofElements(exampleArray.indexOf("horse"))

    const expectedProofElement1 = "cd6357efdd966de8c0cb2f876cc89ec74ce35f0968e11743987084bd42fb8944"
    const expectedProofElement2 = "a12b2f7a5ddb20963c22654f6b22a6955c9956a20c76a0e8f169a437aafb4c98"

    assertEquals(proof[0], expectedProofElement1)
    assertEquals(proof[1], expectedProofElement2)

})

Deno.test("should return the correct proof for an element at index 2", async () => {

    const exampleArray = ["dog", "horse", "cow", "chicken"]
    const merkleTree = new MerkleTree(exampleArray)

    const proof = merkleTree.getProofElements(exampleArray.indexOf("cow"))

    const expectedProofElement1 = "811eb81b9d11d65a36c53c3ebdb738ee303403cb79d781ccf4b40764e0a9d12a"
    const expectedProofElement2 = "fd0b63475c07217708eef70ed11984a9d5a71b1c059955e88da9b9750a9f52ca"

    assertEquals(proof[0], expectedProofElement1)
    assertEquals(proof[1], expectedProofElement2)

})

Deno.test("should return the correct proof for an element at index 4", async () => {

    const exampleArray = ["dog", "horse", "cow", "chicken"]
    const merkleTree = new MerkleTree(exampleArray)

    const proof = merkleTree.getProofElements(exampleArray.indexOf("chicken"))

    const expectedProofElement1 = "beb134754910a4b4790c69ab17d3975221f4c534b70c8d6e82b30c165e8c0c09"
    const expectedProofElement2 = "fd0b63475c07217708eef70ed11984a9d5a71b1c059955e88da9b9750a9f52ca"

    assertEquals(proof[0], expectedProofElement1)
    assertEquals(proof[1], expectedProofElement2)

})