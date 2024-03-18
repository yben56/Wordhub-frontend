<template>
    <div id="container" class="container">
        <div class="row">
            <div class="col-md-9 word">
                <div class="card">
                    <h1 class="from">{{ data.from }}<i @click="prounce(data.from_prounce)" class="fa-solid fa-volume-high"></i></h1>
                    <b class="to">{{ data.to }}<i @click="prounce(data.to_prounce)" class="fa-solid fa-volume-high"></i></b>
                    <p class="info">
                        <i :class="[ data.class ]" class="fa-solid fa-square"></i>
                        <span>{{ data.class }}</span>
                        <br />
                        <i class="fa-solid fa-square synonyms"></i>
                        <span>{{ $t('SynonymsProbability') }}: {{ data.probability }}</span>
                        <br />
                        <i class="fa-solid fa-square accuracy"></i>
                        <span>{{ $t('Accuracy') }}: </span>
                        <span v-if="token">{{ data.accuracy }}</span>
                        <a v-else class="text-decoration-underline" href="/Login">{{ $t('LoginActive') }}</a>
                    </p>
                </div>
                <div class="card"  v-for="(sentence, index) in data.sentences">
                    <span>{{ sentence.from }}</span>
                    <span>{{ sentence.to }}</span>
                </div>
            </div>
            <div class="col-md-3 d-none d-sm-block side">
                <h4>{{ $t('Homonym') }}</h4>
                <HomonymsComp />
                <h4>{{ $t('Quiz') }}</h4>
                <QuestionsComp />
            </div>
        </div>
    </div>
</template>

<script setup>
const token = useCookie('token').value
const data = ref([])

onMounted( async () => {
    try {
        const body = '{token:' + token + '}'

        //WORD (/database/Word/{id})
        const wordresponse  = await $fetch('/database/Word.json', {
            method: 'GET',
            //body: body
        })
        
        data.value = wordresponse.data

    } catch (error) {
        console.log('Error:' + error)
    }  
})

const prounce = (url) => {
    const audio = new Audio(url)
    audio.play()
    event.preventDefault()
}
</script>

<style>
.word {
    margin-top: 15px;

    .card {
        background-color: #2d3134;
        color: #fff;
        padding: 10px 15px;
        border: solid 1px #3535;
        margin-bottom: 15px;

        .from {
            font-family: "Barlow Condensed", sans-serif;
            font-weight: 200;
            font-style: normal;
            color: #fff;
            margin-bottom:  0;
        }

        .to {
            margin-bottom: 112px;
            color: #aaa;
        }
    
        .fa-volume-high {
            margin-left: 5px;
            font-size: 13px;
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
}

.side {
    margin-top: 15px;
    
    h4 {
        color: #fff;
        padding: 10px 0;
        border-bottom: solid 1px #555;
    }

    .card {
        margin-bottom: 15px;
    }
}
</style>