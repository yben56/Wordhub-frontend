import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

export default NuxtAuthHandler({
    pages: {
        signIn: '/'
    },
    providers: [
        GithubProvider.default({
            clientId: '9f9bb846fa42999bfb14',
            clientSecret: '165f77ef1b7c17d5b7b8e1412f79d50a31fff4d7'
        }),
        CredentialsProvider.default({
            name: 'Credentials',
            async authorize(credentials : any) {
                
                //1. api
                let api = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/login', {
                    method : 'POST',
                    credentials: 'include',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Accept-Language' : 'zh-tw'
                    },
                    body : JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                })
                
                let status = await api.status
                let response = await api.json()
                
                if ( status == 403 ) {
                    //{error: '', status, ok} (i don't know how to change status, so i put inside of error message)
                    throw new Error(JSON.stringify({status: status, message: response.message}))
                }

                if ( status != 200 ) {
                    //{error: '', status, ok} (i don't know how to change status, so i put inside of error message)
                    throw new Error(JSON.stringify({status: status, message: response.message}))
                }

                return response.data
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }){
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            //1. put api response into user
            session.user = token

            //2.
            return session
        }
    }
})