import { defineStore } from 'pinia'

// 用户信息接口
export interface UserInfo {
  peDateDat: string
  peUpdateDat: string
  hkey: string
  peSexStr: string
  peNameStr: string
  pePasswordStr: string
  rkey: string
  peLoginStr: string
}

// 登录响应接口
export interface LoginResponse {
  message: string
  userInfo: UserInfo[]
  token: string
  'x-forwarded-for': string
  sourceIp: string
}

// Store 状态接口
interface UserState {
  token: string
  userInfo: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null
  }),
  
  getters: {
    // 获取用户名
    username: (state) => state.userInfo?.peNameStr || '',
    // 获取登录名
    loginName: (state) => state.userInfo?.peLoginStr || '',
    // 判断是否已登录
    isLoggedIn: (state) => !!state.token
  },
  
  actions: {
    // 设置用户信息
    setUser(token: string, userInfo: UserInfo) {
      this.token = token
      this.userInfo = userInfo
      // 可选：同时存储到 localStorage
      localStorage.setItem('token', token)
    },
    
    // 清除用户信息
    clearUser() {
      this.token = ''
      this.userInfo = null
      localStorage.removeItem('token')
    }
  },
  
  // 开启持久化
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['token', 'userInfo']
  }
})
