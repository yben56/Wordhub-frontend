<template>
    <div :class="{'col-lg-3' : $route.path == '/' }" v-for="(data, index) in props.data">
        <div class="card mb-1">
            <div>
                <span class="word">{{ data.word }}</span>
                <span v-if="data.phonetic" class="phonetic">/{{ data.phonetic }}/</span>
                <i @click="$prounce(data.word, data.heteronyms)" class="fa-solid fa-volume-high"></i>
                <div class="openedit float-end">
                    <a :href="'/openedit/update/word/' + data.word + '/' + data.id" :title="$t('OpenEdit')">
                        <i class="fa-solid fa-pen-to-square text-secondary"></i>
                    </a>
                </div>
            </div>
            <p class="translation">{{ data.translation }}</p>
            <p class="info">
                <span v-if="data.pos" class="pos"><i class="fa-solid fa-book"></i> {{ data.pos }}</span>
                <br />
                <i class="fa-solid fa-chart-simple synonyms"></i>
                <span>
                    {{ $t('Probability')}}: 
                    <span class="probability">{{ $data.probability }}</span>
                </span>
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
        <div class="card mt-3" v-if="data.sentences">
            <p v-for="(item, index) in data.sentences">
                <span v-html="replaceWord(item, data.word)"></span><br>
                <span>{{ item.zh }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
const { status } = useAuth()
const auth = computed(() => status.value === 'authenticated')

const props = defineProps(['data', 'href'])

const replaceWord = (item, word) => {
    return item.en.replace(new RegExp(word, 'gi'), function(matched) {
        return '<b class="text-primary">' + matched + '</b>';
    })
}
</script>

<style scoped lang="scss">
.card {
    padding: 25px;
    margin-bottom: 25px !important;
    border: solid 1px #eee;
    box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -webkit-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);

    .word {
        font-size: 18px;
        font-weight: bold;
        margin-bottom:  0;
        margin-right: 10px;
    }

    .phonetic {
        font-size: 14px;
        margin-right: 10px;
        color: #777;
    }

    .translation {
        color: #777;
        height: 120px;
    }

    .pos {
        color: darkred;
    }
 
    .fa-volume-high {
        font-size: 13px;
        vertical-align: middle;
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
}
</style>