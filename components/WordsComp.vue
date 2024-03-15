<template>
    <a href="/Word" v-for="(data, index) in outputdata">
        <div :class="['card', data.class ]">
            <div class="top">
                <span class="card-header">
                    {{ $t('SynonymsProbability')}}: {{ $t(data.probability)}}
                </span>
                <h2>{{ data.from }}<i @click="prounce(data.from_prounce)" class="fa-solid fa-volume-high"></i></h2>
            </div>
            <div class="bottom">
                <h2>{{ data.to }}<i @click="prounce(data.to_prounce)" class="fa-solid fa-volume-high"></i></h2>
            </div>
            <div class="card-footer">
                <span>{{ $t('Accuracy') }}: </span>
                <span v-if="token">{{ data.accuracy }}</span>
                <a v-else class="text-decoration-underline" href="/Login">{{ $t('LoginActive') }}</a>
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
        const wordsresponse  = await $fetch('/database/Words.json', {
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
        margin: 30px 0;
    }

    .bottom {
        height: 160px;

        h2 {
            margin-top: 60px;
        }
    }

    .top {
        position: relative;
        background-color: #323132;
        padding: 10px;
        color: #fff;
        min-height: 150px;
        border-radius: 4px;
    }

    .top:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 84%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-top-color: #323132;
        border-bottom: 0;
        border-left: 0;
        margin-left: -15px;
        margin-bottom: -15px;
    } 
}
</style>