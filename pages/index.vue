<template>
    <CategoryComp />
    <CarouselComp />
    <div class="container">
        <div class="row">
            <h5 id="Individual"><i class="fa-solid fa-person"></i>{{ $t('Individual') }}</h5>
            <template v-for="item in data" :key="item.id">
                <WordsComp v-if="item.type === 'word'" :data="item"/>
                <QuizComp v-if="item.type === 'quiz'" :data="[item]"/>
            </template>
        </div>
        <div id="observer"></div>
    </div>
</template>

<script setup>
const { $authorization, $backendapi } = useNuxtApp()
const route = useRoute()
const data = ref([])
const classification = route.query.classification

onMounted( async () => {
    //1. fetch api data
    data.value = await fetchData(classification)

    //2. scroll to bottom and load data
    const observer = new IntersectionObserver((enteries) => {
        enteries.forEach(async (entry) => {
            let newdata = await fetchData(classification)
            data.value = data.value.concat(newdata)
        })
    })

    observer.observe(document.getElementById('observer'))
})

const fetchData = async (classification) => {
    //1. classification
    if ( typeof classification === 'undefined' ) { classification = '' }
    else { classification = '&classification=' + classification }

    //2. words
    let api_words = await $backendapi('GET', '/api/words?pages=9' + classification)
    api_words.data = api_words.data.map(word => ({type: 'word',...word}))

    //3. quiz
    let api_quiz = await $backendapi('GET', '/api/quiz?pages=3')
    api_quiz.data = api_quiz.data.map(quiz => ({type: 'quiz',...quiz}))
    
    //4. merge
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