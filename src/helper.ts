import hashJs from 'https://deno.land/x/hash/mod-hashjs.ts'

export class Helper {

    public static sha256(valueToBeHashed: any) {
        return hashJs.sha256().update(valueToBeHashed).digest('hex')
    }

    public static isPowerOfTwo(magicNumber: number) {
        return (magicNumber & (magicNumber - 1)) == 0;
    }

}