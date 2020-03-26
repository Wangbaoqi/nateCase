// const listDiff = import('./util/listDiff.js')
// const patch = require('./patch.js')

let patchEnum = {}
var REPLACE = 0 // 替换原先的节点
var REORDER = 1 // 重新排序
var PROPS = 2 // 修改了节点的属性
var TEXT = 3 // 文本内容改变


patchEnum.REPLACE = REPLACE
patchEnum.REORDER = REORDER
patchEnum.PROPS = PROPS
patchEnum.TEXT = TEXT

// diff
function diff(oldTree, newTree) {
  var index = 0
  // 记录每个节点的差异
  var patchs = {}

  diffWalk(oldTree, newTree, index, patchs)

  return patchs
}

function diffWalk(oldNode, newNode, index, patchs) {
  var currentPatch = []
  // 文本节点
  if(typeof oldNode === 'string' && typeof newNode === 'string') {
    // 新老文本节点不同 值改变了
    if(oldNode !== newNode) {
      currentPatch.push({
        type: patchEnum.TEXT,
        content: newNode
      })
    }
  }else if(newNode !== null && oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // 同一个节点 对比属性
    var propsPatchs = diffProps(oldNode, newNode)
    if(propsPatchs) {
      currentPatch.push({
        type: patchEnum.PROPS,
        props: propsPatchs
      })
    }

    if(!isIgnoreChildren(newNode)) {
      diffChildren(oldNode.children, newNode.children, index, patchs, currentPatch)
    }
  }else if(newNode !== null) {
    // 新老节点不同 代替 
    currentPatch.push({
      type: patchEnum.REPLACE,
      node: newNode
    })
  }
  // 记录新老节点同一层级的差异
  if(currentPatch.length) {
    patchs[index] = currentPatch
  }
}

// 对比节点属性
function diffProps(oldNode, newNode) {
  var count = 0
  var propsPatchs = {}

  var oldProps = oldNode.props
  var newProps = newNode.props

  // 
  for(var prop in oldProps) {
    if(newProps[prop] !== oldProps[prop]) {
      count ++
      propsPatchs[prop] = newProps[prop]
    }
  }

  for(var prop in newProps) {
    if(!oldProps.hasOwnProperty(prop)) {
      count ++
      propsPatchs[prop] = newProps[prop]
    }
  }

  if(!count) return null

  return propsPatchs

}


function diffChildren(oldChildren, newChildren, index, patchs, currentPatch) {
  // 子节点的对比算法  listDiff 使用了第三方插件
  var diffs = listDiff(oldChildren, newChildren, 'key')

  console.log(diffs, 'children lists changed')
  newChildren = diffs.children

  if(diffs.moves.length) {
    var recoderPatch = { type: patchEnum.REORDER, moves: diffs.moves }
    currentPatch.push(recoderPatch)
  }

  var leftNode = null
  var currentNodeIndex = index

  oldChildren.forEach((child, index) => {
    var newChild = newChildren[index]
    currentNodeIndex = (leftNode && leftNode.count) 
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    diffWalk(child, newChild, currentNodeIndex, patchs)
    leftNode = child
  })
}

function isIgnoreChildren(node) {
  return (node.props && node.props.hasOwnProperty('ignore'))
}