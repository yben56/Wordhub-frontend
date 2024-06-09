<template>
    <div class="col-lg-3">
        <a :href="'/Word/' + data.word + '/' + data.id">
            <div class="card mb-1">
                <p class="word">{{ data.word }}<i @click="$prounce(data.word, data.heteronyms)" class="fa-solid fa-volume-high"></i></p>
                <p class="translation">{{ data.translation }}</p>
                <p class="info">
                    <span class="pos"><i class="fa-solid fa-book"></i> {{ data.pos }}</span>
                    <br />
                    <i class="fa-solid fa-chart-simple synonyms"></i>
                    <span>
                        {{ $t('Probability')}}: 
                        <span class="probability">{{ data.probability }}</span>
                    </span>
                    <br />
                    <i class="fa-solid fa-pen accuracy"></i>
                    <span>{{ $t('Accuracy') }}: </span>
                    <span v-if="auth">
                        <span class="probability">
                            {{ data.evaluation.correctness }}/{{ data.evaluation.trials }}
                            ({{ data.evaluation.accuracy }})
                        </span>
                        <div class="progress">
                            <div class="progress-bar bg-danger" :style="{width: data.evaluation.accuracy}"></div>
                        </div>
                    </span>
                    <a v-else class="text-decoration-underline" href="/Login">{{ $t('LoginActive') }}</a>
                </p>
            </div>
        </a> 
    </div>
</template>

<script setup>
const { status } = useAuth()
const auth = computed(() => status.value === 'authenticated')

const props = defineProps(['data'])
const data = props.data
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
    }

    .translation {
        height: 120px;
        color: #777;
    }
 
    .fa-volume-high {
        margin-left: 5px;
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