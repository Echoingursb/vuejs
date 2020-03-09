/*
相当于Vue的构造函数
 */
/**
 *
 * @param options 配置对象
 * @constructor
 */
function MVVM(options) {
    // 将配置对象保存到vm
    this.$options = options;
    // 将data对象保存到vm和变量data中
    var data = this._data = this.$options.data;
    // 保存vm
    var me = this;

    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    // 遍历data中的所有属性
    Object.keys(data).forEach(function (key) { // key是data的某个属性名
        // 对指定的属性实现代理
        me._proxy(key);
    });
    // 对data中所有层次的属性通过数据劫持实现数据绑定
    observe(data, this);
    // 模版解析
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function (key, cb, options) {
        new Watcher(this, key, cb);
    },
    /**
     * 实现数据代理
     *
     * @param key 属性名
     * @private
     */
    _proxy: function (key) {
        // 保存vm
        var me = this;
        // 给vm添加指定属性名的属性
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            // 当通过vm.xxx 读取属性值的时候调用，从data中获取对应的属性值返回 代理读操作
            get: function proxyGetter() {
                return me._data[key];
            },
            // 当通过vm.xxx = val 时，val被保存到data中对应的属性上 代理写操作
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    }
};