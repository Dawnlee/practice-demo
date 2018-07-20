var iosDragDropShim = { enableEnterLeave: true }                // 兼容移动端
var source = document.querySelectorAll('.list'),
    recycle = document.getElementById('recycle'),
    dragElement = null,                                         // 用于存放拖动元素
    lock = true;                                                // 最后元素拖放拖放时会进入enter和leave的循环，用来锁住
    y = 0;

for(var i = 0; i < source.length; i++){
    source[i].addEventListener('dragstart',function(ev){
        dragElement = this;                                     // 用于存放拖动元素
        y = ev.pageY;
        this.style.backgroundColor = '#f8f8f8';                 // 设置拖动元素的背景
    },false);

    source[i].addEventListener('dragend',function(ev){
        ev.target.style.backgroundColor = '#fff';               // 拖放结束还原拖动元素的背景
        ev.preventDefault();
    },false)

    source[i].addEventListener('dragenter', function(ev){
        if(dragElement != this){
            if(ev.pageY - y < 0){
                this.parentNode.insertBefore(dragElement,this);     // 把拖动元素添加到当前元素的前面
                $(this).addClass('item-down')
                setTimeout(function () {
                    $(this).addClass('item')
                }.bind(this),100)
                setTimeout(function () {
                    $(this).removeClass('item item-down')
                }.bind(this),200)
                y = ev.pageY;
            }
            else if(ev.pageY - y > 0) {
                this.parentNode.insertBefore(dragElement, this.nextSibling);
                $(this).addClass('item-up')
                setTimeout(function () {
                    $(this).addClass('item')
                }.bind(this),100)
                setTimeout(function () {
                    $(this).removeClass('item item-up')
                }.bind(this),200)
                y = ev.pageY;
            }
        }
    }, false)

    source[i].addEventListener('drag1',function (ev) {
        console.log(ev);
    })

    source[i].addEventListener('dragleave1', function(ev){
        console.log(111);
        if(dragElement != this){
            console.log(this.innerText);
            if(lock && (this == this.parentNode.lastElementChild || this == this.parentNode.lastChild)){    // 当前元素时最后一个元素
                this.parentNode.appendChild(dragElement);       // 把拖动元素添加最后面
                lock = true;
            }else{
                lock = true;
            }
        }
    }, false)
};

recycle.addEventListener('drop', function(ev){                  // 拖进回收站则删除该元素
    dragElement.parentNode.removeChild(dragElement);
}, false)

document.ondragover = function(e){e.preventDefault();}          // 必须设置dragover阻止默认事件
document.ondrop = function(e){e.preventDefault();}