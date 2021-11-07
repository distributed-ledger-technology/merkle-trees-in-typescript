# Merkle Tree 

You can use this to proof a specific element is available at a specific index within an array in an efficient way.

## Usage Example

```sh

deno run https://deno.land/x/merkletrees/usage-example.ts

```

```ts
import { MerkleTree, Helper } from "https://deno.land/x/merkletrees/mod.ts"

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
```