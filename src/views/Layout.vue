<script setup>
import { Management,Promotion,UserFilled,User,Crop,EditPen,SwitchButton,CaretBottom } from '@element-plus/icons-vue'
import avatar from '@/assets/images/default.png';
</script>

<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <dev class="el-aside_logo"></dev>
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                <el-menu-item index="/user/category"> <!-- index的值与路由中的path的值一致，指定路由路径 -->
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>用户分类</span>
                </el-menu-item>
                <el-menu-item index="/user/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>用户管理</span>
                </el-menu-item>

                <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更新图像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>

         <!-- 右侧主区域 -->
        <el-container>
             <!-- 头部区域 -->
            <el-header class="el-header">
                <div>奋斗的人：<strong>雄哥</strong></div>
                <el-dropdown placement="bottom-end">  <!-- 下拉菜单 -->
                    <span class="el-dropdown_box">
                        <el-avatar :src="avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换图像</el-dropdown-item>
                            <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>

             <!-- 中间区域 -->
            <el-main style="width: 1290px; height: 570px; border: none;">
                <!-- <div style="width: 1290px; height: 570px; border: 1px solid red;">
                    内容展示区
                </div> -->
                <RouterView></RouterView>
            </el-main> 

            <!-- 底部区域 -->
            <el-footer>
                <div class="el-footer">
                     用户 @2025 Create by 奋斗者
                </div>
            </el-footer> 
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &_logo {
            height: 120px;
            background: url('@/assets/images/logo2.jpeg') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }


    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 85vw;


        .el-dropdown_box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
        width: 80vw;
    }
}

  
</style>
