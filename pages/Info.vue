<template>
    <div class="card">
        <div class="card-header">Message:</div>
        <div class="card-body">
            <p class="card-text">{{ message }}_</p>
        </div>
    </div>
</template>

<script setup>
const message = ref('')

onMounted( async () => {
    message.value = window.localStorage.getItem('message')
})
</script>

<style scoped lang="scss">
.card {
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 400px;
    max-width: 500px;
    box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -webkit-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);

    .card-header {
        background-color: #f4f4f4;
    }

    .card-body {
        padding-top: 20px;
        padding-bottom: 20px;
        color: purple;
    }
}
</style>