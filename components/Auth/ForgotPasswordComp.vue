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
				<button type="submit" class="btn btn-sm btn-danger submit">{{ $t('Submit') }}</button>
			</div>
        </form>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
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
		//1. api
		let api = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/reset_password', {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'Accept-Language' : 'zh-tw'
			},
			body : JSON.stringify({
				email: email.value
			})
		})

		let status = await api.status
		let response = await api.json()

		//2.
		spin.value = false
		info.value = response.message
		
	} catch (error) {
		console.log('Error: ' + error)
	}
}
</script>