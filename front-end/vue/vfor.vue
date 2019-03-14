<template>
    <div>
        <div v-for="(item, index) in list" :key="item.id" >{{item.name}}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[
                    {
                        id: 1,
                        name: 'test1',
                    },
                    {
                        id: 2,
                        name: 'test2',
                    },
                    {
                        id: 3,
                        name: 'test3',
                    },
                ]
            }
        },
        created(){
            //末尾加一条数据
            // setTimeout(()=>{
            //     this.list.push({
            //         id:4,
            //         name: 'test4'
            //     })
            // },10000)
            //中间加一条数据
            setTimeout(()=> {
                this.list.splice(1,0,{
                    id:'5',
                    name: 'test5'
                })
            },10000)
        }
    }
</script>