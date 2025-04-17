const prounce = (word, heteronyms) => {

  if ( heteronyms ) { heteronyms = 'heteronyms/' } else {  heteronyms = '' }

  let url = useRuntimeConfig().public.PRONOUNCE_BASE_URL + heteronyms + word + '.mp3'
  console.log(useRuntimeConfig().public.PRONOUNCE_BASE_URL)

  const audio = new Audio(url)
  audio.play()
  event.preventDefault()
}

const recommandation = (distribution, num) => {
  //1. get recommand words
  let recommand = []

  //2. num
  num = (Object.keys(distribution).length < num) ? Object.keys(distribution).length : num

  for ( let i = 0; i < num; i++ ) {
    //3. sum
    let sum = Object.values(distribution).reduce((acc, value) => acc + value, 0)

    //4. distribution to frequency array
    const frequency_distribution = [];

    for (const [key, value] of Object.entries(distribution)) {
      for (let i = 0; i < value; i++) {
        frequency_distribution.push(key);
      }
    }

    //5. rand number in range
    let randnum =  Math.floor(Math.random() * sum)
    
    //6. select randword
    let randword = frequency_distribution[randnum]

    //7. del each the word already fetch
    delete distribution[randword]

    //8. push into recommand array
    recommand.push(randword)
  }

  return {
    'distribution' : distribution,
    'recommand' : recommand
  }
}

const backendapi = async (method, url, body=null) => {

  const auth = useAuthStore()
  const access_token = auth.access_token || ''
  
  //1. url
  url = useRuntimeConfig().public.BACKEND_API_BASE_URL + url

  //2. headers
  let headers = {
    'Content-Type': 'application/json',
    'Accept-Language' : 'zh-tw',
  }

  if ( access_token ) { headers['Authorization'] = 'Bearer ' + access_token }

  //3. options
  let options = {
    method: method,
    credentials: 'include',
    headers: headers
  }

  if ( method != 'GET' ) { options['body'] = JSON.stringify(body) }

  //4.
  let response = await fetch(url, options)
  let data = await response.json()
  data.status = response.status

  return data
}

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      backendapi: backendapi,
      prounce: prounce,
      recommandation: recommandation,
    }
  }
})