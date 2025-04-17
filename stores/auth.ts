import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access_token: null,
    access_token_exp: null,
    first_name: null,
    profile_picture: null
  }),
  getters: {
    authenticated: (state) => !!state.access_token
  },
  actions: {
    //pinia state wont keep after page refresh
    //recover access_token, prevent page refresh, state gone
    init() {
      if ( !process.client ) return

      this.access_token = localStorage.getItem('access_token')
      this.access_token_exp = localStorage.getItem('access_token_exp')
      this.first_name = localStorage.getItem('first_name')
      this.profile_picture = localStorage.getItem('profile_picture')
    },
    setUser(data) {
      this.access_token = data.access_token
      this.first_name = data.first_name

      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('access_token_exp', data.access_token_exp)
      localStorage.setItem('first_name', data.first_name)
      localStorage.setItem('profile_picture', data.profile_picture)
    },
    refreshToken(data) {
      this.access_token = data.access_token
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('access_token_exp', data.access_token_exp)
    },
    logout(options?: { callbackUrl?: string }) {
      const { $backendapi } = useNuxtApp()

      this.access_token = null
      this.access_token_exp = null
      this.id = null
      this.first_name = null
      this.profile_picture = null

      localStorage.removeItem('access_token')
      localStorage.removeItem('access_token_exp')
      localStorage.removeItem('first_name')
      localStorage.removeItem('profile_picture')

      //remove refresh_token
      try {
        $backendapi('POST', 'users/logout')
        console.log('delete refresh token')
      } catch (e) {
        console.warn('refresh_token expired', e)
      }

      if ( process.client ) {
        window.location.href = options?.callbackUrl || '/'
      }
    }
  }
})