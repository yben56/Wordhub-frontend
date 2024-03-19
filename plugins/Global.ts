const prounce = (url) => {
  const audio = new Audio(url)
  audio.play()
  event.preventDefault()
}

const api = async (method, url, page = false, token = false) => {
  try {
    const body = {
      token: token,
      page: page
    }

    const response  = await $fetch(url, {
        method: method,
        //body: body
    })

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