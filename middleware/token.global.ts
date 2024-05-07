export default defineNuxtRouteMiddleware(async (to, from) => {
  
    const { data: session, signOut } = useAuth()

    Date.prototype.addHours= function(h){
        this.setHours(this.getHours()+h);
        return this;
    }

    if ( session.value?.user !== undefined ) {
        let currentDate = new Date()

        let access_token = session.value?.user.access_token
        let access_token_exp = session.value?.user.access_token_exp
        let refresh_token = session.value?.user.refresh_token
        let refresh_token_exp = session.value?.user.refresh_token_exp

        access_token_exp = new Date(access_token_exp)
        access_token_exp = access_token_exp.addHours(8)
        refresh_token_exp = new Date(refresh_token_exp)
        refresh_token_exp = refresh_token_exp.addHours(8)

        //1. if access_token exp
        if ( currentDate > access_token_exp ) {
            
            if ( currentDate > refresh_token_exp ) {
                //refresh_token exp, logout
                signOut()
            } else {
                //update access_token
                let api = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/refresh_token', {
                    method : 'POST',
                    headers : {
                        'Accept-Language' : 'zh-tw',
                        'Authorization' : 'Bearer ' + refresh_token
                    }
                })
        
                let status = await api.status
                let response = await api.json()

                if ( status == 200 ) {

                }
            }
        }
    }
 
})