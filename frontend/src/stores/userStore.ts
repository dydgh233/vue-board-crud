import { defineStore } from 'pinia'

interface UserState {
  nickname: string
  token: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    nickname: '',
    token: '',
  }),
  actions: {
    login(payload: { nickname: string; token: string }) {
      this.nickname = payload.nickname
      this.token = payload.token
      localStorage.setItem('token', payload.token)
    },
    logout() {
      this.nickname = ''
      this.token = ''
      localStorage.removeItem('token')
    },
  },
})
