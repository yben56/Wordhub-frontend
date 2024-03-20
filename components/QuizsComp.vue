<template>
    <div v-for="(data, index) in props.data">
        <div class="card">
            <h1 class="from">{{ data.from }}<i @click="$prounce(data.to_prounce)" class="fa-solid fa-volume-high"></i></h1>
            
            <form class="answer" :id="data.id">
                <div class="question">
                    <div class="form-check" v-for="(item, index) in data.options">
                        <label>
                            <input
                                @click="submitanswer(data.id)" 
                                :name="data.id" 
                                :value="index"
                                :data-answer="item.answer"
                                class="form-check-input"
                                type="radio"
                                required
                            >
                            {{ item.question }}
                        </label>
                    </div>                
                </div>
            </form>

            <p class="info">
                <i class="fa-solid fa-square synonyms"></i>
                <span>{{ $t('SynonymsProbability')}}: {{ $t(data.probability)}}</span>
                <br />
                <i class="fa-solid fa-square accuracy"></i>
                <span>{{ $t('Accuracy') }}: </span>
                <span v-if="$token">{{ data.accuracy }}</span>
                <a v-else class="text-decoration-underline" href="/Login">{{ $t('LoginActive') }}</a>
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['data'])

const submitanswer = async (id) => {
    //1. select options
    let labels = document.getElementById(id).querySelectorAll('label')
    let correct = false

    //2. options
    labels.forEach(label => {
        let input = label.querySelector('input')

        //css display answer & false
        if ( input.getAttribute('data-answer') == 'true' ) {
            label.classList.add('correctanswer')
        } else {
            label.classList.add('text-decoration-line-through')
        }

        //'correct var' for api
        if ( input.checked && input.getAttribute('data-answer') == 'true' ) {
            correct = true
        }

        //disable input radio
        input.setAttribute('disabled', '')
    })

    //headers
    let headers = { token: useCookie('token').value }

    //body
    let body = { correct: correct }
    
    //3. send to api
    const a = await useNuxtApp().$api('GET', '/database/Answer.json', headers, body)
}
</script>

<style scoped lang="scss">
.card {
    background-color: #434344;
    color: #fff;
    padding: 10px 15px;
    border: solid 1px #3535;

    .from {
        font-family: "Barlow Condensed", sans-serif;
        font-weight: 200;
        font-style: normal;
        color: #fff;
        margin-bottom:  20px;
    }
    
    .fa-volume-high {
        margin-left: 5px;
        font-size: 13px;
        vertical-align: middle;
        cursor: pointer;
    }

    .fa-volume-high:hover {
        color: red;
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

    .answer {
       margin-bottom: 20px;
        
        .question {
            .form-check {
                text-align: left;
                display: flex;
                align-items: center;

                label {
                    cursor: pointer;
                    
                    .form-check-input {
                        margin-top: 7px;
                        margin-right: 10px;
                    }
                }
            } 
        }

        .correctanswer {
            pointer-events: none;
        }

        .text-decoration-line-through {
            color: #555;
        }
    }
}
</style>