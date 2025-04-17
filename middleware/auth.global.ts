export default defineNuxtRouteMiddleware(async (to) => {
    if ( !process.client ) return //make sure client side excute

    const auth = useAuthStore()
    //from localStorage recover access_token (prevent page refresh, state gone)
    auth.init()  // recover from localStorage
    
    const currentDate = Math.floor(Date.now() / 1000) //UTC
    const access_token_expDate = Number(auth.access_token_exp || 0)

    const public_pages = ['/', '/signup']

    //if access_token exp
    if ( auth.access_token && currentDate > access_token_expDate ) {
        const { $backendapi } = useNuxtApp()
            
        try {
            const response = await $backendapi('POST', 'users/refresh_token')
        
            if ( response?.data?.access_token ) {
                auth.refreshToken(response.data)
                //console.log('[middleware] access token refreshed')
            } else {
                auth.logout()
            }
        } catch (err) {
            console.warn('[middleware] token refresh failed', err)
            auth.logout()
        }
    }
})