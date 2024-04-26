export default defineNuxtRouteMiddleware(async (to, from) => {

    const jwt = useCookie('jwt').value
    /*
    //1. check cookie jwt exist
    if ( jwt ) {
        try {
            const body = '{jwt:' + jwt + '}'

            //1. fetch api
            const response  = await $fetch('/database/Auth.json', {
                method: 'GET',
                //body: body
            })
            
            //2. check state
            if ( response.state !== 200 ) {
                return navigateTo('/')
            }

            //3. return to page
            return
        } catch (error) {
            console.log('Error:' + error)
        }
    } else {
        return navigateTo('/')
    }
    */


    return
})