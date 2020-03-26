
// 将真实dom 模拟成 虚拟dom 对象

// class Element {
//   constructor(tagName, props, children) {
//     this.tagName = tagName
//     this.props = props
//     this.children = children

//     this.count = 0

//     this.initElement()
//   }

//   initElement() {
//     let count = 0
//     if(this.props.key) {
//       this.key = key
//     }

//     this.children.forEach((child, index) => {
//       if(child instanceof Element) {
//         count += child.count
//       }else {
//         this.children[index] = child
//       }
//       count++ 
//     })
//     this.count = count
//   }
// }


// function createElement(tagName, props, children) {
//   return new Element(tagName, props, children)
// }


/**
 *  @param {String} tagName 标签名称
 *  @param {String} props 标签属性
 *  @param {String} children 子元素
 **/
function Element(tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children

  if(props.key) {
    this.key = props.key
  }
  // 子元素个数
  var count = 0 
  children.forEach(function(child, index) {
    if(child instanceof Element) {
      count += child.count
    }else {
      children[index] = '' + child
    }
    count++
  })

  this.count = count

}

Element.prototype.render = function() {
  var el = document.createElement(this.tagName)

  var props = this.props

  // 设置节点的属性
  for(var item in props) {
    el.setAttribute(item, props[item])
  }

  var children = this.children
  children.forEach(function(child) {
    // 子元素是非文本节点 继续递归render 是文本节点 创建文本dom节点
    var childEl = (child instanceof Element) ?
      child.render() : document.createTextNode(child)

    el.appendChild(childEl)
  })

  return el
}




function createElement(tagName, props, children) {
  return new Element(tagName, props, children)
}