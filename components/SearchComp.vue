<template>
    <a :href="'/Word/' + [ data.id ]" v-for="(data, index) in outputdata">
        <div class="card mb-1">
            <h1 class="from">{{ data.from }}<i @click="prounce(data.from_prounce)" class="fa-solid fa-volume-high"></i></h1>
            <b class="to">{{ data.to }}<i @click="prounce(data.to_prounce)" class="fa-solid fa-volume-high"></i></b>
            <p class="info">
                <i :class="[ data.class ]" class="fa-solid fa-square"></i>
                <span>{{ data.class }}</span>
                <br />
                <i class="fa-solid fa-square synonyms"></i>
                <span>{{ $t('SynonymsProbability')}}: {{ $t(data.probability)}}</span>
                <br />
                <i class="fa-solid fa-square accuracy"></i>
                <span>{{ $t('Accuracy') }}: </span>
                <span v-if="token">{{ data.accuracy }}</span>
                <a v-else class="text-decoration-underline" href="/Login">{{ $t('LoginActive') }}</a>
            </p>
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

        //SEARCH
        const searchresponse  = await $fetch('/database/Search.json', {
            method: 'GET',
            //body: body
        })
        
        outputdata.value = searchresponse.data
        //outputdata.value.push(...searchresponse.data)

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

<style scoped type="scss">
.card {
    background-color: #2d3134;
    color: #fff;
    padding: 10px 15px;
    border: solid 1px #3535;

    .from {
        font-family: "Barlow Condensed", sans-serif;
        font-weight: 200;
        font-style: normal;
        color: #fff;
        margin-bottom: 0;
    }

    .to {
        margin-bottom: 50px;
        color: #aaa;
    }
 
    .fa-volume-high {
        margin-left: 5px;
        font-size: 12px;
        vertical-align: middle;
    }

    .info {
        margin-bottom: 0;
        span, a {
            font-size: 12px;
        }

        a {
            color: #fff;
        }
    }

    .fa-square {
        margin-right: 5px;
        font-size: 12px;
    }
    
    .synonyms { color: #f1e47e; }
    .accuracy { color: red; }
}
</style>