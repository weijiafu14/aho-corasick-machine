"use strict"

var createTrie = require("array-trie")
var createAC = require("../aho-corasick-machine.js")

var trie = createTrie()

console.log('trie.set([1,2,3,4],1234)\ntrie.set([2,3,4], 234)\ntrie.set([6,7,8], 678)\ntrie.set([1,2], 12)\ntrie.set([2,3], 23)\ntrie.set([3,4],34)')
trie.set([1,2,3,4],1234)
trie.set([2,3,4], 234)
trie.set([6,7,8], 678)
trie.set([1,2], 12)
trie.set([2,3], 23)
trie.set([3,4],34)

var automata = createAC(trie)

var data = [1,2,3,4,5,6,7,8,9]
console.log('ACmachine push:  [1,2,3,4,5,6,7,8,9]\nMatch: ')
var dataLength = data.length
for(var state=automata, i=0; i<dataLength; state=state.push(data[i++])) {
  if(state.value.length>0) {
    console.log(state.value)
  }
}