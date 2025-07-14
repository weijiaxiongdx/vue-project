<script setup>
import {Edit, Delete} from '@element-plus/icons-vue'
import {ref} from 'vue'

const categoryList = ref([
  {
    "id": 1,
    "categoryName": "默认用户",
    "createTime": "2025-07-14 15:23:17"
  }
])

import {categoryService} from '@/api/userCategory.js'
const userCategoryList = async()=>{
    let result = await categoryService(); // 为什么最终请求后台接口的地址是 http://localhost:5173/user/api/user/category api前面的user哪来的，待解决
    categoryList.value = result;
}

userCategoryList();

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>用户分类</span>
                <div class="extra">
                    <el-button type="primary">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categoryList" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"></el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
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
