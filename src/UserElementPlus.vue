
<script lang="ts" setup> // lang设置为ts，但script中也可以写js，即ts和js都可以写
    //setup(){}是Vue3中一个新的配置项，值是一个函数，它是组合式API表演的舞台，组件中所用到的数据、方法、计算属性、监视等均配置在setup(){}中
    //Vue3中setup(){}中不能使用this
    //Vue3中setup(){}与Vue2中的data(){}、methods(){}等是平级的，可以同时存在，data(){}中可以使用this引用setup()中的数据，但反过来引用是不行的(旧语法可以引用新语法中的东西、新语法不可引用旧语法中的东西)
    //<script setup>语法糖是对setup(){}的简写

    //ref：可定义基本类型的响应式数据和对象类型的响应式数据(底层还是通过reactive来处理的)。vue2中写在Data中的数据默认就是响应式的
    //     ref创建的变量必须使用".value"(模板代码中不需要加.vaue，但是js代码中必须加.value才能使用相关的数据)，reactive创建的变量不需要加.value就可以使用 
    //     可以使用volar插件自动添加".value"(js代码中书写数据的时候自动带上“.vaue”，不需要手动写了)，VS Code左侧点击Extensions->搜索volar并安装->VS Code左下角齿轮->Settings->左侧Extentions菜单，选择VOLAR->勾选“Auto Insert：Dot Value”->不用重启就会自动带上.value了
    //     重新赋一个对象，响应式特性不会丢失 
    //reactive：只能定义对象类型的响应式数据。重新分配一个新对象(对定义的响应式对象赋一个新对象，如{k1:'v1',k2:'v2'})，原响应式对象会失去响应式特性。可使用Object.assign(原响应式对象，{k1:'v1',k2:'v2'})整体替换，这样做了后，原响应式对象的响应式特性还是保留的
    //二者对比：若需要一个基本类型的响应式数据，必须使用ref
    //        若需要一个对象类型的响应式数据，层级不深，都可以用
    //        若需要一个对象类型的响应式数据，层级较深，推荐使用reactive

    import axios from 'axios';

    //导入图标，通过“:icon”使用图标-官网复制代码并修改
    import {Delete, Edit} from '@element-plus/icons-vue'

    //导入分页导航条相关-官网复制代码并修改
    import { computed, ref, toRef, toRefs, watch, watchEffect,defineProps,withDefaults } from 'vue'
    import type { ComponentSize } from 'element-plus'
    const currentPage4 = ref(4)
    const pageSize4 = ref(10)
    const size = ref<ComponentSize>('default')
    const background = ref(false)
    const disabled = ref(false)
    const total = ref(50)
    const handleSizeChange = (val: number) => {
        console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
        console.log(`current page: ${val}`)
    }

    //导入行内表单相关-官网复制代码并修改
    import { reactive } from 'vue'
    const userSearchConditions = ref({
        name: '',
        age: '',
    })
    const onSubmit = () => {
        console.log('submit!')
    }

    import {getAllUserService,searchUserService,addUser2Service,updateUserService,deleteUserService} from '@/api/user.js';
    const userList = ref([]);

    //列表
    const getAllUser = async function(){
        let allUserData = await getAllUserService();
        userList.value = allUserData;
        total.value = allUserData.length;
    }
    getAllUser();

    //搜索
    const searchUserByCondition = async function() {
        let searchUserdata = await searchUserService({...userSearchConditions.value});
        userList.value = searchUserdata;
        total.value = searchUserdata.length;
    }

    //重置条件
    const clearUserSearch = function() {
        userSearchConditions.value.name = '';
        userSearchConditions.value.age = '';
    }

    //使用路由器进行页面跳转
    //导入路由器，大括号中的useRouter就是一个函数
    import {useRouter} from 'vue-router'
    import { id, tr } from 'element-plus/es/locale';
    const router = useRouter()//通过useRouter函数拿到路由器
    const gotoUserVue = function(){// router.push这种方式称为编程式路由跳转、另外还可以在模板中通过<RouterLink>标签实现跳转(底层就是<a>标签)
        router.push('/userVue')//跳转，推入栈顶，历史记录还在，可回退
        // router.replace('/userVue')//替换栈顶路由，不可回退
    }

    //登录成功后，存储token，以便各组件或页面共享token
    import {useTokenStore} from '@/stores/token.js'
    import {storeToRefs} from 'pinia' // storeToRefs只会对store中的数据进行ref包裹，不会对方法进行ref包裹
    const tokenStore = useTokenStore();
    // tokenStore.setToken("123456789"); //修改方式一，通过提供的函数修改
    // tokenStore.token = "88888888"; //修改方式二，直接修改
    // tokenStore.$patch({ //修改方式三，批量修改
    //     token:'445555'
    // })
    //修改方式四，在store中配置actions并定义相关的函数，组件中通过tokenStore调用函数即可
    //可以将store中的数据解构赋值，方便使用其中的数据
    // const {token}  = storeToRefs(tokenStore) //storeToRefs只将store中的数据封装在Ref对象中。直接使用toRefs的话，将数据和方法都封装到了Ref对象中，没有必要
    // tokenStore.$subscribe((muate,state)=>{
    //     console.log('store中的数据发生了变化，回调到这里')
    // })

    //其它请求之前，先获得token，再放入请求头中传递到后端即可
    //在pinia中定义的响应式数据，都不需要.value，直接使用即可
    //不需要在每个请求中都加上Authorization请求头，可在Axios请求拦截器中统一处理
    // request.get('/abc',{Headers:{'Authorization':tokenStore.token}})


    //新增用户弹窗相关，数据模型、表单校验规则等
    const dialogVisible = ref(false)
    const userModel = ref({
        id: '',
        name: '',
        age: ''
    })
    const rules = {
        id: [
            {required:true,message:'请输入id',trigger:'blur'},
        ],
        name: [
            {required:true,message:'请输入用户名',trigger:'blur'},
        ],
        age: [
            {required:true,message:'请输入年龄',trigger:'blur'},
        ]
    }

    //添加。弹窗时清空模型中的数据是比较好的方案
    const addUser2 = async function(){
        let allUserData = await addUser2Service(userModel.value);
        userList.value = allUserData;
        total.value = allUserData.length;
        userModel.value.id = '';
        userModel.value.name = '';
        userModel.value.age = '';

        dialogVisible.value = false;
    }


    //编辑
    const  updateUser = async ()=>{
        await updateUserService(userModel.value);//必须等待更新完成后再查询数据，不加await的话，getAllUser查不到最新数据
        getAllUser();
        userModel.value.id = '';
        userModel.value.name = '';
        userModel.value.age = '';
        dialogVisible.value = false;
    }

    //控制弹窗标题显示内容
    const dialogTitle = ref('')
    const showDialog = (row)=>{
        dialogVisible.value = true;
        dialogTitle.value='编辑用户';

        //回显
        userModel.value.id = row.id;
        userModel.value.name = row.name;
        userModel.value.age = row.age;
    }


    //删除
    import { ElMessageBox,ElMessage } from 'element-plus';
    const deleteUser = (id)=>{
        ElMessageBox.confirm(
            '确认删除用户吗？',
            '警告',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(async () => {
            let result = await deleteUserService(id);//同步等待异步调用的结果
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            getAllUser();
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
    }


    //解构响应式对象
    let person = reactive({
        name: '李李李',
        age:22
    })
    //解构赋值之后，这里的name、age不是响应式的
    //let {name,age} = person
    //使用toRefs包装后，这里的name、age分别相当于使用了ref的响应式数据。改了这里的name、age，person中的name、age也会跟着变
    //let {name,age} = toRefs(person)
    //单个单个地解构
    //let age = toRef(person,'age')

    //computed计算属性
    //computed中的数据有变化时，会重新计算，计算一次后，结果会缓存，只要其中的数据没有变化就不会重新计算
    //这种方式定义的计算属性fullName是只读的，不能修改
    // let fullName = computed(()=>{
    //     return 333+444
    // })
    //这种方式定义的计算属性fullName可读可写
    // let fullName = computed({
    //     get(){
    //         return 333+444;
    //     },
    //     set(val){
    //         //这里可以修改计算属性fullName中的数据
    //     }
    // })


    //watch
    //监视数据的变化，只能监视以下四种数据
    //ref定义的数据，包括基本类型和对象类型。监视对象类型时，其实监视的是对象的地址(非对象中的属性)，若想同时监视对象内部属性的变化，需要手动开启深度监视
    //reactive定义的数据，默认是开启深度监视的且不能关闭
    //函数返回一个值，如：()=>{return person.name}或简写形式()=>person.name，通过这种方式达到监视对象中某个属性的目的
    //包含前面内容的数组，就是监视多个数据 watch([XX,YY],()=>{},{})
    const stopWatch = watch(person,(newValue,oldValue)=>{
        console.log('person数据变化了')
        // 这里可以根据业务情况，达到一定条件时就停止监视
        // stopWatch()
    },{deep:true,immediate:true})//三个参数：被监视的数据、监视的回调(数据有变化时的回调)、配置对象(开启深度监视、立即监视等，immediate设置为true表示不管数据有没有变化，一上来就先执行一次)

    //watchEffect
    //不用指定监视对象，直接写回调函数并在函数中直接使用相关的数据就可以了，会自动分析回调函数中使用到的数据的变化情况。一上来也会先执行一次
    //也就是会自动监视回调函数中使用到的属性
    // watchEffect(()=>{

    // })


    //导入TS中的接口，必须加type
    import {type PersonInte,type Persons} from '@/types' //不写文件名，默认找的就是types目录下的inex.ts文件。@表示src目录
    let tsPerson:PersonInte = {id:'1',name:'张三三',age:30} //表示tsPerson变量必须符合PersonInte接口定义的规范，属性名称、类型、数量等全都要符合接口中的定义
    // let tsPersonList:Array<PersonInte> = [ //表示数组变量tsPersonList中的每一项都要符合PersonInte接口定义的规范
    //     {id:'1',name:'张三三',age:30},
    //     {id:'2',name:'张三四',age:20},
    //     {id:'3',name:'张三五',age:10}
    // ]
    let tsPersonList:Persons = [ //使用自定义类型来简化
        {id:'1',name:'张三三',age:30},
        {id:'2',name:'张三四',age:20},
        {id:'3',name:'张三五'}
    ]

    //props
    //接收父组件中传递的数据，以便在本组件中使用。父组件中使用子组件Person并传参 <Pserson a="123">
    // defineProps(['a']) //子组件接收父组件中传递的数据a，子组件中就可以在模板中通过插值表达来使用a了。必传，否则父组件相关代码会报错提示。即使只有一个参数也得使用数组来接收
    // let x = defineProps(['a','list']) //接收且将props保存起来，这样就可以在js中通过x.a拿到对应的值。必传，否则父组件相关代码会报错提示
    // defineProps<{list:PersonInte}>() //接收+限制，接收父组件传递的list，同时限制该list必须符合PersonInte接口定义的规范，就是不让乱传。必传，否则父组件相关代码会报错提示
    // defineProps<{list?:PersonInte}>() //问号表示父组件可传、可不传
    // withDefaults(defineProps<{list?:PersonInte}>(),{ //父若不传，子会使用自己提供的默认值
    //     // list:()=>[{id:'e23',name:'张三三三三',age:23}]
    // })


    //自定义Hooks。正是有了Hooks，组合式API才发挥出了威力
    //将同一功能或业务的代码封装到一起(js或ts文件)、src目录下创建各功能或业务对应的ts文件并写上跟当前功能或业务相关的数据、方法等、需要用到的地方导入Hooks并调用即可拿到对应的数据和方法了
    // import usePerson from '@/hooks/usePerson'; //对应usePerson.ts文件
    // const {personList,getPerson} = usePerson() //解构赋值拿到对应的数据和方法
    // getPerson(); //使用


    //组件通信(组件之间传递数据)，将User.vue作为子组件测试
    //1.props方式(使用频率最高)：父传子，父组件中使用子组件时直接写:paramKey=paramValue、子组件中使用defineProps(['paramKey'])接收
    //                        子传父，父组件中使用子组件时直接写:functionKey=functionName，子组件中使用defineProps(['functionKey'])接收并在需要的地方调用传过来的函数且传入数据
    //2.自定义事件方式：用于子传父，父组件中使用子组件时直接写@customeEvent=functionName，子组件中使用const emit = defineProps(['customeEvent'])接收并在需要的地方触发事件并传入参数emit(customeEvent,param)
    //3.mitt方式：实现任意组件之间的通信(接收方绑定事件、提供方触发事件，类似发布订阅)。安装npm i mitt、创建emitter.ts文件、main.js中导入
    //4.v-model方式：
    //5.$attrs：实现当前组件的父组件向当前组件的子组件传递数据，祖传孙，也可以实现孙传祖(传函数到孙，孙触发函数)。$attrs是一个对象，包含所有父组件传入的标签属性(只包含没有使用defineProps接收的属性，接收过的在props对象中)
    //          在当前组件中的子组件上使用v-bind=“$attrs”来将父组件中的数据传递到孙组件中，孙组件中直接通过defineProps接收对应的数据，这就实现了祖传孙
    //6.$refs用于父传子，值为对象，包含所有被ref属性标识的DOM元素或组件实例
    //  $parent用于子传父，值为对象，当前组件的父组件实例对象
    //7.provide，祖组件中通过provide('key',data)向后代(子、孙...)提供数据
    //  inject，后代组件中通过let data = inject('key',默认值)来注入祖组件提供的数据。这种方式不像$attrs那样需要中间组件来传递数据。也可以通过传递函数并回调的方式实现孙传祖
    import User from './User.vue'
    let parentData = ref('父组件的数据')
    function getChildData(value:string){//value为参数，:string明确参数为字符串类型
        console.log("子组件传递过来的数据为：",value)
    }
    function hahaEventFun(value:number){
        console.log('子组件传递过来的数据为2：',value)
    }

    //插槽
    //默认插槽：不写名字的话插槽的默认名字就是default
    //具名插槽：具有名字的插槽，自己命名
    //作用域插槽：数据在子组件中，但根据数据生成的结构由父组件决定。即父组件中需要得到子组件中的数据来生成相应内容并添加到子组件中的插槽

    //toRaw、markRaw
    //Teleport
    //Suspense

    //表格静态数据
    const tableData = [
        {
        id: '1',
        name: 'Tom',
        age: '18',
        },
        {
        id: '2',
        name: '张三',
        age: '19',
        },
        {
        id: '3',
        name: '李四',
        age: '20',
        },
        {
        id: '4',
        name: '王五',
        age: '21',
        },
  ]
</script>

<template>
    <el-card class="box-card">
        <div class="card-header">
            <span>用户管理(父组件)</span>
            <el-button type="primary" @click="dialogVisible = true;dialogTitle='新增用户'">新增用户</el-button>
        </div>

        <div style="margin-top: 20px;margin-bottom: 10px;">
            <hr>
        </div>

        <!-- 属性前加冒号表示要把引号中的内容当成JS表达式解析，冒号的完整写法是v-bind: -->
        <el-form :inline="true" :model="userSearchConditions" class="demo-form-inline">
            <el-form-item label="用户名">
                <!-- v-model是简写形式，非简写为v-model:value -->
                <el-input v-model="userSearchConditions.name" placeholder="用户名" clearable />
                <!-- v-model的底层就是“:value”和“@input”，前者用于将数据模型中的数据绑定到页面、后者用于将页面中的数据绑定到数据模型 -->
                <!-- <input :value="userSearchConditions.name" @input="userSearchConditions.name = $event.target.value" placeholder="用户名" clearable /> -->
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="userSearchConditions.age" placeholder="年龄" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchUserByCondition">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click="clearUserSearch">重置</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click="gotoUserVue">跳转到别的页面</el-button>
            </el-form-item>
        </el-form>
        <br>

        <el-table :data="userList" style="width: 100%">
            <el-table-column prop="id" label="id" />
            <el-table-column prop="name" label="用户名"  />
            <el-table-column prop="age" label="年龄" />
            <el-table-column label="操作"  width="180">
                <template #default="{row}"> <!-- row代表当前行数据 -->
                    <el-button type="primary" :icon="Edit" circle @click="showDialog(row)" />
                    <el-button type="danger" :icon="Delete" circle @click="deleteUser(row.id)"/>
                </template>
            </el-table-column>
        </el-table>
        <br>

        <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[10, 20, 30, 40]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />


        <!-- 新增/编辑用户弹窗 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500">
            <el-form model="userModel" :rules="rules" label-width="100px" style="padding-right: 30px;">
                <el-form-item label="id" prop="id">
                    <el-input v-model="userModel.id" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="userModel.name" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="userModel.age" minlength="1" maxlength="10"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogTitle=='新增用户' ? addUser2() : updateUser()">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </el-card>

    <!-- 组件之间通信 -->
    <br>
    <!-- 
        父传子、子传父：props方式 
        子传父： @hahaEvent表示为子组件绑定了自定义事件hahaEvent、hahaEventFun表示触发hahaEvent事件时执行的函数
    -->
    <user :parentData="parentData" :getChildData="getChildData" @hahaEvent="hahaEventFun"/> 
</template>

<style scoped> /** scope表示样式的作用范围就是本组件中的template中的元素 */
    .card-header{
        display: flex;
        justify-content: space-between;
    }
</style>