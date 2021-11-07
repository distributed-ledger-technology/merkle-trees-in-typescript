import { Helper } from "./helper.ts";

export interface IMerkleHashes {
    level: number,
    hashes: string[]
}

export class MerkleTree {

    private hashes: IMerkleHashes[] = []

    public constructor(array: any[]) {

        this.checkInput(array)

        this.generateTree(array)

    }

    private generateTree(array: any[]) {
        let level = 0
        let itemsToBeHashed = array

        while (itemsToBeHashed.length > 1) {
            itemsToBeHashed = this.addLevel(level, itemsToBeHashed)
            level++
        }
    }

    private addLevel(level: number, array: any[]): string[] {
        let hashesOnThisLevel: string[] = []

        if (level === 0) {

            for (const entry of array) {
                hashesOnThisLevel.push(Helper.sha256(entry))
            }

        } else {
            for (let i = 0; i <= array.length; i++) {
                if (i % 2 === 0 && i > 0) {
                    const hash: string = Helper.sha256(`${array[i - 2]}${array[i - 1]}`)
                    hashesOnThisLevel.push(hash)
                }
            }

        }

        this.hashes.push({ level, hashes: hashesOnThisLevel })

        return hashesOnThisLevel

    }

    public verify(proof: string[], leaf: string, rootHash: string, index: number) {

        let hash = leaf

        for (let i = 0; i < proof.length; i++) {

            if (index % 2 === 0) {
                hash = Helper.sha256(`${hash}${proof[i]}`)
            } else {
                hash = Helper.sha256(`${proof[i]}${hash}`)
            }

            index = Math.floor(index / 2)
        }

        return hash === rootHash

    }

    public getHashedLeafs(): string[] {
        return this.hashes.filter((e: IMerkleHashes) => e.level === 0)[0].hashes
    }

    public getHashedBranches(): string[] {
        return this.hashes.filter((e: IMerkleHashes) => e.level === 1)[0].hashes
    }

    public getRootHash(): string {
        return this.hashes.filter((e: IMerkleHashes) => e.level === 2)[0].hashes[0]
    }

    public getProofElements(investigatedEntryIndex: number): string[] {
        let level = 0
        let levels = this.hashes[this.hashes.length - 1].level
        let proofElements: string[] = []

        console.log(this.hashes)
        console.log(`levels: ${levels}`)
        console.log(`investigatedEntryIndex: ${investigatedEntryIndex}`)

        let isLeftNode = (investigatedEntryIndex % 2 === 0)

        if (isLeftNode) {
            proofElements.push(this.hashes.filter((e: IMerkleHashes) => e.level === level)[0].hashes[investigatedEntryIndex + 1]) // same level proof comes from right
        } else {
            proofElements.push(this.hashes.filter((e: IMerkleHashes) => e.level === level)[0].hashes[investigatedEntryIndex - 1]) // same level proof comes from left
        }

        level++

        let relevantIndexForBranches = Math.floor(investigatedEntryIndex / (level + 1))

        // if (investigatedEntryIndex < 2) {
        //     relevantIndexForBranches = 0
        // } else {
        //     relevantIndexForBranches = 1
        // }

        while (level < levels) {
            console.log(`getting proof element for level ${level}`)
            let isLeftNode = (relevantIndexForBranches % 2 === 0)

            if (isLeftNode) {
                proofElements.push(this.hashes.filter((e: IMerkleHashes) => e.level === level)[0].hashes[relevantIndexForBranches + 1]) // same level proof comes from right
            } else {
                proofElements.push(this.hashes.filter((e: IMerkleHashes) => e.level === level)[0].hashes[relevantIndexForBranches - 1]) // same level proof comes from left

            }
            level++
        }

        // while (level < levels) {
        //     if (relevantIndex % 2 === 0) {
        //         proofElements.push(this.hashes.filter((e: IMerkleHashes) => e.level === level)[0].hashes[1])
        //         // proofElements.push(this.hashes.filter((e: IMerkleHashes) => e.level === level)[investigatedEntryIndex].hashes[1])
        //     } else {
        //         proofElements.push(this.hashes.filter((e: IMerkleHashes) => e.level === level)[0].hashes[0])
        //         relevantIndex = 0
        //     }
        //     level++
        // }

        return proofElements
    }

    private checkInput(array: any[]) {
        if (Helper.isPowerOfTwo(array.length) && array.length >= 4) {
            // console.log("input is fine")
        } else {
            throw new Error(`This module only accepts x to the power of 2 items - and at least 4 items.`)
        }
    }

}


