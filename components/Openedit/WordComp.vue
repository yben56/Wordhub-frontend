<template>
    <form @submit.prevent="validate" id="openeditword" class="row g-3">
        <div class="col-md-4">
            <label class="form-label">*{{ $t('Word') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" v-model="word" required>
        </div>
        <div class="col-md-4">
            <label class="form-label">*{{ $t('Translation') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" v-model="translation" required>
        </div>
        <div class="col-md-2">
            <label class="form-label">{{ $t('Phonetic') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" v-model="phonetic" required>
        </div>
        <div class="col-md-2">
            <label class="form-label">*{{ $t('Pos') }}</label>
            <input :class="['form-control', 'form-control-sm', { 'is-invalid': posError, 'is-valid': !posError && submit }]" list="pos" v-model="pos" required>
            <div class="invalid-feedback" v-if="errors[0]">{{ errors[0].message }}</div>
            <datalist id="pos">
                <option v-for="value in pos_list" :value="value">{{ value }}</option>
            </datalist>
        </div>
        <div class="col-md-3">
            <label class="form-label">{{ $t('Classification') }}</label>            
            <input :class="['form-control', 'form-control-sm', { 'is-invalid': classificatio1Error, 'is-valid': !classificatio1Error && submit }]" list="classification1" v-model="classification1" :placeholder="$t('Classification') + ' 1'">
            <div class="invalid-feedback" v-if="errors[1]">{{ errors[1].message }}</div>
            <datalist id="classification1">
                <option v-for="value in classification_list" :value="value">{{ value }}</option>
            </datalist>
        </div>
        <div class="col-md-3">
            <label class="form-label opacity-0 d-none d-md-block">{{ $t('Classification') }}2</label>
            <input class="form-control form-select-sm" list="classification2" v-model="classification2" :placeholder="$t('Classification') + ' 2'">
            <div class="invalid-feedback" v-if="errors[2]">{{ errors[2].message }}</div>
            <datalist id="classification2">
                <option v-for="value in classification_list" :value="value">{{ value }}</option>
            </datalist>
        </div>
        <div class="col-md-3">
            <label class="form-label opacity-0 d-none d-md-block">{{ $t('Classification') }}3</label>
            <input class="form-control form-select-sm" list="classification3" v-model="classification3" :placeholder="$t('Classification') + ' 3'">
            <div class="invalid-feedback" v-if="errors[3]">{{ errors[3].message }}</div>
            <datalist id="classification3">
                <option v-for="value in classification_list" :value="value">{{ value }}</option>
            </datalist>
        </div>
        <div class="col-md-12">
            <label class="form-label">
                {{ $t('Sentences') }} 
                <span class="sentences-info">({{ $t('EnglishSentenceInfo') }})</span>
            </label>
            <input type="text" class="form-control form-control-sm mb-3" maxlength="200" :placeholder="$t('EnglishSentence')" v-model="sentence1">
            <input type="text" class="form-control form-control-sm mb-3" maxlength="200" :placeholder="$t('EnglishSentence')" v-model="sentence2">
        </div>
        <div class="col-md-12">
            <button type="submit" class="btn btn-primary w-100 p-2 submit">{{ $t('Submit')}}</button>
        </div>
    </form>
</template>

<script setup>
import pos_list from '@/assets/json/pos.json'
import classification_list from '@/assets/json/classification.json'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const	word = ref(''),
        translation = ref(''),
        phonetic = ref(''),
        pos = ref(''),
        posError = ref(false),
        classification1 = ref(''),
        classification1Error = ref(false),
        classification2 = ref(''),
        classification3 = ref(''),
        sentence1 = ref(''),
        sentence2 = ref(''),
        errors = ref([])

const validate = () => {
	errors.value = []

	//1. pos validate
	if ( !pos_list.includes(pos.value) ) {
        posError.value = true
		errors.value.push({
			'message': t('ErrorInvalidatPos')
		})
	} else {
        posError.value = false
		errors.value.push({'message': ''})
	}

    //2. classification validate
	if ( !classification_list.includes(classification1.value) ) {
        classification1Error.value = true
		errors.value.push({
			'message': t('ErrorInvalidatClassification')
		})
	} else {
        classification1Error.value = false
		errors.value.push({'message': ''})
	}


    /*
	//3. submit btn been clicked
	submit.value = true 

	//4. Only trigger when validation success
	if ( !emailError.value && !passwordError.value ) {
		//submitForm()
	}
        */
}

const submitForm = async () => {
	spin.value = true
	info.value = ''

	//1.
	const api = await signIn('credentials', {
		redirect: false,
		email: email.value,
		password: password.value
	})

	spin.value = false

	//2. error
	if ( api.error ) {
		const error = JSON.parse(api.error)
		
		//3. active
		if ( error.status == 403 ) { resend.value = true }
		else { resend.value = false }

		//4.
		if ( error.status !== 200 ) {
			info.value = error.message
		}

		return
	}

	//5. success
	window.location.reload()
}
</script>

<style lang="scss" scoped>
#openeditword {
    .sentences-info {
        font-size: .875em;
        color: #dc3545;
    }

    .opacity-0 {
        opacity: 0;
    }
}
</style>