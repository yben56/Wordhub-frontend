<template>
    <div id="openedit-update-quiz" class="container">
       <div class="row">
            <div class="col-md-9">
                <OpeneditTabComp />
                <OpeneditQuizComp :data="quiz" />
            </div>
            <div class="col-lg-3">
                
            </div>
       </div> 
    </div>
</template>

<script setup>
const { $authorization, $backendapi } = useNuxtApp()

const quiz = ref([])

onMounted( async () => {
    //1. api
    let api = await $backendapi('GET', '/api/openedit/quiz/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1])
    
    //2. update word value
    quiz.value = api.data
})
</script>

<style lang="scss">
#openedit-update-quiz {
    margin-top: 30px;
}
</style>