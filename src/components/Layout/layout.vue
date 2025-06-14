<script setup lang="ts">
import url from '@/assets/image/DGCRANE-log.png';
import { ref } from 'vue';
import Search from './Search.vue';

const activeIndex = ref('1');
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="container">
        <div class="header-content">
          <div class="container-logo">
            <el-image :src="url" class="logo"/>
          </div>
          <div class="search-bar">
            <Search />
          </div>
          <div class="user-info">
            用户信息
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside-container">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <template #title>首页</template>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <span>文档管理</span>
              </template>
              <el-menu-item index="2-1">文档列表</el-menu-item>
              <el-menu-item index="2-2">文档分类</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <span>系统设置</span>
              </template>
              <el-menu-item index="3-1">用户管理</el-menu-item>
              <el-menu-item index="3-2">角色管理</el-menu-item>
              <el-menu-item index="3-3">权限设置</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
}

.container-logo {
  width: 5%;
  display: flex;
  align-items: center;
}

.logo {
  width: 100%;
  height: 100%;
}

.search-bar {
  flex: 1;
  display: flex;
  justify-content: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.container {
  background-color: #666666;
  padding: 0 20px;
}

.aside-container {
  height: calc(100vh - 60px);
  background-color: #545c64;
  padding: 0;
  box-sizing: border-box;
}

.el-menu-vertical {
  height: 100%;
  border-right: none;
}

:deep(.el-menu-item), :deep(.el-sub-menu__title) {
  display: flex;
  align-items: center;
}
</style>
