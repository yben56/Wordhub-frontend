export default defineNuxtPlugin(nuxtApp => {
    const jwt = useCookie('token').value

    return {
        provide: {
            jwt: jwt
        }
    }
})