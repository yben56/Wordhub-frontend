<template>
    <div id="word" class="container">
        <div class="row">
            <div class="col-md-9">
                <WordsComp :data="data"/>
            </div>
            <div class="col-md-3">
                <h5><i class="fa-solid fa-pen"></i>{{ $t('Quiz') }}</h5>
                <QuizsComp :data="quiz" />
            </div>
        </div>
    </div>
</template>

<script setup>
const data = ref([])
const quiz = ref([])

onMounted( async () => {
     //headers
    let headers = {
        'Content-Type': 'application/json',
        'Accept-Language' : 'zh-tw'
    }

    //api
    let d = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + '/api/word', {
        method : 'GET',
        headers : headers
    })

    d = await d.json()
    data.value.push(d.data)

    let q = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + '/api/quizs', {
        method : 'GET',
        headers : headers
    })
    q = await q.json()
    quiz.value = q.data
})
</script>

<style lang="scss">
#word { 
    margin-top: 30px;

    .col-lg-3 {
        width: 100%;
    }

    h5 {
        font-weight: bold;
        margin-left: 10px;

        i {
            margin: 10px;
            color: #6610f2;
        }
    }
}
</style>