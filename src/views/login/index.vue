<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { authApi } from '@/api/auth.ts'
import { useUserStore } from '@/stores/user.ts'
import type { LoginResponse } from '@/stores/user.ts'

interface LoginForm {
  username: string
  password: string
  rememberMe: boolean
}

const router = useRouter()
const userStore = useUserStore()
const loginForm = ref<LoginForm>({
  username: '',
  password: '',
  rememberMe: false
})

const formRef = ref<FormInstance>()

const rules = ref<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})

const isLoading = ref(false)

async function handleLogin(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        isLoading.value = true
        const response = await authApi.login({
          username: loginForm.value.username,
          password: loginForm.value.password
        }) as LoginResponse
        
        // 存储用户信息到 store
        userStore.setUser(response.token, response.userInfo[0])
        
        // 记住用户名
        if (loginForm.value.rememberMe) {
          localStorage.setItem('username', loginForm.value.username)
        }
        
        ElMessage.success({
          message: '登录成功',
          duration: 2000,
          showClose: false,
          offset: 20
        })
        router.push('/')
      } catch (error: any) {
        ElMessage.error(error?.response?.data?.message || '登录失败')
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <svg class="apple-logo" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M31.6 21.6c-.1-3.4 2.8-5 2.9-5.1-1.6-2.3-4.1-2.6-5-2.7-2.1-.2-4.1 1.2-5.2 1.2-1.1 0-2.7-1.2-4.4-1.2-2.3 0-4.5 1.3-5.7 3.3-2.4 4.1-.6 10.1 1.7 13.4 1.2 1.7 2.6 3.6 4.5 3.5 1.8-.1 2.5-1.1 4.7-1.1 2.2 0 2.8 1.1 4.6 1.1 1.9 0 3.1-1.7 4.3-3.4 1.4-2 2-4 2-4.1-.1 0-3.8-1.5-3.9-5.8zm-7.2-10.7c.9-1.1 1.5-2.7 1.3-4.3-1.3.1-2.9.9-3.8 2-0.8.9-1.6 2.5-1.3 4 .1.1 2.1.2 3.8-1.7z"/>
        </svg>
        <h1 class="login-title">登录 TRM</h1>
        <p class="login-subtitle">使用您的账号登录以继续</p>
      </div>
      
      <el-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入您的账号"
            :prefix-icon="User"
            class="login-input"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入您的密码"
            :prefix-icon="Lock"
            show-password
            class="login-input"
          />
        </el-form-item>

        <div class="login-options">
          <el-checkbox v-model="loginForm.rememberMe" class="remember-me">
            记住我
          </el-checkbox>
          
          <a href="#" class="forgot-password">
            忘记账号或密码？
          </a>
        </div>

        <el-button
          type="primary"
          :loading="isLoading"
          class="login-button"
          @click="handleLogin(formRef)"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
/* 登录页面容器 - 固定定位，禁止滚动 */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f7;
  padding: 20px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* 登录框 - 白色背景，圆角阴影 */
.login-box {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin: auto;
}

/* 登录页头部 - 包含logo和标题 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

/* Apple logo样式 */
.apple-logo {
  width: 40px;
  height: 40px;
  color: #000;
  margin-bottom: 20px;
}

/* 登录标题 */
.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
}

/* 登录副标题 */
.login-subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

/* 登录表单 */
.login-form {
  width: 100%;
}

/* 输入框样式 - 使用深度选择器修改Element Plus默认样式 */
.login-input :deep(.el-input__wrapper) {
  background-color: #f5f5f7;
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: none !important;
}

/* 输入框悬停效果 */
.login-input :deep(.el-input__wrapper:hover) {
  background-color: #e8e8ed;
}

/* 输入框聚焦效果 */
.login-input :deep(.el-input__wrapper.is-focus) {
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1) !important;
}

/* 登录选项区域 - 记住我和忘记密码 */
.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

/* 记住我复选框文字颜色 */
.remember-me {
  color: #666;
}

/* 忘记密码链接样式 */
.forgot-password {
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  transition: color 0.2s;
}

/* 忘记密码链接悬停效果 */
.forgot-password:hover {
  color: #666;
}

/* 登录按钮样式 */
.login-button {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background-color: #000;
  border: none;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
}

/* 登录按钮悬停效果 */
.login-button:hover {
  background-color: #333;
}

/* 响应式设计 - 移动端适配 */
@media (max-width: 480px) {
  /* 移动端登录框内边距调整 */
  .login-box {
    padding: 30px 20px;
  }
  
  /* 移动端标题字体大小调整 */
  .login-title {
    font-size: 20px;
  }
  
  /* 移动端副标题字体大小调整 */
  .login-subtitle {
    font-size: 14px;
  }
}

/* 移除自定义消息样式 */
</style>
