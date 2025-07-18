<script setup>
import {Edit, Delete} from '@element-plus/icons-vue'
import {ref} from 'vue'

const categoryList = ref([
  {
    "id": 1,
    "userType": '1',
    "categoryName": "默认用户",
    "createTime": "2025-07-14 15:23:17"
  }
])

import {categoryService,categoryAddService,categoryUpdateService,categoryDeleteService} from '@/api/userCategory.js'
const userCategoryList = async()=>{
    let result = await categoryService(); // 为什么用户分类页面中最终请求后台接口的地址是 http://localhost:5173/user/api/user/category api前面的user哪来的，待解决
    categoryList.value = result.data;
}

userCategoryList();

const dialogVisible = ref(false)

// 添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    userType: ''
})


const rules = {
    categoryName: [
        {required: true, message: '请输入分类名称', trigger: 'blur'}
    ],
    userType: [
        {required: true, message: "请输入分类id", trgger: 'blur'}
    ]
}

// 添加分类
import { ElMessage,ElMessageBox } from 'element-plus'
const addCategory = async ()=>{
    let result = await categoryAddService(categoryModel.value)
    ElMessage.success(result.message ? result.message : "添加成功");

    // 刷新列表数据，关闭弹窗
    userCategoryList();
    dialogVisible.value = false;
 }

// 控制添加和编辑弹窗标题的显示
const title = ref('')

const editCategoryDialog = (row)=>{
    dialogVisible.value=true;
    title.value='编辑分类';

    // 内容回显
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.userType = row.userType

    // 向categoryModel中扩展id属性
    categoryModel.value.id = row.id

}


// 编辑分类
const updateCategory = async()=>{
    let result = await categoryUpdateService(categoryModel.value)
    ElMessage.success(result.message ? result.message : "修改成功");

    // 刷新列表数据，关闭弹窗
    userCategoryList();
    dialogVisible.value = false;
}


// 清空数据
const clearData = ()=>{
    categoryModel.value.categoryName = '';
    categoryModel.value.userType = '';
}

// 删除分类
const deleteCategory = (id)=>{
  ElMessageBox.confirm(
    '确定要删除该分类吗?',
    '温馨提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
        let result = await categoryDeleteService(id);
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
        userCategoryList();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>用户分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true;title='添加分类';clearData()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categoryList" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"></el-table-column>
            <el-table-column label="分类id" prop="userType"></el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="editCategoryDialog(row)"></el-button>  <!-- 当前行作为参数 -->
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row.id)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px;">
                 <el-form-item label="分类id" prop="userType">
                    <el-input v-model="categoryModel.userType" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title=='添加分类' ? addCategory() : updateCategory()">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>

.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
