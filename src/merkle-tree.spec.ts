import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { MerkleTree, Helper } from "../mod.ts"

Deno.test("should return valid as the investigated entry is in array", async () => {

    const exampleArray = ["dog", "horse", "cow", "chicken", "rabbit", "bird", "bee", "me"]

    for (const investigatedEntry of exampleArray) {
        const merkleTree = new MerkleTree(exampleArray)

        const proof = merkleTree.getProofElements(exampleArray.indexOf(investigatedEntry))
        const investigatedEntryHashed = Helper.sha256(investigatedEntry)
        const rootHash = merkleTree.getRootHash()
        const isValid = merkleTree.verify(proof, investigatedEntryHashed, rootHash, exampleArray.indexOf(investigatedEntry))

        assertEquals(isValid, true)
    }

})

Deno.test("should return invalid as the investigated entry is not in array", async () => {

    const exampleArray = ["dog", "horse", "cow", "chicken", "rabbit", "bird", "bee", "me"]

    const merkleTree = new MerkleTree(exampleArray)
    const investigatedEntry = "an entry which is not in the array"
    const proof = merkleTree.getProofElements(exampleArray.indexOf(investigatedEntry))
    const investigatedEntryHashed = Helper.sha256(investigatedEntry)
    const rootHash = merkleTree.getRootHash()
    const isValid = merkleTree.verify(proof, investigatedEntryHashed, rootHash, exampleArray.indexOf(investigatedEntry))

    assertEquals(isValid, false)

})


Deno.test("should be able to utilize a custom hash function", async () => {

    const exampleArray = [2, 4, 8, 1]

    const merkleTree = new MerkleTree(exampleArray, (x: number) => x * 2 % 10)
    const rootHash = merkleTree.getRootHash()

    assertEquals(rootHash, 8)

    const proof = merkleTree.getProofElements(exampleArray.indexOf(1))
    console.log(proof)

    const investigatedEntry = 1
    const investigatedEntryHashed = investigatedEntry * 2 % 10
    const isValid = merkleTree.verify(proof, investigatedEntryHashed, rootHash, exampleArray.indexOf(investigatedEntry))

    assertEquals(isValid, true)


})
