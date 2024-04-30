export default defineNuxtPlugin(nuxtApp => {
    const token = useCookie('token').value
    console.log(token)

    return {
        provide: {
           jwt: token
        }
    }
})