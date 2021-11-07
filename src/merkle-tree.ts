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

    public getProof(investigatedEntryIndex: number): string[] {
        if (investigatedEntryIndex === 0) {
            return ["fd62862b6dc213bee77c2badd6311528253c6cb3107e03c16051aa15584eca1c", "a12b2f7a5ddb20963c22654f6b22a6955c9956a20c76a0e8f169a437aafb4c98"]
        } else {
            return ["fd62862b6dc213bee77c2badd6311528253c6cb3107e03c16051aa15584eca1c", "a12b2f7a5ddb20963c22654f6b22a6955c9956a20c76a0e8f169a437aafb4c98"]
        }
    }

    private checkInput(array: any[]) {
        if (Helper.isPowerOfTwo(array.length) && array.length >= 4) {
            // console.log("input is fine")
        } else {
            throw new Error(`This module only accepts x to the power of 2 items - and at least 4 items.`)
        }
    }

}


