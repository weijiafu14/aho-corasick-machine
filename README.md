# aho-corasick-machine
Aho-Corasick machine for matching

## Example

```js
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
```

###### output:

```
trie.set([1,2,3,4],1234)
trie.set([2,3,4], 234)
trie.set([6,7,8], 678)
trie.set([1,2], 12)
trie.set([2,3], 23)
trie.set([3,4],34)
ACmachine push:  [1,2,3,4,5,6,7,8,9]
Match: 
[ 12 ]
[ 23 ]
[ 1234, 234, 34 ]
[ 678 ]
```

## Install

```
npm install aho-corasick-machine
```

## API

```js
const createACMachine = require("aho-corasick-machine")
```

## Constructor

```js
let rootNode = createACMachine(trie)
```

Creates an Aho-Corasick machine from the trie encoded as an [array-trie](https://github.com/mikolalysenko/array-trie)

**Returns** the root node of  new Aho-Corasick Machine

## Methods

#### node.push(symbol)

symbol is the next character in the stream to process

**Return** the next state of the automatic machine.

#### node.value

An array of the values where the stream matches

If no matches, its length is zero

#### node.next

A pointer to the next entry.

For example, when matching "1234" at node1, node1.next means it is matching "234"

