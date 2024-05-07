const prounce = (url) => {
  const audio = new Audio(url)
  audio.play()
  event.preventDefault()
}

const authorization = () => {
  const { data: getSession } = useAuth()
  
  if ( getSession.value ) {
      return 'Bearer ' + getSession.value.user.access_token
  } else {
      return false
  }
}

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      authorization: authorization(),
      prounce: prounce,
    }
  }
})