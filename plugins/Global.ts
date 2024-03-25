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

  if ( method !== 'GET' ) { options.body = body }
  
  //2.
  const response = await fetch(url, options)
  .then( async (response) => {
    const body = await response.json()

    return {
      status: response.status,
      data: body
    }
  }).catch((error) => {
    console.log('Error: ' + error)
  })

  if ( response.status !== 200 ) { return {} }

  return response
}

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      prounce: prounce,
      api: api,
    }
  }
})