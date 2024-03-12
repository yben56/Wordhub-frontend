<template>
    <ClassificationComp />
    <div class="wrapper">
        <template v-for="(item, index) in outputdata">
            <template v-if="item.type === 'card'">
                <CardComp :data="item" :key="index" />
            </template>
            <template v-else>
                <QuestionComp :data="item" :key="index" />
            </template>
        </template>
    </div>
</template>

<script setup>
const token = useCookie('token').value
const outputdata = ref([])

onMounted( async () => {
    try {
        const body = '{token:' + token + '}'

        //CARDS
        const cardsresponse  = await $fetch('/database/Words.json', {
            method: 'GET',
            //body: body
        })

        outputdata.value.push(...cardsresponse.data)
        
        //QUESTIONS
        const questionsresponse  = await $fetch('/database/Questions.json', {
            method: 'GET',
            //body: body
        })
                
        outputdata.value.splice(4, 1, questionsresponse.data[0])
        outputdata.value.splice(9, 1, questionsresponse.data[1])

    } catch (error) {
        console.log('Error:' + error)
    }
});
</script>