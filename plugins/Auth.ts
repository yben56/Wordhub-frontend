export default defineNuxtPlugin(nuxtApp => {
    const token = useCookie('token').value

    nuxtApp.Login = async (data) => {
        try {
            //1. url
            let url = useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/login'

            //2. headers
            let headers = {
                'Content-Type': 'application/json'
            }

            //3. body
            let body = data

            //4. api
            let api = await useNuxtApp().$api('POST', url, headers, body)
            let status = await api.status
            let response = await api.json()

            //5. check state
            if ( status !== 200 ) {
                if ( status == 403 ) {
                    response.is_active = true
                } else {
                    response.is_active = false
                }
                return response
            }

            //6. set cookie
            document.cookie = `jwt=${response.jwt}; path=/`
            document.cookie = `first_name=${response.first_name}; path=/`
            //document.cookie = `profile_pic=${response.profile_pic}; path=/`

            //7. page reload
            window.location.reload()
            
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.Logout = async (data) => {
        try {
            //1. url
            let url = useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/logout'

            //2. headers
            let headers = {
                'Content-Type': 'application/json'
            }

            //3. api
            let api = await useNuxtApp().$api('DELETE', url, headers)
            let status = await api.status
            let response = await api

            //4. check state
            if ( status !== 200 ) {
                console.log('InvalidLogout')
                return
            }

            //5. destroy cookie
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            document.cookie = "first_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            //document.cookie = "profile_pic=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

            //6. to index
            window.location.href = '/'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.Signup = async (data) => {
        try {
            //1. url
            let url = useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/signup'

            //2. headers
            let headers = {
                'Content-Type': 'application/json'
            }

            //3. body
            let body = data

            //4. api
            let api = await useNuxtApp().$api('POST', url, headers, body)
            let status = await api.status
            let response = await api.json()

            //5. check state
            if ( status !== 200 ) {
                if ( status == 403 ) {
                    response.is_active = true
                } else {
                    response.is_active = false
                }
                return response
            }

            //6. EmailConfirmation
            window.location.href = '/EmailConfirmation'
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
            let response = await api
                        
            //5. check state
            if ( status !== 200 ) {
                return response.error //assets/locale/[...].json
            }
            
            //6. success
            return 'EmailConfirmationSuccess'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.ResendEmailConfirmation = async (data) => {
        try {
            //1. url
            let url = useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/email_confirmation'

            //2. headers
            let headers = {
                'Content-Type': 'application/json'
            }

            //3. body
            let body = data

            //4. api
            let api = await useNuxtApp().$api('POST', url, headers, body)
            let status = await api.status
            let response = await api
                        
            //5. check state
            if ( status !== 200 ) {
                return response.error
            }
            
            //6. success
            return 'EmailConfirmationSend'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.ForgotPassword = async (data) => {
        try {
            //1. url
            let url = '/database/ForgotPassword.json'

            //2. headers
            let headers = {
                ip: useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent'])
            }

            //3. body
            let body = data

            //4. api
            const response = await useNuxtApp().$api('GET', url, headers, body)
            
            //5. return
            return response.data

        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.ResetPassword = async (method, data) => {
        //http://localhost:3000/ResetPassword?token=123 use this url for development test
        try {
            //1. headers
            let headers = {
                ip: useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent'])
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

                //6. to index
                if ( response.data.state !== 200 ) { window.location.href = '/' }
            } else {
                //POST ONLY FOR UPDATE PASSWORD (CHANGE BELOW TO POST IN REAL API)
                const url = '/database/ResetPassword.json'
                const response = await useNuxtApp().$api('GET', url , headers, body)

                return response.data
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