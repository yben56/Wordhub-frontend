export default defineNuxtPlugin(nuxtApp => {
    const token = useCookie('token').value

    nuxtApp.Login = async (data) => {
        try {
            //1. api
            let api = await useNuxtApp().$api('POST', useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/login', {
                'Content-Type' : 'application/json',
                'Accept-Language' : 'zh-tw'
            }, data)
            let status = await api.status
            let response = await api.json()

            //2. active
            if ( status == 403 ) { response.is_active = true }
            else { response.is_active = false }

            //3. check state
            if ( status !== 200 ) { return response }

            //4. set cookie
            document.cookie = `jwt=${response.data.jwt}; path=/`
            document.cookie = `first_name=${response.data.first_name}; path=/`
            //document.cookie = `profile_pic=${response.data.profile_pic}; path=/`

            //5. page reload
            window.location.reload()
            
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.Logout = async (data) => {
        try {
            //1. api
            let api = await useNuxtApp().$api('DELETE', useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/logout', {
                'Content-Type': 'application/json',
                'Accept-Language' : 'zh-tw'
            })
            let status = await api.status
            let response = await api.json()

            //2. check state
            if ( status !== 200 ) { console.log(response) }

            //3. destroy cookie
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            document.cookie = "first_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            //document.cookie = "profile_pic=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

            //4. to index
            window.location.href = '/'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.Signup = async (data) => {
        try {
            //1. api
            let api = await useNuxtApp().$api('POST', useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/signup', {
                'Content-Type': 'application/json',
                'Accept-Language' : 'zh-tw'
            }, data)
            let status = await api.status
            let response = await api.json()

            if ( status == 403 ) { response.is_active = true } else { response.is_active = false }

            //2. check state
            if ( status !== 200 ) { return response }

            //3. EmailConfirmation
            nuxtApp.router.push({
                path: '/Info',
                query: { message: response.message }
            })
            //window.location.href = '/EmailConfirmation'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.EmailConfirmation = async (data) => {
        try {
            //1. url
            let url = useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/email_confirmation?token=' + data

            //2. headers
            let headers = {
                'Content-Type': 'application/json'
            }

            //4. api
            let api = await useNuxtApp().$api('GET', url, headers)
            let status = await api.status
            let response = await api.json()
                        
            if ( status != 200 ) { return response }

            //3. EmailConfirmation
            nuxtApp.router.push({
                path: '/Info',
                query: { message: response.message }
            })
            //window.location.href = '/EmailConfirmation'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.ResendEmailConfirmation = async (data) => {
        try {
            //1. api
            let api = await useNuxtApp().$api('POST', useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/email_confirmation', {
                'Content-Type': 'application/json',
                'Accept-Language' : 'zh-tw'
            }, data)
            let status = await api.status
            let response = await api.json()
                       
            //2.
            if ( status != 200 ) { return response }

            //3. EmailConfirmation
            nuxtApp.router.push({
                path: '/Info',
                query: { message: response.message }
            })
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.ForgotPassword = async (data) => {
        try {
            //1. url
            let url = useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/reset_password'

            //2. headers
            let headers = {
                'Content-Type': 'application/json'
            }

            //3. body
            let body = data

            //4. api
            let api = await useNuxtApp().$api('POST', url, headers, body)
            let status = await api.status
            
            if ( status !== 200 ) {
                let response = await api.json()
                return response.error
            } 

            return 'ResetPasswordLinkSend'

        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.ResetPassword = async (method, data) => {
        //http://localhost:3000/ResetPassword?token=123 use this url for development test
        try {
            //1. headers
            let headers = {
                'Content-Type': 'application/json'
            }

            //2. body
            let body = data

            //3. method & api
            if ( method == 'GET' ) {
                //if no token
                if ( !body.token ) { window.location.href = '/' }

                //GET ONLY FOR CHECK TOKEN EXISIT
                const url = '/database/ResetPassword.json?token=' + body.token
                const response = await useNuxtApp().$api('GET', url , headers)

                if ( response.data.state !== 200 ) { window.location.href = '/' }
            } else {
                //PUT ONLY FOR UPDATE PASSWORD
                let url = useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/reset_password'
                  
                let api = await useNuxtApp().$api('PUT', url, headers, body)
                let status = await api.status
                
                //4. check state
                if ( status !== 200 ) {
                    let response = await api.json()
                    return response.error
                }

                return 'ResetPasswordSuccess'
            }
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    return {
        provide: {
            token: token
        }
    }
})