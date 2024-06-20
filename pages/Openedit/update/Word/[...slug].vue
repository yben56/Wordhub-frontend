<template>
    <div id="openedit-update" class="container">
       <div class="row">
            <div class="col-md-9">
                <OpeneditUpdateTabComp />
                <OpeneditInfoComp />
                <OpeneditWordComp :data="word"/>
                <br>
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
    let api = await $backendapi('GET', '/api/openedit/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1])
    
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

<style lang="scss" scoped>
#openedit-update {
    margin-top: 30px;

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