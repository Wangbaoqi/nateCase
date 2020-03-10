

function MVVM(options) {
  var me = this
  this.$options = options || {}

  var data = this._data = this.$options.data

  // 数据代理 实现 vm.xxx => vm._data.xxx
  Object.keys(data).forEach(key => {
    this._proxyData(key)
  })

  observe(data, this)

  this.$compiler = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  constructor: MVVM,

  _proxyData(key, setter, getter) {

    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get: () => {
        return this._data[key]
      },
      set: (val) => {
        this._data[key] = val
      }
    })
  }
  
}