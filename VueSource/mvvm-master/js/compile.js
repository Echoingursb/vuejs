/**
 * 模版解析
 *
 * @param el
 * @param vm
 * @constructor
 */
function Compile(el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        // 1. 将el的所有子节点取出, 添加到一个新建的文档fragment对象中
        this.$fragment = this.node2Fragment(this.$el);
        // 2. 对fragment中的所有层次子节点递归进行编译解析处理
        this.init();
        // 3. 将解析后的fragment添加到el中显示
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    /**
     *  将所有子节点添加到fragment中
     *
     * @param el
     * @returns {DocumentFragment}
     */
    node2Fragment: function (el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function () {
        this.compileElement(this.$fragment);
    },

    /**
     * 对fragment中的所有层次子节点递归进行编译解析处理
     *
     * @param el
     */
    compileElement: function (el) {
        // 取出最外层所有子节点
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function (node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/; // 用来匹配大括号表达式 (.*)子匹配

            if (me.isElementNode(node)) {
                // 编译解析指令
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                // 编译大括号表达式文本节点
                me.compileText(node, RegExp.$1); // 将子匹配匹配到的结果赋值给RegExp.$1
            }
            // 如果当前节点还有子节点，通过递归调用实现所有层次子节点的编译
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    compile: function (node) {
        // 获取标签的所有属性
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function (attr) {
            // 获取属性名 v-on:click
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                // 获取属性值(表达式) show
                var exp = attr.value;
                // 从属性名获取指令名 on:click
                var dir = attrName.substring(2);
                if (me.isEventDirective(dir)) {
                    // 事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    // 一般指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 移除指令属性
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function (node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function (attr) {
        return attr.indexOf('v-') === 0;
    },

    isEventDirective: function (dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function (node) {
        return node.nodeType === 1;
    },

    isTextNode: function (node) {
        return node.nodeType === 3;
    }
};

// 指令处理集合工具
var compileUtil = {
    // 解析v-text或者{{}}
    text: function (node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    // 解析v-html
    html: function (node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    // 解析v-model
    model: function (node, vm, exp) {
        // 实现数据初始化显示和创建对应的watcher
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        // 给节点绑定input事件监听(输入改变时触发回调函数)
        node.addEventListener('input', function (e) {
            // 得到输入的最新值
            var newValue = e.target.value;
            // 如果没有变化，直接结束
            if (val === newValue) {
                return;
            }
            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    // 解析v-class(Vue原生没有该语法:class)
    class: function (node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function (node, vm, exp, dir) {
        // 得到更新节点的函数
        var updaterFn = updater[dir + 'Updater']; // 属性名是变量，此处必须用[]

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // 为表达式创建一个对应的watcher，实现节点的更新显示
        // 当表达式对应的一个属性值发生变化时回调
        new Watcher(vm, exp, function (value, oldValue) { // 回调函数关注when what this
            // 更新界面中指定的节点
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function (node, vm, exp, dir) {
        // 得到事件类型
        var eventType = dir.split(':')[1],
            // 从methods中得到表达式所对应的事件回调函数
            fn = vm.$options.methods && vm.$options.methods[exp];
        if (eventType && fn) {
            // 给节点绑定指定事件名和回调函数(强制绑定this为vm)的事件监听
            node.addEventListener(eventType, fn.bind(vm), false); // fn.bind(vm)回调函数this绑定为vm
        }
    },

    // 从vm得到表达式对应的值xxx.xxx.xxx
    _getVMVal: function (vm, exp) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function (k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function (vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function (k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

// 包含多个更新节点的方法的工具对象
var updater = {
    // 更新节点textContent
    textUpdater: function (node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    // 更新节点innerHTML
    htmlUpdater: function (node, value) {
        node.innerHTML = typeof value === 'undefined' ? '' : value;
    },
    // 更新节点className
    classUpdater: function (node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },
    // 更新节点value
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value === 'undefined' ? '' : value;
    }
};