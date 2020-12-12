/**
 * Pure function to split the array into a chunk of equal size
 * @param {Array} arr        Array that needs to be divided into chunk
 * @param {number} chunkSize Size of the chunks
 * @return {Array}           `chunk of given size`, last chunk can be smaller
 */
function createChunk(arr: any[], chunkSize: number): any[] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize)
        result.push(arr.slice(i, i + chunkSize));
    return result;
}

// List of vowels including the Finnish and Swedish
const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y', 'å', 'ä', 'ö'];

export class CodeChallenge {
    map = {};
    constructor(public sentence: string) {}

    transform() {
        const words = (this.sentence || '').split(' ');
        // Don't do any transformation if there is
        // only one word or empty string
        if (words.length <= 1) {
            return this.sentence;
        }

        // Create the positional mapping for each words
        words.forEach((v, i) => (this.map[i] = v));

        // Filter out the spaces for transformations
        const keysWithoutSpaces = Object.keys(this.map).filter(
            (k) => this.map[k].length
        );

        // Divide the valid words into a pair of two and filter out the
        // last one if its of length one
        const validPairs = createChunk(keysWithoutSpaces, 2).filter(
            (pair) => pair.length === 2
        );

        validPairs.forEach((pair) => this.transformTextPairs(pair));

        //Finally join the values of transformed mapping and return
        return Object.values(this.map).join(' ');
    }

    // Transforms the text pairs
    transformTextPairs(pair: string[]) {
        const fK = pair[0]; // First key
        const sK = pair[1]; // Second key

        const fV = this.map[fK]; // First original value
        const sV = this.map[sK]; // Second original value

        // Text to replace in the values
        const fTxtToReplace = this.getTxtPartToReplace(fV);
        const sTxtToReplace = this.getTxtPartToReplace(sV);

        // Replace the original values or pairs
        this.map[fK] = fV.replace(fTxtToReplace, sTxtToReplace);
        this.map[sK] = sV.replace(sTxtToReplace, fTxtToReplace);
    }

    // Returns the part of text that needs to be replaced
    getTxtPartToReplace(txt: string) {
        let sliceIndex = 0;
        const characters = txt.split('');
        for (let i = 0; i < characters.length; i++) {
            const isVowel = VOWELS.indexOf(characters[i].toLowerCase()) !== -1;
            if (isVowel) {
                sliceIndex = i + 1;
            }
            if (sliceIndex && !isVowel) {
                break;
            }
        }
        return txt.slice(0, sliceIndex);
    }
}
