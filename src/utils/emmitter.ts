//文件名称可随便写，官方的就是emmitter.ts这个名字

//引入mitt
import mitt from "mitt";

//调用mitt函数，emitter能绑定事件、触发事件
const emitter  = mitt()

//绑定事件mittEvent
// emitter.on('mittEvent',()=>{
//     console.log('mittEvent事件被调用了')
// })
// emitter.on('mittEvent2',()=>{
//     console.log('mittEvent2事件被调用了')
// })

//触发事件
// emitter.emit('mittEvent')
// emitter.emit('mittEvent2')

//单个解绑定事件，解绑之后就不能再触发事件了，除非重新主动触发事件
// emitter.off('mittEvent')
//一次性解绑所有事件
// emitter.all.clear()

//提供给外部使用
export default emitter