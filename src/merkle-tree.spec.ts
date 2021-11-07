import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { MerkleTree, Helper } from "../mod.ts";

Deno.test("should return valid as the investigated entry is in array", async () => {

    // const exampleArray = ["dog", "horse", "cow", "chicken", "rabbit", "bird", "bee", "me"]
    const exampleArray = ["dog", "horse", "cow", "chicken"]

    const merkleTree = new MerkleTree(exampleArray)

    const investigatedEntry = "dog"
    const proof = merkleTree.getProof(exampleArray.indexOf(investigatedEntry))
    const investigatedEntryHashed = Helper.sha256(investigatedEntry)
    const rootHash = merkleTree.getRootHash()
    const isValid = merkleTree.verify(proof, investigatedEntryHashed, rootHash, exampleArray.indexOf(investigatedEntry))

    if (isValid) {
        console.log(`we can be pretty sure that ${investigatedEntry} is in the array at index: ${exampleArray.indexOf(investigatedEntry)}`)
    } else {
        console.log(`${investigatedEntry} is not in the array`)
    }
})

Deno.test("should return the correct proof for an element at a specific index", async () => {

    const exampleArray = ["dog", "horse", "cow", "chicken"]
    const merkleTree = new MerkleTree(exampleArray)

    const proof = merkleTree.getProof(exampleArray.indexOf("dog"))

    const expectedProof = ["fd62862b6dc213bee77c2badd6311528253c6cb3107e03c16051aa15584eca1c", "a12b2f7a5ddb20963c22654f6b22a6955c9956a20c76a0e8f169a437aafb4c98"]

    assertEquals(proof, expectedProof)

})