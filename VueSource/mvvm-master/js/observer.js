/**
 * 观察者
 *
 * @param data
 * @constructor
 */
function Observer(data) {
    // 保存data
    this.data = data;
    // 开启对data的监视
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        // 保存observer对象
        var me = this;
        // 遍历data中的所有属性
        Object.keys(data).forEach(function(key) {
            // 对指定的属性进行劫持
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        // 对指定的属性实现响应式的数据绑定
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        // 创建属性对应的dep对象(dependency 依赖)
        var dep = new Dep();
        // 间接递归调用，对data中所有任意层次的属性进行数据劫持
        var childObj = observe(val);

        // 给data重写定义属性实现数据劫持(添加get/set)
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() { // 返回值，建立dep与watch之间的关系
                if (Dep.target) {
                    dep.depend(); // 建立关系
                }
                return val;
            },
            set: function(newVal) { // 监视key属性的变化，更新界面
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监视
                childObj = observe(newVal);
                // 通知所有相关watcher订阅者
                dep.notify();
            }
        });
    }
};

function observe(value) {
    // 被观察的必须是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建对应的observer对象
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++; // 每个Dep的标识
    // 不需要标识取对应的值
    this.subs = []; // subscribers 订阅者(数组里面放的是watcher) n个相关的watcher的容器
}

Dep.prototype = {
    // 添加watcher到dep中
    addSub: function(sub) {
        this.subs.push(sub);
    },
    // 建立dep与watcher之间的关系
    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index !== -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // 遍历所有watcher，通知watcher更新
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;