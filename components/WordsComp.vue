<template>
    <div class="col-lg-3" v-for="(data, index) in props.data">
        <a :href="props.href ? '/Words/' + data.id : '#'">
            <div class="card mb-1">
                <p class="source">{{ data.source }}<i @click="$prounce(data.source_prounce)" class="fa-solid fa-volume-high"></i></p>
                <p class="target">{{ data.target }}</p>
                <p class="info">
                    <i :class="[ data.word_class ]" class="fa-solid fa-square"></i>
                    <span>{{ data.word_class }}</span>
                    <br />
                    <i class="fa-solid fa-square synonyms"></i>
                    <span>{{ $t('SynonymsProbability')}}: {{ $t(data.probability)}}</span>
                    <br />
                    <i class="fa-solid fa-square accuracy"></i>
                    <span>{{ $t('Accuracy') }}: </span>
                    <span v-if="$jwt">
                        {{ data.accuracy }}/{{ data.tested }}
                        {{ Math.round((data.accuracy / data.tested) * 100) }}%
                    </span>
                    <a v-else class="text-decoration-underline" href="/Login">{{ $t('LoginActive') }}</a>
                </p>
            </div>
            <div class="card mt-3" v-if="data.sentences">
                <p v-for="(item, index) in data.sentences">
                    <span>{{ item.source }}</span><br />
                    <span class="target">{{ item.target }}</span>
                </p>
            </div>
        </a> 
    </div>
</template>

<script setup>
const props = defineProps(['data', 'href'])
</script>

<style scoped lang="scss">
.card {
    padding: 25px;
    margin-bottom: 25px !important;
    border: solid 1px #eee;
    box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -webkit-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);

    .source {
        font-size: 22px;
        font-weight: bold;
        margin-bottom:  0;
    }

    .target {
        margin-bottom: 112px;
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
    }

    .fa-square {
        margin-right: 5px;
        font-size: 12px;
    }
    
    .synonyms { color: #f1e47e; }
    .accuracy { color: red; }
}
</style>