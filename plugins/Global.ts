const prounce = (url) => {
  const audio = new Audio(url)
  audio.play()
  event.preventDefault()
}

const api = async (method, url, headers, body = false) => {
  try {

    const options = {
        method: method,
        headers: headers
    }

    if ( method !== 'GET' ) { options.body = body }

    const response  = await $fetch(url, options)

    return response

  } catch (error) {
      console.log('Error:' + error)
  }  
}

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      prounce: prounce,
      api: api,
    }
  }
})