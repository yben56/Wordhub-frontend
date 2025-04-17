<template>
    <div class="col-lg-3" v-for="(data, index) in props.data">
        <div class="card mb-1">
            <p class="word">
                <span class="date float-end">{{ new Date(data.date).toLocaleString() }}</span>
                <a :href="'/word/' + data.word + '/' + data.id" target="_blank">{{ data.word }}</a>
                <i @click="$prounce(data.word, data.heteronyms)" class="fa-solid fa-volume-high"></i>
            </p>
            <p class="translation">{{ data.translation }}</p>
            <span v-if="data.pos" class="pos"><i class="fa-solid fa-book"></i> {{ data.pos }}</span>
            <button type="button" class="delete" @click="deleteword(index, data.id)"><i class="fa-solid fa-xmark"></i></button>
        </div>
    </div>
</template>

<script setup>
const { $backendapi } = useNuxtApp()
const props = defineProps(['data'])

let deleteword = async (index, wordid) => {
    props.data.splice(index, 1)
    let delete_history = await $backendapi('DELETE', 'api/history' + '?wordid=' + wordid)
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
        margin-bottom: 5px;

        .date {
            font-size: 10px;
            color: #6610f2;
        }

        a {
            font-size: 18px;
            font-weight: bold;
        } 
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
    
    .translation {
        color: #777;
        margin-bottom: 20px;
    }

    .fa-book {  margin-right: 5px; font-size: 12px; }

    .pos {
        color: darkred;
    }

    .delete {
        display:block;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        padding: 0 !important;
        background-color: #fff;
        border: solid 1px #eee;
        box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
        -webkit-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
        -moz-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
        position: absolute;
        top: -10px;
        right: -10px;
    }
}
</style>