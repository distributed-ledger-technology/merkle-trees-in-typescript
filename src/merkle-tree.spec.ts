import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { MerkleTree, Helper } from "../mod.ts";

const exampleArray = ["dog", "horse", "cow", "chicken", "rabbit", "bird", "bee", "me"]

Deno.test("should return valid as the investigated entry is in array", async () => {

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

    const merkleTree = new MerkleTree(exampleArray)
    const investigatedEntry = "an entry which is not in the array"
    const proof = merkleTree.getProofElements(exampleArray.indexOf(investigatedEntry))
    const investigatedEntryHashed = Helper.sha256(investigatedEntry)
    const rootHash = merkleTree.getRootHash()
    const isValid = merkleTree.verify(proof, investigatedEntryHashed, rootHash, exampleArray.indexOf(investigatedEntry))

    assertEquals(isValid, false)

})
