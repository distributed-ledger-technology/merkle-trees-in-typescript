// import { MerkleTree, Helper } from "https://deno.land/x/merkletrees/mod.ts"
import { MerkleTree, Helper } from "./mod.ts"

const exampleArray = ["dog", "horse", "cow", "chicken"]

const merkleTree = new MerkleTree(exampleArray)

const investigatedEntry = "dog"
const proofElements = merkleTree.getProofElements(exampleArray.indexOf(investigatedEntry))
const investigatedEntryHashed = Helper.sha256(investigatedEntry)
const rootHash = merkleTree.getRootHash()
const isValid = merkleTree.verify(proofElements, investigatedEntryHashed, rootHash, exampleArray.indexOf(investigatedEntry))

if (isValid) {
    console.log(`we can be pretty sure that ${investigatedEntry} is in the array at index: ${exampleArray.indexOf(investigatedEntry)}`)
} 
