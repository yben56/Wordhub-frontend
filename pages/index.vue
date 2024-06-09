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
    </div>
</template>

<script setup>
const { $authorization, $backendapi } = useNuxtApp()

const data = ref([])
const quiz = ref([])
const page = ref(1)

onMounted( async () => {
    let api_words = await $backendapi('GET', '/api/words?pages=9&page=' + page.value)
    api_words.data = api_words.data.map(word => ({type: 'word',...word}))

    let api_quiz = await $backendapi('GET', '/api/quiz?pages=3')
    api_quiz.data = api_quiz.data.map(quiz => ({type: 'quiz',...quiz}))
    
    data.value = mergeArrays(api_words.data, api_quiz.data)
})

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