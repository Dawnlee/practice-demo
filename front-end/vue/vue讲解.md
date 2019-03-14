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
在执行render function时候调用属性getter函数进行依赖收集

#### Vnode节点、Virtual Dom 与diff
在前面进行视图更新的时候，直接将更新后的dom用innerhtml修改到页面上，这样重绘整个视图是比较耗费性能的。  
vue.js将整个dom抽象成以JavaScript对象为节点虚拟dom树。我们可以对虚拟dom树进行增加节点、删除节点等等操作。  
修改后通过diff算法得到修改dom的最小操作，相比较于innerhtml修改，大大提高了性能。 

我们可以比较一下 innerHTML vs. Virtual DOM 的重绘性能消耗： 
innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)  
Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)  
reder virtural dom + diff 虽然比render html string慢,但是js计算是远远快于dom操作的，可以看到innerHtml是和整个页面大小有关。
而virtual dom是和数据变化量有关。

virtual dom另外一个好处是可以渲染到dom以外的backend，比如react native

为什么使用v-for时必须添加唯一的key?
使用v-for更新已渲染的元素列表时,默认用就地复用策略;列表数据修改的时候,他会根据key值去判断某个值是否修改,如果修改,则重新渲染这一项,否则复用之前的元素;
我们在使用的时候经常会使用index(即数组的下标)来作为key,但其实这是不推荐的一种使用方法;
