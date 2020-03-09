/*
Vue 插件库
 */

(function () {
    var MyPlugin = {};
    MyPlugin.install = function (Vue) {
        // 1. 添加全局方法和属性
        Vue.myGlobalMethod = function () {
            // 逻辑
            console.log('Vue函数对象的方法myGlobalMethod()');
        };

        // 2. 添加全局资源
        Vue.directive('my-directive', function (el, binding) {
            el.textContent = binding.value.toUpperCase();
        });

        // 3. 添加实例方法
        Vue.prototype.$myMethod = function () {
            console.log('Vue实例对象的方法$myMethod()');
        };

    };

    // 向外暴露
    window.MyPlugin = MyPlugin;
})();