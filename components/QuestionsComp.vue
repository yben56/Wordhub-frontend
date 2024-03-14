<template>
    <div class="card">
        <div class="top">
            <span class="card-header">{{ $t('SynonymsProbability')}}: {{ $t(data.probability)}}</span>
            <h2>{{ data.from }}<i class="fa-solid fa-volume-high"></i></h2>
        </div>
        <form class="bottom" :id="data.id">
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
        <div class="card-footer">
            <span>{{ $t('Accuracy') }}: </span>
            <span v-if="token">{{ data.accuracy }}</span>
            <span class="text-decoration-underline" v-else><a href="/Login">{{ $t('LoginActive') }}</a></span>
        </div>
    </div>
</template>

<script>
export default {
    props: { 
        data: {
            type: Object,
            require: true
        }
    },
    methods: {
        async submitanswer(id) {
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

            const token = useCookie('token').value
            const body = '{token:' + token + '}'
            
            //3. send to api
            try {
                const submitanswerresponse  = await $fetch('/database/Answer.json', {
                    method: 'GET',
                    //body: body
                })
                console.log
                //console.log(submitanswerresponse)
            } catch (error) {
                console.log('Error:' + error)
            }
        }
    }, setup(props) {
        const token = useCookie('token').value
        return { token }
    }
}
</script>

<style scoped>
.correctanswer {
    color: red;
    pointer-events: none;
}

.card {
    text-align: center;
    border: solid 1px #ccc;
    background-color: #fff;
    min-height: 320px;

    .fa-volume-high {
        margin-left: 5px;
        font-size: 13px;
        vertical-align: middle;
    }

    .card-header, .card-footer {
        background-color: transparent;
        border: none;
        margin: 10px;

        span, a {
            font-size: 12px;
        }
    }
    
    h2 {
        font-family: "Barlow Condensed", sans-serif;
        font-weight: 500;
        font-style: normal;
        margin: 30px 0;
    }

    > h2 {
        margin-top: 50px;
    }

    .bottom {
        padding: 10px;
        height: 150px;

        .question {
            padding: 10px;
            margin-bottom: 10px;
       
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

        a {
            color: red;
            float: left;
            font-size: 12px;
            margin-top: 10px;
        }
    }

    .top {
        position: relative;
        background-color: #eee;
        padding: 10px;
        min-height: 150px;
    }

    .top:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 84%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-top-color: #eee;
        border-bottom: 0;
        border-left: 0;
        margin-left: -15px;
        margin-bottom: -15px;
    } 
}
</style>