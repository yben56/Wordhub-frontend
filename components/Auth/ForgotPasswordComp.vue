<template>
    <div class="forgot-password">   
        <form @submit.prevent="validate" class="row g-3">
			<div class="col-md-12" v-if="!resetPasswordLink">
				<label class="form-label">{{ $t('Email') }}</label>
				<input 
					type="text"
					:class="['form-control', 'form-control-sm', {'is-invalid': emailError, 'is-valid': !emailError && submit}]" 
					v-model="email" 
					required
				>
				<div class="invalid-feedback" v-if="errors[0]">{{ errors[0].message }}</div>
			</div>
			<div class="col-md-12" v-if="!resetPasswordLink">
				<span class="info">{{ info }}</span>
				<button type="submit" class="btn btn-sm btn-danger submit">{{ $t('Submit')}}</button>
			</div>
			<div class="col-md-12" v-if="resetPasswordLink">
				<div class="alert alert-warning" role="alert">{{ resetPasswordLink }}</div>
			</div>
        </form>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const nuxtApp = useNuxtApp()
const { t } = useI18n()

const	email = ref(''),
		emailError = ref(false),
		errors = ref([]),
		submit = ref(false),
		info = ref(''),
		resetPasswordLink = ref('')

const validate = () => {
	errors.value = []

	//1. email validate
	if ( email.value.length < 10 || email.value.search('@') == -1 ) {
		emailError.value = true
		errors.value.push({
			'message': t('ErrorInvalidatEmail')
		})
	} else {
		emailError.value = false
		errors.value.push({'message': ''})
	}

	//2. submit btn been clicked
	submit.value = true 

	//3. Only trigger when validation success
	if ( !emailError.value ) {
		submitForm()
	}
}

const submitForm = async () => {
	try {
		const response = await nuxtApp.ForgotPassword({
			email: email.value
		})

		if ( response.state == 200 ) {
			resetPasswordLink.value = t('ResetPasswordLink')
		} else {
			info.value = t(response.message)
		}
	} catch (error) {
		console.log('Error: ' + error)
	}
}
</script>

<style scoped lang="scss">
.forgot-password {
	min-width: 300px;
	text-align: left;

	.form-control {
		background-color: transparent;
		border-color: #555;
		color: #fff;
	}

	.forgot-password {
		color: #ccc;
	}

	.invalid-feedback, .info {
		color: #f1e47e;
	}
}
</style>