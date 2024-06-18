<template>
    <form @submit.prevent="submitForm" id="openeditword" class="row g-3">
        <div class="col-md-4">
            <label class="form-label">*{{ $t('Word') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" required name="word" :value="data.word">
        </div>
        <div class="col-md-4">
            <label class="form-label">*{{ $t('Translation') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" required name="translation" :value="data.translation">
        </div>
        <div class="col-md-2">
            <label class="form-label">{{ $t('Phonetic') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" required name="phonetic" :value="data.phonetic">
        </div>
        <div class="col-md-2">
            <label class="form-label">*{{ $t('Pos') }}</label>
            <input class="form-control form-control-sm" list="pos" required name="pos" :value="data.pos">
            <datalist id="pos">
                <option v-for="value in pos_list" :value="value">{{ value }}</option>
            </datalist>
        </div>
        
        <div class="col-md-3" v-for="(item, index) in data.classification" :key="index">
            <label class="form-label" :class="{'opacity-0 d-none d-md-block' : index != 0 }">{{ $t('Classification') }}</label>         
            <input
                class="form-control form-control-sm"
                list="classification"
                :placeholder="$t('Classification') + (index + 1)"
                name="classification[]"
                :value="item"
            >
            <datalist id="classification">
                <option v-for="value in classification_list" :value="value">{{ value }}</option>
            </datalist>
        </div>
        <div class="col-md-12">
            <label class="form-label">
                {{ $t('Sentences') }} 
                <span class="sentences-info">({{ $t('EnglishSentenceInfo') }})</span>
            </label>
            <div v-for="(item, index) in data.sentences" :key="index">
                <input type="text" class="form-control form-control-sm mb-3" maxlength="200" :placeholder="$t('EnglishSentence')" name="sentences[]" :value="item.en">
            </div>
        </div>
        <div class="col-md-12">
				<i v-if="spin" class="fa fa-refresh fa-spin"></i>
				<span class="info text-danger">{{ info }}</span>
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

const { $backendapi } = useNuxtApp()
const { t } = useI18n()
const props = defineProps(['data'])
const   submit = ref(false),
	    spin = ref(false),
		info = ref('')

const submitForm = async (e) => {
	spin.value = true
	info.value = ''

    //1. form data
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    //2. classification & sentences
    if ( formData.has('classification[]') ) {
        data.classification = formData.getAll('classification[]')
        data.classification = data.classification.filter(Boolean)
        delete data['classification[]']
    }

    if ( formData.has('sentences[]') ) {
        data.sentences = formData.getAll('sentences[]')
        data.sentences = data.sentences.filter(Boolean)
        delete data['sentences[]']
    }

    //3. api
    let api = await $backendapi(
        'PUT',
        '/api/openedit/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1],
        JSON.stringify(data)
    )

	spin.value = false
    
	//4. error
	if ( api.error ) {
		const error = JSON.parse(api.error)
		
		//5. active
		if ( error.status == 403 ) { resend.value = true }
		else { resend.value = false }

		//6.
		if ( error.status !== 200 ) {
			info.value = error.message
		}

		return
	}

    let countdown = 4
    setInterval(() => {
        countdown--
        info.value = t('OpeneditUpdateSuccessfuly') + ' ' +countdown
        if ( countdown === 0 ) {
            window.location.href='/Word/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1]
        }
    }, 1000)
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