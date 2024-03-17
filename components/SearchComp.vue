<template>
    <a href="/Word" v-for="(data, index) in outputdata">
        <div :class="['card', data.class ]">
            <div class="left">
                <h2>{{ data.from }}<i @click="prounce(data.from_prounce)" class="fa-solid fa-volume-high"></i></h2>
            </div>
            <div class="right">
                <span class="card-header">
                    {{ $t('SynonymsProbability')}}: {{ $t(data.probability)}}
                </span>
                <h2>{{ data.to }}<i @click="prounce(data.to_prounce)" class="fa-solid fa-volume-high"></i></h2>
                <div class="card-footer">
                    <span>{{ $t('Accuracy') }}: </span>
                    <span v-if="token">{{ data.accuracy }}</span>
                    <a v-else class="text-decoration-underline" href="/Login">{{ $t('LoginActive') }}</a>
                </div>
            </div>
        </div>
    </a>
</template>

<script setup>
const token = useCookie('token').value
const outputdata = ref([])
const props = defineProps({
    page: {
        type: Number,
        default: 1
    }
})

onMounted(() => {
    loaddata(props.page)
})

watch(() => props.page, () => {
    loaddata(props.page)
})

const loaddata = async (page) => {
    try {
        const body = '{token:' + token + ', page:' + page + '}'

        //WORDS
        const wordsresponse  = await $fetch('/database/Search.json', {
            method: 'GET',
            //body: body
        })
        
        outputdata.value = wordsresponse.data
        //outputdata.value.push(...wordsresponse.data)

    } catch (error) {
        console.log('Error:' + error)
    }  
}

const prounce = (url) => {
    const audio = new Audio(url)
    audio.play()
    event.preventDefault()
}
</script>

<style scoped>
.card {
    text-align: center;
    border: none;
    cursor: pointer;
    -webkit-box-shadow: 2px 2px 11px -4px rgba(0,0,0,0.43);
    -moz-box-shadow: 2px 2px 11px -4px rgba(0,0,0,0.43);
    box-shadow: 2px 2px 11px -4px rgba(0,0,0,0.43);
    flex-direction: row;
    margin-bottom: 15px;

    .fa-volume-high {
        margin-left: 5px;
        font-size: 13px;
        vertical-align: middle;
    }

    .card-header, .card-footer {
        background-color: transparent;
        border: none;
        margin: 10px;
    }

    .card-header, .card-footer span, .card-footer a {
        font-size: 12px; 
    }
    
    h2 {
        font-family: "Barlow Condensed", sans-serif;
        font-weight: 500;
        font-style: normal;
    }

    .left {
        position: relative;
        background-color: #323132;
        padding: 10px;
        color: #fff;
        min-height: 130px;
        border-radius: 4px;
        width: 30%;

        h2 {
            margin:  70px 0;
        }
    }

    .left:after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-left-color: #323132;
        border-right: 0;
        border-top: 0;
        margin-top: -10px;
        margin-right: -20px;
    } 

    .right {
        width: 70%;

        h2 {
           margin: 60px 0;
        }
    }
}
</style>