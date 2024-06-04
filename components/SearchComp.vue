<template>
    <div class="col-lg-3" v-for="(data, index) in props.data">
        <div class="card mb-1">
            <p class="word">{{ data.word }}<i @click="$prounce(data.word_prounce)" class="fa-solid fa-volume-high"></i></p>
            <div v-for="(data, index) in data.result">
                <p class="translate">
                    <span class="pos text-danger">{{ $t(data.pos) }}: </span>
                    <a :href="'/Word/' + data.word + '/' + data.id">{{ data.translation }}</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['data'])
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
        margin-bottom:  10px;
    }

    .translate {
        color: #777;
        margin-top: 7px;
        margin-bottom: 0;
    }

    .translate a {
        color: #777;
        text-decoration: underline;
        text-underline-offset: 5px;
        text-decoration-color: rgba($color: #6610f2, $alpha: 0.2);
        color: #6610f2;
    }

    .translate a:hover {
        color: red;
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

    .fa-book {  margin-right: 5px; font-size: 12px; }
}

.highlight { border: solid 1px rgba(104, 18, 243, 0.2) !important; }
</style>