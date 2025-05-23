<template>
    <ClassificationComp />
    <CarouselComp />
    <div class="container">
        <div class="row">
            <h5 id="Individual"><i class="fa-solid fa-book"></i>{{ $route.query.classification  ? $t($route.query.classification) : 'All' }}</h5>
            <template v-for="item in data" :key="item.id">
                <WordsComp v-if="item.type === 'word'" :data="item"/>
                <QuizComp v-if="item.type === 'quiz'" :data="[item]"/>
            </template>
        </div>
    </div>
    <div id="observer"></div>
</template>

<script setup>
const { $backendapi, $recommandation } = useNuxtApp()
const auth = useAuthStore()
const route = useRoute()
const data = ref([])
const classification = route.query.classification
let words_distribution = ref({})
let isloading = ref(false)

onMounted( async () => {
    //1. get words distribution
    if ( auth.authenticated ) {
        let wd = await $backendapi('GET', 'api/words/distribution')
        words_distribution.value = wd.data
    }

    //2. load data & scroll to bottom and load more
    const observer = new IntersectionObserver((enteries) => {
        enteries.forEach(async (entry) => {
            if ( !isloading.value ) {

                isloading.value = true

                try{
                    if ( auth.authenticated && Object.keys(words_distribution.value).length != 0 ) {
                        //1. get random words from distribution
                        let recommandation = $recommandation(words_distribution.value, 9) //set 9 recommand words, backend will output 3 association words (total 12)
                        
                        //2. update distribution
                        words_distribution.value = recommandation.distribution
                        let recommand = recommandation.recommand
                        
                        //3. fetch data from distribution 1st
                        let apidata = await fetchData(classification, recommand)
                        data.value = data.value.concat(apidata)
                    } else {
                        //guess mode, random data
                        let apidata = await fetchData(classification)
                        data.value = data.value.concat(apidata)
                    } 
                } catch (error) {
                    console.error('Error fetching data:', error)
                } finally {
                    isloading.value = false
                }
            }
        })
    })
    
    observer.observe(document.getElementById('observer'))
})

const fetchData = async (classification, recommand = []) => {
    //1. classification
    if ( typeof classification === 'undefined' ) { classification = '' }
    else { classification = '&classification=' + classification }

    //2. recommand
    let recommand_word = ''
    let recommand_quiz = ''

    if ( recommand.length > 0 ) {
        let recommand_word_count = Math.ceil(recommand.length * 2 / 3)
       
        recommand_word = recommand.slice(0, recommand_word_count)
        recommand_quiz = recommand.slice(recommand_word_count)

        recommand_word = '&recommand=' + JSON.stringify(recommand_word)
        recommand_quiz = '&recommand=' + JSON.stringify(recommand_quiz)
    }

    //3. words
    let api_words = await $backendapi('GET', 'api/words?items=9' + classification + recommand_word)
    api_words.data = api_words.data.map(word => ({type: 'word',...word}))

    //4. quiz
    let api_quiz = await $backendapi('GET', 'api/quiz?items=3' + recommand_quiz)
    api_quiz.data = api_quiz.data.map(quiz => ({type: 'quiz',...quiz}))
    
    //5. merge
    return mergeArrays(api_words.data, api_quiz.data)
}

function mergeArrays(arr1, arr2) {
    let mergedArray = [...arr1]
    let insertIndex = 3

    arr2.forEach((item, index) => {
        mergedArray.splice(insertIndex + index * 4, 0, item);
    })

    return mergedArray
}
</script>

<style scoped lang="scss">
.container {
    min-height: 1000px;

    h5 {
        font-weight: bold;
        margin: 15px 10px;

        i {
            font-size: 18px;
            margin-right: 10px;
            color: #6610f2;
        }
    }
}
</style>