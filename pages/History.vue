<template>
    <div id="history" class="container">
        <div class="row">
            <div class="col-md-9">
                <h5><i class="fa-solid fa-clock-rotate-left"></i>{{ $t('SearchHistory') }}</h5>
                <form class="history" action="/history">
                    <div class="input-group input-group-sm">
                        <input class="form-control" name="word" :placeholder="$t('Search')" type="text" :value="$route.query.word" />
                        <button class="btn btn-outline-secondary" type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>
                <HistoryComp :data="history"/>
            </div>
            <div class="col-md-3 d-sm-none d-md-block">
                <h5><i class="fa-solid fa-pen"></i>{{ $t('Quiz') }}</h5>
                <QuizComp :data="quiz" />
            </div>
        </div>
    </div>
    <div id="observer"></div>
</template>

<script setup>
const { $backendapi } = useNuxtApp()
const history = ref([])
const quiz = ref([])

onMounted( async () => {
    //1. params
    let word = useRoute().query.word
    if ( word ) { word = 'word=' + word } else { word = '' }
    
    if ( word ) {
        //2. search single word
        let api_history = await $backendapi('GET', 'api/history?' + word)
        history.value = api_history.data
    }
    else {
        //3. load data & scroll to bottom and load more
        let page = 1
        const observer = new IntersectionObserver((enteries) => {
            enteries.forEach(async (entry) => {
                let api_history = await $backendapi('GET', 'api/history' + '?&page=' + page)
                history.value = history.value.concat(api_history.data)
                page += 1
            })
        })

        observer.observe(document.getElementById('observer'))
    } 

    //4. fetch quiz
    let quizs = await $backendapi('GET', 'api/quiz?pages=5')
    quiz.value = quizs.data

})
</script>

<style scope lang="scss">
#history { 
    margin-top: 15px;
    min-height: 1000px;

    .col-lg-3 {
        width: 100%;
    }

    h5 {
        font-weight: bold;
        margin-left: 10px;

        i {
            margin: 10px;
            margin-left: 0;
            color: #6610f2;
        }
    }

    .history {
        margin-bottom: 15px;

        button {
            border: solid 1px #999;
        }
        
        .fa-solid {
            color: #aaa;
        }

        input {
            background-color: transparent;
            border: solid 1px #999;
            border-right: none;
            font-size: 14px;
        }

        input:focus, button:focus, button:hover {
            box-shadow: none !important;
            background-color: transparent;
        }
    }
}
</style>