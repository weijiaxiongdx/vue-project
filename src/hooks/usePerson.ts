//将人相关的数据和方法抽取到这里，文件命名一般为useXXX

import { reactive } from "vue"

export default function (){

    //数据
    let personList = reactive([
        {},
        {}
    ])

    //方法
    async function getPerson(){

    }

    //向外提供
    return {personList,getPerson}
}