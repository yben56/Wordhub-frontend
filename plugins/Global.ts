const prounce = (url) => {
  const audio = new Audio(url)
  audio.play()
  event.preventDefault()
}

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      prounce: prounce,
    }
  }
})