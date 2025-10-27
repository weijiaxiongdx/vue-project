// 在这里模拟接口返回数据

// 使用mockjs产生数据
import mockjs from "mockjs";
const userList = mockjs.mock({
    "data|100": [{ // userList.data[]中产生100条数据
        name: "@cname", // @cname为占位符，表示生成不同的中文名
        ename: "@name", // @name为占位符，表示生成不同的英文名，待确认
        "id|+1": 1, // id自增1
        time: "@time", // 时分秒
        date: "@date" // 年月日
        // avatar: XXX // 模拟图像，等确认
        // 其它配置看官网
    }]
})
console.log("userList",userList)

// 报错，暂时注释掉
// module.exports = [
//     {
//         method: "post",
//         url: "/api/users",
//         response: ({body}) => {
//             return {
//                 code: 200,
//                 msg: "success",
//                 data: []
//             };
//         }
//     }
// ]