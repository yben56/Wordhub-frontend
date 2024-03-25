<template>
    <div v-for="(data, index) in props.data">
        <a :href="props.href ? '/Words/' + data.id : '#'">
            <div class="card mb-1">
                <h1 class="source">{{ data.source }}<i @click="$prounce(data.source_prounce)" class="fa-solid fa-volume-high"></i></h1>
                <b class="target">{{ data.target }}<i @click="$prounce(data.target_prounce)" class="fa-solid fa-volume-high"></i></b>
                <p class="info">
                    <i :class="[ data.word_class ]" class="fa-solid fa-square"></i>
                    <span>{{ data.word_class }}</span>
                    <br />
                    <i class="fa-solid fa-square synonyms"></i>
                    <span>{{ $t('SynonymsProbability')}}: {{ $t(data.probability)}}</span>
                    <br />
                    <i class="fa-solid fa-square accuracy"></i>
                    <span>{{ $t('Accuracy') }}: </span>
                    <span v-if="$token">
                        {{ data.accuracy }}/{{ data.tested }}
                        {{ Math.round((data.accuracy / data.tested) * 100) }}%
                    </span>
                    <a v-else class="text-decoration-underline" href="/Login">{{ $t('LoginActive') }}</a>
                </p>
            </div>
            <div class="card mt-3" v-if="data.sentences" v-for="(item, index) in data.sentences">
                {{ item.source }}
                {{ item.target }}
            </div>
        </a> 
    </div>
</template>

<script setup>
const props = defineProps(['data', 'href'])
</script>

<style scoped lang="scss">
.card {
    background-color: #2d3134;
    color: #fff;
    padding: 10px 15px;
    border: solid 1px #3535;

    .source {
        font-family: "Barlow Condensed", sans-serif;
        font-weight: 200;
        font-style: normal;
        color: #fff;
        margin-bottom:  0;
    }

    .target {
        margin-bottom: 112px;
        color: #aaa;
    }
 
    .fa-volume-high {
        margin-left: 5px;
        font-size: 13px;
        vertical-align: middle;
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
}
</style>