<template>
    <div class="reset-password">   
        <form @submit.prevent="validate" class="row g-3">
            <div class="col-md-12">
                <label class="form-label">{{ $t('Password') }}</label>
                <input
					type="password"
					:class="['form-control', 'form-control-sm', { 'is-invalid': passwordError, 'is-valid': !passwordError && submit }]"
					v-model="password"
					required
				>
                <div class="invalid-feedback" v-if="errors[0]">{{ errors[0].message }}</div>
            </div>
            <div class="col-md-12">
                <label class="form-label">{{ $t('RePassword') }}</label>
                <input
					type="password"
					:class="['form-control', 'form-control-sm', {'is-invalid': repasswordError, 'is-valid': !repasswordError && submit }]" 
					v-model="repassword"
					required
				>
                <div class="invalid-feedback" v-if="errors[1]">{{ errors[1].message }}</div>
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

const	password = ref(''),
		repassword = ref(''),
		passwordError = ref(false),
		repasswordError = ref(false),
		errors = ref([]),
		submit = ref(false),
		spin = ref(false),
		info = ref(''),
		token = useRoute().query.token
/*
onMounted( async () => {
	try {
		const response = await nuxtApp.ResetPassword('GET', {
			token: token
		})
	} catch (error) {
		console.log('Error: ' + error)
	}
})
*/

const validate = () => {
	errors.value = []

	//1. password validate
	var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
	if ( password.value.length < 8 || password.value.match(regex) == null ) {
		passwordError.value = true
		errors.value.push({
			'field': 'password',
			'message': t('ErrorInvalidatPassword')
		})
	} else {
		passwordError.value = false
		errors.value.push({'message': ''})
	}

	//2. repassword validate
	if ( repassword.value.length < 8 || repassword.value !== password.value ) {
		repasswordError.value = true
		if ( repassword.value.length < 8 ) {
			errors.value.push({
				'field': 'repassword',
				'message': t('ErrorInvalidatPassword')
			})
		} else {
			errors.value.push({
				'field': 'repassword',
				'message': t('ErrorInvalidatPasswordsMatch')
			})
		}
	} else {
		repasswordError.value = false
		errors.value.push({'message': ''})
	}

	//3. submit btn been clicked
	submit.value = true 

	//4. Only trigger when validation success
	if ( !passwordError.value && !repasswordError.value ) {
		submitForm()
	}
}

const submitForm = async () => {
	spin.value = true
	info.value = ''

	try {
		//1.
		let api = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/reset_password', {
			method : 'PUT',
			headers : {
				'Content-Type' : 'application/json',
				'Accept-Language' : 'zh-tw'
			},
			body : JSON.stringify({
				token: token,
				password: password.value,
			})
		})

		let status = await api.status
		let response = await api.json()
		
		//2.
		spin.value = false

		if ( status != 200 ) {
			info.value = response.message
		} else {
			window.localStorage.setItem('message', response.message)
			window.location.href = '/Info'
		}
		
	} catch (error) {
		console.log('Error: ' + error)
	}
}
</script>