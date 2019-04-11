var bounds = require("binary-search-bounds")



class MachineNode{
  constructor(){
    this.next = null;
    this.children = [];
    this.symbols = null;
    this.value = [];
  }
  push(symbol){
    let node = this;
    let root = null;
    while(true){
      let index = bounds.eq(node.symbols,symbol)
      if(index>=0){
        return node.children[index]
      }else{
        if(node.next)
          node = node.next
        else
          return node;
      }
    }
  }
}

var convertTrieToMachine = (trieTree)=>{
  let machineNode = new MachineNode();
  machineNode.symbols = trieTree.symbols.slice();
  if(trieTree.value)
    machineNode.value.push(trieTree.value);
  for(let i=0; i<trieTree.children.length; i++){
    machineNode.children.push(convertTrieToMachine(trieTree.children[i]))
  }
  return machineNode;
}

var createStateMachine = (trieTree)=>{
  const root = convertTrieToMachine(trieTree)
  for(let child of root.children){
    child.next = root
  }
  for(let child of root.children){
    for(let grandChiIndex=0;grandChiIndex<child.children.length;grandChiIndex++){
      //例：baa的next时，先回退到ba，用ba的next找到a，再在a下找aa就找到了baa的next
      let grandChild = child.children[grandChiIndex];
      grandChild.next = root
      let grandChildSym = child.symbols[grandChiIndex];
      let rmPreSuffix = child.next;
      while(rmPreSuffix){
        let prefixIndex = bounds.eq(rmPreSuffix.symbols,grandChildSym);
        if(prefixIndex>=0){
          grandChild.next = rmPreSuffix.children[prefixIndex]
          if(grandChild.next.value.length>0){
            grandChild.value = grandChild.value.concat(grandChild.next.value)
          }
          break;
        }else {
          rmPreSuffix = rmPreSuffix.next;
        }
      }
      //逐层遍历js中树的一种方法
      root.children.push(grandChild)
    }
  }
  return root;
  
}
module.exports = createStateMachine