import { Helper } from "./helper.ts"


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


    public getRootHash(): string {

        return this.hashes.filter((e: IMerkleHashes) => e.level === this.hashes[this.hashes.length - 1].level)[0].hashes[0]

    }


    public getProofElements(investigatedEntryIndex: number): string[] {

        let level = 0
        let levels = this.hashes[this.hashes.length - 1].level
        let relevantIndex = investigatedEntryIndex
        let proofElements: string[] = []

        while (level < levels) {

            relevantIndex = (level === 0) ? investigatedEntryIndex : this.getRelevantIndex(relevantIndex)

            let isLeftNode = (relevantIndex % 2 === 0)

            if (isLeftNode) {
                proofElements.push(this.hashes.filter((e: IMerkleHashes) => e.level === level)[0].hashes[relevantIndex + 1]) // same level proof comes from right
            } else {
                proofElements.push(this.hashes.filter((e: IMerkleHashes) => e.level === level)[0].hashes[relevantIndex - 1]) // same level proof comes from left
            }

            level++

        }

        return proofElements

    }


    public getHashes(): IMerkleHashes[] {

        return this.hashes

    }


    public getRelevantIndex(previousIndex: number): number {

        return Math.floor(previousIndex / 2)

    }

    private generateTree(array: any[]) {

        let level = 0
        let itemsOnThisLevel = array

        while (itemsOnThisLevel.length > 1) {
            itemsOnThisLevel = this.getHashesForLevel(level, itemsOnThisLevel)

            this.hashes.push({ level, hashes: itemsOnThisLevel })

            level++
        }

    }


    private getHashesForLevel(level: number, array: any[]): string[] {

        let hashesOnThisLevel: string[] = []

        for (let i = 0; i <= array.length; i++) {
            if (level === 0) {
                hashesOnThisLevel.push(Helper.sha256(array[i]))
            } else if (i % 2 === 0 && i > 0) {
                const hash: string = Helper.sha256(`${array[i - 2]}${array[i - 1]}`)
                hashesOnThisLevel.push(hash)
            }
        }

        return hashesOnThisLevel

    }


    private checkInput(array: any[]) {

        if (!(Helper.isPowerOfTwo(array.length) && array.length >= 4)) {
            throw new Error(`This module only accepts x to the power of 2 items - and at least 4 items.`)
        }

    }

}
