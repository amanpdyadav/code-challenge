import { CodeChallenge } from './code-challange';

export const chai = require('chai');
export const expect = chai.expect;

describe('Code challenge test', () => {
    it('swap the beginnings of the words, up to and including the first vowel', async () => {
        const result = new CodeChallenge('fooma barbu').transform();
        expect(result).to.equal('bama foorbu');
    });

    it('If there is an odd word at the end of the string, leave that as is', async () => {
        const result = new CodeChallenge('hello').transform();
        expect(result).to.equal('hello');

        const result1 = new CodeChallenge('foo bar baz').transform();
        expect(result1).to.equal('ba foor baz');
    });

    it('Words are separated by spaces; please preserve exact spacing', async () => {
        const result = new CodeChallenge('amama   bomomo foo').transform();
        expect(result).to.equal('bomama   amomo foo');
    });

    it('You can treat punctuation as part of words', async () => {
        const result = new CodeChallenge('I\'d rather die here.').transform();
        expect(result).to.equal('ra\'d Ither he diere.');
    });

    it('Vowels include (at least) those in the Finnish alphabet (a, e, i, o, u, y, å, ä, ö)', async () => {
        const result = new CodeChallenge('vuoirkage mäölnö').transform();
        expect(result).to.equal('mäörkage vuoilnö');
    });

    it('You can treat as a consonant any character that is not space or a vowel', async () => {
        const result = new CodeChallenge('.. test').transform();
        expect(result).to.equal('te.. st');
    });

    it('Donald Trump -> Trunald Domp', async () => {
        const result = new CodeChallenge('Donald Trump').transform();
        expect(result).to.equal('Trunald Domp');
    });

    it('Supercalifragilisticexpialidocious -> Supercalifragilisticexpialidocious', async () => {
        const result = new CodeChallenge('Supercalifragilisticexpialidocious').transform();
        expect(result).to.equal('Supercalifragilisticexpialidocious');
    });

    it('death, famine, and pestilence -> fath, deamine, pend astilence', async () => {
        const result = new CodeChallenge('death, famine, and pestilence').transform();
        expect(result).to.equal('fath, deamine, pend astilence');
    });

    it('Empty sentence', async () => {
        const result = new CodeChallenge(null).transform();
        expect(result).to.equal(null);
    });
});
