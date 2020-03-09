function observe(value, vm) {
  if(!value || typeof value !== 'object') return

  return new Observer(value)
}


function Observer(data) {
  this.data = data;
  this.walk(data)
}


Observer.prototype = {
  constructor: Observer,

  walk(data) {
    if (!data || data === 'undefined' || typeof data !== 'object') return

    Object.keys(data).forEach(key => {
      this.convert(key, data[key])
    })
  },

  convert(key, value) {
    this.defineReactive(this.data, key, value)
  },

  defineReactive(data, key, value) {
    var dep = new Dep()
    observe(value)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      set(newVal) {
        if (value === newVal) return
        value = newVal
        console.log('changed value');
        // 通知所有订阅者
        dep.notify()
      },
      get() {

        Dep.target && dep.depend(Dep.target)
        return value
      }
    })
  },
}

var uid = 0

// 消息订阅器 - 收集订阅者
function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  removeSub(sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },
  depend() {
    Dep.target.addDep(this)
  },

  notify() {
    this.subs.forEach(sub => {
      sub && sub.update()
    })
  }
}
Dep.target = null
