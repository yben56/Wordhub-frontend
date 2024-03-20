export default defineNuxtPlugin(nuxtApp => {
    const token = useCookie('token').value

    nuxtApp.Login = async (data) => {
        try {
            //1. url
            let url = '/database/Login.json'

            //2. headers
            let headers = { ip: useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent']) }

            //3. body
            let body = data

            //4. api
            const response = await useNuxtApp().$api('GET', url, headers, body)
            
            //5. check state
            if ( response.state !== 200 ) {
                return response //'InvalidEmailOrPassword' assets/locale/[...].json
            }

            //6. set cookie
            document.cookie = `token=${response.token}; path=/`
            document.cookie = `firstname=${response.firstname}; path=/`
            document.cookie = `profile_pic=${response.profile_pic}; path=/`

            //7. page reload
            window.location.reload()
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.Logout = async (data) => {
        try {
            //1. url
            let url = '/database/Logout.json'

            //2. headers
            let headers = {
                ip: useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent']),
                token: useCookie('token').value
            }

            //3. api
            const response = await useNuxtApp().$api('GET', url, headers)
            
            //4. check state
            if ( response.state !== 200 ) {
                console.log('InvalidLogout')
                return
            }

            //5. destroy cookie
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            document.cookie = "profile_pic=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

            //6. to index
            window.location.href = '/'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.Signup = async (data) => {
        try {
            //1. url
            let url = '/database/Signup.json'

            //2. headers
            let headers = {
                ip: useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent']),
                token: useCookie('token').value
            }

            //3. body
            let body = data

            //4. api
            const response = await useNuxtApp().$api('GET', url, headers, body)
            
            //5. check state
            if ( response.state !== 200 ) {
                return response //assets/locale/[...].json
            }

            //6. varify email
            window.location.href = '/VarifyEmail'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.VarifyEmail = async (data) => {

        //FOR TEST URL TYPE http://localhost:3000/VarifyEmail?token={any value}

        try {
            //1. url
            let url = '/database/VerifyEmail.json'

            //2. headers
            let headers = {
                ip: useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent'])
            }

            //3. body
            let body = data

            //4. api
            const response = await useNuxtApp().$api('GET', url, headers, body)

            //5. check state
            if ( response.state !== 200 ) {
                return response //assets/locale/[...].json
            }

            //6. set cookie
            document.cookie = `token=${response.token}; path=/`
            document.cookie = `firstname=${response.firstname}; path=/`
            document.cookie = `profile_pic=${response.profile_pic}; path=/`

            //7. to index
            window.location.href = '/'
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
            return response

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
                if ( response.state !== 200 ) { window.location.href = '/' }
            } else {
                //POST ONLY FOR UPDATE PASSWORD (CHANGE BELOW TO POST IN REAL API)
                const url = '/database/ResetPassword.json'
                const response = await useNuxtApp().$api('GET', url , headers, body)

                return response
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