<template>
    <ClassificationComp />
    <div class="wrapper">
        <template v-for="(item, index) in outputdata">
            <template v-if="item.type === 'card'">
                <WordsComp :data="item" :key="index" />
            </template>
            <template v-else>
                <QuestionsComp :data="item" :key="index" />
            </template>
        </template>
    </div>
</template>

<script setup>
const token = useCookie('token').value
const outputdata = ref([])

const loaddata = onMounted( async () => {
    try {
        const body = '{token:' + token + '}'

        //WORDS
        const cardsresponse  = await $fetch('/database/Words.json', {
            method: 'GET',
            //body: body
        })

        outputdata.value.push(...cardsresponse.data)
        
        //if ( token ) {
            //QUESTIONS
            const questionsresponse  = await $fetch('/database/Questions.json', {
                method: 'GET',
                //body: body
            })
            
            outputdata.value.push(...questionsresponse.data[0])
            outputdata.value.push(...questionsresponse.data[1])
        //}

    } catch (error) {
        console.log('Error:' + error)
    }  
})


const handleScroll = () => {

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        loaddata()
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
}) 
</script>