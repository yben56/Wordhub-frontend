<template>
    <div class="forgot-password">   
        <form @submit.prevent="validate" class="row g-3">
			<div class="col-md-12">
				<label class="form-label">{{ $t('Email') }}</label>
				<input 
					type="text"
					:class="['form-control', 'form-control-sm', {'is-invalid': emailError, 'is-valid': !emailError && submit}]" 
					v-model="email" 
					required
				>
				<div class="invalid-feedback" v-if="errors[0]">{{ errors[0].message }}</div>
			</div>
			<div class="col-md-12">
				<i v-if="spin" class="fa fa-refresh fa-spin"></i>
				<span class="info">{{ info }}</span>
				<button type="submit" class="btn btn-sm btn-danger submit">{{ $t('Submit')}}</button>
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
		spin = ref(false),
		info = ref('')

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
	spin.value = true
	info.value = ''

	try {
		const response = await nuxtApp.ForgotPassword({
			email: email.value
		})

		spin.value = false
		info.value = t(response)
		
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