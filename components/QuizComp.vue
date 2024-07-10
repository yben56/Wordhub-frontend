<template>
    <div :class="{'col-lg-3' : $route.path == '/' }" v-for="(data, index) in props.data">
        <div class="card">
            <p class="word">
                <a :href="'/search?q=' + data.word" target="blank">{{ data.word }}</a>
                <i @click="$prounce(data.word, data.heteronyms)" class="fa-solid fa-volume-high"></i>
            </p>
            
            <form class="answer" :id="data.id">
                <div class="question">
                    <div class="form-check" v-for="(item, index) in data.quiz">
                        <label>
                            <input
                                @click="submitanswer(data.id, data.word)" 
                                :name="data.id" 
                                :value="item[0]"
                                :data-answer="item[2]"
                                class="form-check-input"
                                type="radio"
                                required
                                :disabled="data.answer"
                            >
                            {{ item[1] }}
                            <span v-if="data.answer">:
                                <a :href="'/search?q=' + item[0]" target="blank">
                                    <span class="text-primary">{{ item[0] }}</span>
                                </a>
                            </span>
                        </label>
                    </div>
                    <div class="form-check text-muted">
                        <label>
                        <input
                            @click="submitanswer(data.id, data.word)"
                            :name="data.id"
                            value="giveup"
                            :data-answer="false"
                            class="form-check-input"
                            type="radio"
                            required
                            :disabled="data.answer"
                        > {{ $t('GiveUp') }} <i class="fa-regular fa-flag"></i>
                        </label>
                    </div>
                </div>
            </form>

            <p class="info">
                <i class="fa-solid fa-chart-simple synonyms"></i>
                <span>{{ $t('Probability')}}: </span>
                <span class="probability">{{ data.probability }}</span>
                <br />
                <i class="fa-solid fa-pen accuracy"></i>
                <span>{{ $t('Accuracy') }}: </span>
                <span v-if="auth">
                    <span class="probability">
                        {{ data.evaluation.correct }}/{{ data.evaluation.trials }}
                        ({{ data.evaluation.accuracy }})
                    </span>
                    <div class="progress">
                        <div class="progress-bar bg-danger" :style="{width: data.evaluation.accuracy}"></div>
                    </div>
                </span>
                <a v-else class="text-decoration-underline" href="/Login">{{ $t('LoginActive') }}</a>
            </p>
        </div>
    </div>
</template>

<script setup>
const { $backendapi } = useNuxtApp()
const { status, data: getSession } = useAuth()
const auth = computed(() => status.value === 'authenticated')

let props = defineProps(['data'])
props.data.forEach(obj => { obj.answer = false }) //add answer false

const submitanswer = async (id, word) => {
    //1. select options
    let labels = document.getElementById(id).querySelectorAll('label')
    let correct = 0

    //2. disable input & show all english answer
    props.data.forEach(obj => { if  (obj.id === id ) { obj.answer = true } })

    //3. options
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
            correct = 1
        }
    })
    
    //3. send to api
    if ( auth.value ) {
        await $backendapi('POST', 'api/answer', JSON.stringify({
            wordid: id,
            word: word,
            correct: correct
        }))
    }
}
</script>

<style scoped lang="scss">
.card {
    padding: 25px;
    margin-bottom: 25px !important;
    border: solid 1px rgba(104, 18, 243, 0.2);
    box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -webkit-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);

    .word a {
        font-size: 18px;
        font-weight: bold;
        margin-bottom:  20px;
    }
    
    .fa-volume-high {
        margin-left: 5px;
        font-size: 13px;
        vertical-align: middle;
        cursor: pointer;
        color: #6610f2;
    }

    .fa-volume-high:hover {
        color: red;
    }

    .question {
        height: 120px;
    }

    .info {
        margin-bottom: 0;
        span, a {
            font-size: 12px;
        }

        a {
            color: #6610f2;
        }

        .probability {
            color: #777;
        }

        .progress {
            height: 3px;
            margin-top: 10px;
        }
    }

    .fa-book {  margin-right: 5px; font-size: 12px; }
    .synonyms { color: #f1e47e; margin-right: 5px; }
    .accuracy { color: red; margin-right: 5px; }
    .progress { border-radius: 0; }

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
            color: #ccc;
        }
    }
}
</style>