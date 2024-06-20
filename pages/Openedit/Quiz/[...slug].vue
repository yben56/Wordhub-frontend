<template>
    <div id="openedit-update-quiz" class="container">
       <div class="row">
            <div class="col-md-9">
                <OpeneditTabComp />
                <OpeneditQuizComp />
            </div>
            <div class="col-lg-3">
                
            </div>
       </div> 
    </div>
</template>

<script setup>
const { $authorization, $backendapi } = useNuxtApp()

const word = ref([])

onMounted( async () => {
    //1. api
    let api = await $backendapi('GET', '/api/openedit/word/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1])
    
    //2. make sure classification & sentences have correct elements
    ensureArrayLength(api.data.classification, 4)
    ensureArrayLength(api.data.sentences, 5)

    //3. update word value
    word.value = api.data
})

function ensureArrayLength(arr, length) {
    while ( arr.length < length ) {
        arr.push('')
    }
}
</script>

<style lang="scss">
#openedit-update-quiz {
    margin-top: 30px;
}
</style>