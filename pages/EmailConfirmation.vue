<template>
    <div class="container">
        <div class="col-sm-6 offset-sm-3">
            <div id="email_confirmation" class="alert alert-warning text-center" role="alert">
                <b v-if="info">{{ info }}</b>
                <b v-else>{{ $t('EmailConfirmation') }}</b>
            </div>
        </div>
    </div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const query = useRoute().query
const { t } = useI18n()
const info = ref('')

if ( query.token ) {
    try {
		const response = await nuxtApp.EmailConfirmation(query.token)

        info.value = t(response)
	} catch (error) {
		console.log('Error: ' + error)
	}
} 
</script>

<style scoped>
#email_confirmation {
    margin: 250px 0;
}
</style>