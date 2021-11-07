# Merkle Tree 

Merkle Trees became especially famous in the context of Bitcoin's Simple Payment Verification - see chapter 8 in the [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf).  

In general you can use them to proof that a specific element is available at a specific index within an array (block, ...).  


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
} 
```
