<template>
    <div class="login">  
		<!--sidebase
		<div class="row"> 
			<div class="col-md-12">
				<button v-if="loggedIn" @click="$event => signOut('github')">Logout</button>
				<div class="provider" v-else>
					<button class="btn" @click="$event => signIn('github')"><i class="fa-brands fa-github"></i></button>
					<button class="btn" @click="$event => signIn('github')"><i class="fa-brands fa-facebook"></i></button>
					<button class="btn" @click="$event => signIn('github')"><i class="fa-brands fa-google"></i></button>
					<button class="btn" @click="$event => signIn('github')"><i class="fa-brands fa-line"></i></button>
				</div>
			</div>
			<div class="col-md-12">
				<div class="line"></div>
			</div>
		</div>
		-->
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
				<label class="form-label">{{ $t('Password') }}</label>
				<input 
					type="password" 
					:class="['form-control', 'form-control-sm', {'is-invalid': passwordError, 'is-valid': !passwordError && submit}]" 
					v-model="password" 
					required
				>
				<div class="invalid-feedback" v-if="errors[1]">{{ errors[1].message }}</div>
			</div>
			<div class="col-md-12">
				<i v-if="spin" class="fa fa-refresh fa-spin"></i>
				<span class="info text-danger">{{ info }}</span>
				<span class="resend" v-if="resend" @click="ResendEmailConfirmation()"> - {{ t('Resend') }}</span>
			</div>
			<div class="col-md-12">
				<button type="submit" class="btn btn-primary w-100 p-2 submit">{{ $t('Submit')}}</button>
			</div>
			<div class="col-md-12 text-center">
				<a class="forgot-password" href="ForgotPassword">{{ $t('ForgotPassword') }}</a>
			</div>
        </form>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const	email = ref(''),
		password = ref(''),
		emailError = ref(false),
		passwordError = ref(false),
		errors = ref([]),
		submit = ref(false),
		spin = ref(false),
		info = ref(''),
		resend = ref(false)

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

	//2. password validate
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

	//3. submit btn been clicked
	submit.value = true 

	//4. Only trigger when validation success
	if ( !emailError.value && !passwordError.value ) {
		submitForm()
	}
}

const submitForm = async () => {
	spin.value = true
	info.value = ''

	try {
		//1. api
		let api = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/login', {
			method : 'POST',
			credentials: 'include',
			headers : {
				'Content-Type' : 'application/json',
				'Accept-Language' : 'zh-tw'
			},
			body : JSON.stringify({
				email: email.value,
				password: password.value
			})
		})

		let status = await api.status
		let response = await api.json()

		//2.
		spin.value = false

		//3. active
		if ( status == 403 ) { response.is_active = true }
		else { response.is_active = false }

		//4.
		if ( status !== 200 ) {
			info.value = response.message
			resend.value = response.is_active
		} else {
			//5. set cookie
			document.cookie = `first_name=${response.data.first_name}; path=/`
			document.cookie = `profile_pic=${response.data.profile_pic}; path=/`

			//6. page reload
			window.location.reload()
		}
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
			credentials: 'include',
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
.login {
	min-width: 300px;
	text-align: left;

	.form-control {
		background-color: transparent;
	}

	.forgot-password {
		color: #777;
		font-size: 12px;
	}

	.resend {
		cursor: pointer;
	}

	.provider {
		text-align: center;
		
		i {
			font-size: 24px;
			margin: 10px;
		}
	}

	.provider button:hover {
		box-shadow: none;
	}

	.provider button:focus {
		outline: none !important;
	}

	.line {
		position: relative;
		height: 1px;
		width: 100%;
		margin: 20px 0;
		background-color: #d4d4d4;
	}

	.line::before {
		content: 'Or';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFF;
		color: #8b8b8b;
		padding: 0 15px;
	}
}
</style>