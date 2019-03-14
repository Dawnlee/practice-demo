1. 响应式原理
2. 依赖收集
3. VNode节点
4. Virtual Dom与diff

![avatar](https://github.com/Dawnlee/practice-demo/blob/develop/front-end/vue/vue1.png?raw=true)

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
key的作用主要是为了高效的更新虚拟DOM


diff过程
![avatar](https://github.com/Dawnlee/practice-demo/blob/develop/front-end/vue/vue1.png?raw=true)  
diff算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有O(n)，是一种非常高效的算法。  
当oldVnode与vnode在sameVnode的时候才会进行patchVnode,否则就是新增节点或者删除节点

patchVnode的规则是这样的：  
1.如果新vnode和旧vnode都是静态节点，key相同，或者新vnode是一次性渲染或者克隆节点，那么直接替换该组件实例并返回
2.新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心。  
3.如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。  
4.当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。  
5.当新老节点都无子节点的时候，只是文本的替换。  