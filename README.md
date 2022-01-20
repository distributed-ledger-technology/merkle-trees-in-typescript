# Merkle Trees 

Merkle Trees are data structures which became especially famous in the context of Bitcoin's Simple Payment Verification - see chapter 8 in the [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf).  

In general you can use Merkle Trees to proof / validate that a specific element is available at a specific index within an array (block, ...) - without the need to load the elements themselves.   

## Usage Example

```sh

deno run https://deno.land/x/merkletrees/usage-example.ts

```

```ts  

import { MerkleTree, Helper } from "https://deno.land/x/merkletrees/mod.ts"

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

```

For more sophisticated examples please check the [unit tests](https://github.com/distributed-ledger-technology/merkle-trees/blob/main/src/merkle-tree.spec.ts).

## Unit Tests / Executable Specifications

You can also execute the [unit tests](https://github.com/distributed-ledger-technology/merkle-trees/blob/main/src/merkle-tree.spec.ts) via:  
  

```sh

deno test https://deno.land/x/merkletrees/src/merkle-tree.spec.ts

```

## Explaining Merkle Trees in General
Merkle trees are built up by hashing the neighbour element up the ladder. In case of questions feel free to raise an issue.

![diagram](https://user-images.githubusercontent.com/43786652/148436374-ca26db28-ddca-4390-a89c-599da1054e85.jpg)


## Explaining the Role of Merkle Trees in Bitcoin's Simple Payment Verification
It is possible to verify payments without running a full network node. A user only needs to keep a copy of the block headers of the longest proof-of-work chain, which he can get by querying network nodes until he's convinced he has the longest chain, and obtain the Merkle branch linking the transaction to the block it's timestamped in. He can't check the transaction for himself, but by linking it to a place in the chain, he can see that a network node has accepted it,
and blocks added after it further confirm the network has accepted it. 

Check the [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf) and [this video](https://www.youtube.com/watch?v=Lx9zgZCMqXE) to explore the whole game. 

