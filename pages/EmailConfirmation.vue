<template>
    <div class="card">
        <div class="card-header">Message:</div>
        <div class="card-body">
            <p class="card-text" v-if="message">{{ message }}_</p>
        </div>
    </div>
</template>

<script setup>
const query = useRoute().query
const { t } = useI18n()
const message = ref('')

if ( query.token ) {
    try {       
        //1. api
        let api = await useNuxtApp().$api('GET', useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/email_confirmation?token=' + query.token, {
            'Content-Type': 'application/json',
            'Accept-Language' : 'zh-tw'
        })
        let status = await api.status
        let response = await api.json()
        
        //2.
        message.value = response.message

	} catch (error) {
		console.log('Error: ' + error)
	}
} 
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