import request from '@/utils/request'
import type { LoginResponse } from '@/stores/user'

interface LoginParams {
  username: string
  password: string
}

export const authApi = {
  /**
   * 用户登录
   * @param data 登录参数
   * @returns Promise<LoginResponse>
   */
  login(data: LoginParams) {
    return request<LoginResponse>({
      url: '/login',
      method: 'post',
      data
    })
  },

  /**
   * 用户登出
   * @returns Promise<void>
   */
  logout() {
    return request({
      url: '/logout',
      method: 'post'
    })
  }
} 