<template>
    <div class="col-lg-3" v-for="(data, index) in props.data">
        <div class="card">
            <p class="source">{{ data.source }}<i @click="$prounce(data.target_prounce)" class="fa-solid fa-volume-high"></i></p>
            
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
                <i class="fa-solid fa-chart-simple synonyms"></i>
                <span>{{ $t('SynonymsProbability')}}: </span>
                <span class="probability">{{ $t(data.probability)}}</span>
                <br />
                <i class="fa-solid fa-pen accuracy"></i>
                <span>{{ $t('Accuracy') }}: </span>
                <span v-if="$jwt">
                    <span class="probability">
                        {{ data.accuracy }}/{{ data.tested }}
                        ({{ Math.round((data.accuracy / data.tested) * 100) }}%)
                    </span>
                    <div class="progress">
                        <div class="progress-bar bg-danger" :style="{width: Math.round((data.accuracy / data.tested) * 100) + '%'}"></div>
                    </div>
                </span>
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


    //3. send to api
    let d = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + 'api/answer', {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Accept-Language' : 'zh-tw',
            'access_token' : useCookie('token').value
        },
        body : JSON.stringify({
            correct: correct
        })
    })

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

    .source {
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