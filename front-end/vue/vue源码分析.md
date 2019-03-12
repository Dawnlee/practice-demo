1. 响应式原理
2. 依赖收集
3. VNode节点
4. Virtual Dom与diff

![avatar](https://user-gold-cdn.xitu.io/2017/12/19/1606e7eaa2a664e8?imageslim)

#### 响应式原理

Object.defineProperty  
enumerable，属性是否可枚举，默认 false。  
configurable，属性是否可以被修改或者删除，默认 false。   
get，获取属性的方法。   
set，设置属性的方法。 

#### 依赖收集
```javascript
new Vue({  
    template:   
        `<div>  
            <span>{{text1}}</span>   
            <span>{{text2}}</span>   
        <div>`,  
    data: {  
        text1: 'text1',  
        text2: 'text2',  
        text3: 'text3'  
    }  
})
this.text3 = 'modify text3';
```
当修改text3的时候，也会触发更新，即上一节的cb函数，但此时更新视图是错误的。

实现：  
定义watcher  
定义Dep，存放watcher观察者对象   
在执行render function时候进行依赖收集

Object.defineProperty缺点：
Proxy

#### Vnode节点
在之前进行视图更新的时候，直接将更新后的dom用innerhtml修改到页面上，这样重绘整个视图是比较耗费性能的。  
vue.js将整个dom抽象成以JavaScript对象为节点虚拟dom树。我们可以对虚拟dom树进行增加节点、删除节点等等操作。  
修改后通过diff算法得到修改dom的最小操作，相比较于innerhtml修改，大大提高了性能。 

#### Virtual Dom 与diff
我们可以比较一下 innerHTML vs. Virtual DOM 的重绘性能消耗： 
innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)  
Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)  

可以渲染到dom以外的backend，比如react native

为什么使用v-for时必须添加唯一的key?

#### vuex
 mvvm框架的检查是数据层面的，React 的检查是 DOM 结构层面的

