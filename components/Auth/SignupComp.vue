<template>
    <div class="signup">   
        <form @submit.prevent="validate" class="row g-3">
            <div class="col-md-6">
                <label class="form-label">{{ $t('First_name') }}</label>
                <input 
					type="text" 
					:class="['form-control', 'form-control-sm', { 'is-invalid': first_nameError, 'is-valid': !first_nameError && submit }]"
					v-model="first_name" 
					required
				>
                <div class="invalid-feedback" v-if="errors[0]">{{ errors[0].message }}</div>
            </div>
            <div class="col-md-6">
                <label class="form-label">{{ $t('Last_name') }}</label>
                <input 
					type="text" 
					:class="['form-control', 'form-control-sm', { 'is-invalid': last_nameError, 'is-valid': !last_nameError && submit }]"
					v-model="last_name"
					required
				>
                <div class="invalid-feedback" v-if="errors[1]">{{ errors[1].message }}</div>
            </div>
            <div class="col-md-12">
                <label class="form-label">{{ $t('Email') }}</label>
                <input 
					type="text"
					:class="['form-control', 'form-control-sm', {'is-invalid': emailError, 'is-valid': !emailError && submit }]" 
					v-model="email"
					required
				>
                <div class="invalid-feedback" v-if="errors[2]">{{ errors[2].message }}</div>
            </div>
            <div class="col-md-12">
                <label class="form-label">{{ $t('Password') }}</label>
                <input
					type="password"
					:class="['form-control', 'form-control-sm', { 'is-invalid': passwordError, 'is-valid': !passwordError && submit }]"
					v-model="password"
					required
				>
                <div class="invalid-feedback" v-if="errors[3]">{{ errors[3].message }}</div>
            </div>
            <div class="col-md-12">
                <label class="form-label">{{ $t('RePassword') }}</label>
                <input
					type="password"
					:class="['form-control', 'form-control-sm', {'is-invalid': repasswordError, 'is-valid': !repasswordError && submit }]" 
					v-model="repassword"
					required
				>
                <div class="invalid-feedback" v-if="errors[4]">{{ errors[4].message }}</div>
            </div>
			<div class="col-md-12">
				<VueDatePicker
					:enable-time-picker="false"
					:max-date="new Date()"
					:button="false"
					:placeholder="$t('Birthday')" 
					class="birthday mt-3"
					format="yyyy-MM-dd"
					navigation="['year', 'month']"
					required
					v-model="birthday" 
					year-first
				/>
			</div>
			<div class="col-md-12">
				<div class="form-check form-check-inline">
					<label class="form-check-label">
						<input class="form-check-input" name="gender" type="radio" value="1" v-model="gender" required />
						{{ $t('Male') }}</label>
					</div>
				<div class="form-check form-check-inline">
					<label class="form-check-label">
						<input class="form-check-input" name="gender" type="radio" value="0" v-model="gender" required />
						{{ $t('Female') }}
					</label>
				</div>
			</div>
			<div class="col-md-12">
				<label class="form-check-label term-privacy">
					<input class="form-check-input" type="checkbox" required />
					<a href="/TermsPrivacy">{{ $t('TermsPrivacy') }}</a>
				</label>
			</div>
            <div class="col-md-12">
				<i v-if="spin" class="fa fa-refresh fa-spin"></i>
				<span class="info text-danger">{{ info }}</span>
				<span class="resend" v-if="resend" @click="ResendEmailConfirmation()"> - {{ t('Resend') }}</span>
			</div>
			<div class="col-md-12">
				<button type="submit" class="btn w-100 p-2 btn-danger submit">{{ $t('Submit') }}</button>
			</div>
        </form>
    </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const	first_name = ref(''),
		last_name = ref(''),
		email = ref(''),
		password = ref(''),
		repassword = ref(''),
		first_nameError = ref(''),
		last_nameError = ref(''),
		emailError = ref(false),
		passwordError = ref(false),
		repasswordError = ref(false),
		birthday = ref(''),
		gender = ref(''),
		errors = ref([]),
		submit = ref(false),
		spin = ref(false),
		info = ref(''),
		resend = ref(false)

const validate = () => {
	errors.value = []

	//1. first_name validate
	if ( first_name.value.length < 1 ) {
		first_nameError.value = true
		errors.value.push({
			'message': t('ErrorInvalidatfirst_name')
		})
	} else {
		first_nameError.value = false
		errors.value.push({'message': ''})
	}

	//2. last_name validate
	if ( last_name.value.length < 1 ) {
		last_nameError.value = true
		errors.value.push({
			'message': t('ErrorInvalidatlast_name')
		})
	} else {
		last_nameError.value = false
		errors.value.push({'message': ''})
	}

	//3. email validate
	if ( email.value.length < 10 || email.value.search('@') == -1 ) {
		emailError.value = true
		errors.value.push({
			'message': t('ErrorInvalidatEmail')
		})
	} else {
		emailError.value = false
		errors.value.push({'message': ''})
	}
	
	//4. password validate
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

	//5. repassword validate
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

	//6. submit btn been clicked
	submit.value = true 

	//7. Only trigger when validation success
	if ( !first_nameError.value && !last_nameError.value && !emailError.value && !passwordError.value && !repasswordError.value ) {
		submitForm()
	}
}

const submitForm = async () => {
	spin.value = true
	info.value = ''

	try {
		 //1. api
		let api = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/signup', {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'Accept-Language' : 'zh-tw'
			},
			body : JSON.stringify({
				first_name: first_name.value,
				last_name: last_name.value,
				email: email.value,
				password: password.value,
				birthday: birthday.value.toISOString().split('T')[0],
				gender: gender.value
			})
		})

		let status = await api.status
		let response = await api.json()

		//2.
		spin.value = false

		//3.
		if ( status == 403 ) { resend.value = true } else { resend.value = false }

		//4. check state
		if ( status !== 200 ) { return info.value = response.message }
		
		//5.
		window.localStorage.setItem('message', response.message)
		window.location.href = '/Info'

	} catch (error) {
		console.log('Error: ' + error)
	}
}

const ResendEmailConfirmation = async () => {
	spin.value = true
	info.value = ''
	resend.value = false

	try {
		//1.
		let api = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/email_confirmation', {
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

		//3.
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

<style scoped lang="scss">
.signup {
	min-width: 300px;
	text-align: left;

	.form-control {
		background-color: transparent;
	}

	.form-check-input {
		margin-top: 5px;
		margin-right: 10px;
	}

	.birthday {
		border-radius: 5px;
	}

	.term-privacy {
		.form-check-input {
			margin-top: 0;
		}

		a {
			color: #777;
			font-size: 12px;
			text-decoration: underline;
		}
	}

	.resend {
		cursor: pointer;
	}
}
</style>