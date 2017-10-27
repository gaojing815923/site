<template>
<div class="tmpl">
   <ul>
     <li @click="substrict">-</li>
     <li>{{count}}</li>
     <li @click="add">+</li>
   </ul>
</div>
</template>

<script>
    export default {
        data() {
            return {
                count: 1
            }
        },
        //用来接收父组件传入的值
        props: ['options'],
        created() {
            this.count = this.options.count;
        },
        methods: {
            //减一
            substrict() {
                this.count--;
                if (this.count <= 1) {
                    this.count = 1;
                }
                this.send();
            },
            add() {
                this.count++;
                this.send();
            },
            //触发组件传值给父组件
            send() {
                this.$emit('updata', {
                    gid: this.options.gid,
                    count: this.count
                })
            }
        }
    }
</script>
<style scoped>
    .tmpl ul {
        width: 120px;
    }
    
    .tmpl li {
        /* 吧鼠标的形状变成小手 */
        cursor: pointer;
        list-style: none;
        display: inline-block;
        width: 30px;
        padding: 2px;
        text-align: center;
        border: 1px solid #ccc;
    }
</style>