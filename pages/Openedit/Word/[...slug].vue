<template>
    <div id="openedit-update-word" class="container">
       <div class="row">
            <div class="col-md-9">
                <OpeneditTabComp />
                <OpeneditInfoComp />
                <OpeneditWordComp :data="word" :method="method"/>
                <br>
            </div>
            <div class="col-lg-3">
                
            </div>
       </div> 
    </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })
const { $backendapi } = useNuxtApp()
const route = useRoute()
const method = ref('')
const word = ref([])

onMounted( async () => {

    if ( route.params.slug.length !== 2 ) {
        //1. add word
        method.value = 'POST'

        word.value = {
            'word' : '',
            'translation' : '',
            'phonetic' : '',
            'pos' : '',
            'classification' : ['', '', '', ''],
            'sentences' : [{'en':'','zh':''}]
        }
    } else {
        //2. update word
        method.value = 'PUT'

        let api = await $backendapi('GET', '/api/openedit/word/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1])

        //3. make sure classification & sentences have correct elements
        ensureClassificationLength(api.data.classification, 4)
        ensureSentencesLength(api.data.sentences, 1)

        //4. update word value
        word.value = api.data
    }    
})

function ensureClassificationLength(arr, length) {
    while ( arr.length < length ) { arr.push('') }
}

function ensureSentencesLength(arr, length) {
    while ( arr.length < length ) { arr.push({'en':'','zh':''}) }
}
</script>

<style lang="scss" scoped>
#openedit-update-word {
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