const prounce = (url) => {
  const audio = new Audio(url)
  audio.play()
  event.preventDefault()
}

const api = async (method, url, headers, body = false) => {
  
  //1. options
  const options = {
    method : method,
    headers : headers
  }

  if ( method !== 'GET' ) { options.body = JSON.stringify(body) }
  
  //2.
  try {
    return await fetch(url, options)
  } catch(error) {
    console.error('error: ' + error)
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