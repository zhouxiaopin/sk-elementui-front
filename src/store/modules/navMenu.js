export default {
    /*
    * 状态对象
    * 调用{{this.$store.state.userName}}
    * */
    state:{
        curMenuActive:'1',
    },
    getters: {
        // collapse(state){// 对应着上面state
        //     return state.isCollapse
        // }
    },
    /*
    * mutations是提交修改store的状态的唯一方法。每个mutation都有一个字符串的 事件类型 (type)
    和 一个 回调函数 (handler)，回调函数就是我们改变state的方法
    commit是调用mutation的方法
    * */
    mutations:{
        setCurMenuActiveId(state,id){  // 设置当前激活的目录
            state.curMenuActive = id
        },
    },
    /*
    * actions跟mutations差不多，但是action不直接修改state，它是提交到mutation上让mutation来
    * 修改state。要记住mutation是唯一可以修改state的。actions跟mutation的区别是 mutation必须
    * 限定是同步操作，而actions没有这个限制，如果你需要异步操作或调用异步API，你可以通过actions
    * 来进行操作。
    * dispatch是调用action的方法。
    * */
    actions:{

    }
}