/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(text) {
    const chains = {};
    for (let i = 0; i < this.words.length -1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      if (!chains[word]) {
        chains[word] = [];
      }
      chains[word].push(nextWord)
    }
    const lastWord = this.words[this.words.length - 1]
    chains[lastWord] = [null]
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let result = []
    let random = Math.random() * this.chains - 1; 
    let currentWord = randomWord(this.chains[random])

    while (result.length < numWords && currentWord !== null) {
      result.push(currentWord)
      currentWord = randomWord(this.chains)
    }
    return result.join(' ')
}}

module.exports = { MarkovMachine, }