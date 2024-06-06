const prounce = (word, heteronyms) => {

  if ( heteronyms ) { heteronyms = 'heteronyms/' } else {  heteronyms = '' }

  let url = '/pronounce/' + heteronyms + word + '.mp3'

  const audio = new Audio(url)
  audio.play()
  event.preventDefault()
}

const backendapi = async (method, url, body=null) => {

  const { data: getSession } = useAuth()
  
  //1. url
  url = useRuntimeConfig().public.BACKEND_API_BASE_URL + url

  //2. headers
  let headers = {
    'Content-Type': 'application/json',
    'Accept-Language' : 'zh-tw',
  }

  if ( getSession.value ) { headers['Authorization'] = 'Bearer ' + getSession.value.user.access_token }

  //3. options
  let options = {
    method: method,
    headers: headers
  }

  if ( method != 'GET' ) { options['body'] = body }

  //4.
  let data = await fetch(url, options)
  return await data.json()
}

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      backendapi: backendapi,
      prounce: prounce,
    }
  }
})