<template>
    <form @submit.prevent="submitForm" id="openeditword" class="row g-3">
        <div class="col-md-4">
            <label class="form-label">{{ $t('Word') }}</label>
            <input type="text" class="form-control form-control-sm word" maxlength="50" readonly :disabled="disabled" required name="word" :value="data.word">
        </div>
        <div class="col-md-4">
            <label class="form-label">*{{ $t('Translation') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" required :disabled="disabled" name="translation" :value="data.translation">
        </div>
        <div class="col-md-2">
            <label class="form-label">{{ $t('Phonetic') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" required :disabled="disabled" name="phonetic" :value="data.phonetic">
        </div>
        <div class="col-md-2">
            <label class="form-label">*{{ $t('Pos') }}</label>
            <select class="form-control form-control-sm" required :disabled="disabled" name="pos" :value="data.pos">
                <option v-for="value in pos_list" :value="value">{{ value }}</option>
            </select>
        </div>
        
        <div class="col-md-3" v-for="(item, index) in data.classification" :key="index">
            <label class="form-label" :class="{'opacity-0 d-none d-md-block' : index != 0 }">{{ $t('Classification') }}</label>         
            <select
                class="form-control form-control-sm"
                :disabled="disabled"
                name="classification[]"
                :value="item"
            >
                <option value="" disabled>{{ $t('Classification') }} {{ index+1 }}</option>
                <option v-for="(item, index) in classification_list" :value="index">{{ item }}</option>
            </select>
        </div>
        <div class="col-md-12">
            <label class="form-label">
                {{ $t('Sentences') }} 
                <span class="sentences-info">({{ $t('EnglishSentenceInfo') }})</span>
            </label>
            <div class="sentence mb-4" v-for="(item, index) in data.sentences" :key="index">
                <div class="input-group input-group-sm" :class="{ 'd-none' : !item && disabled }">
                    <span class="input-group-text btn-primary">{{ $t('English') }}</span>
                    <input type="text" class="form-control" maxlength="200" :placeholder="$t('EnglishSentence')" :disabled="disabled" :name="'sentences['+index+'][en]'" :value="item.en">
                    <span class="input-group-text btn-danger">{{ $t('Chinese') }}</span>
                    <input type="text" class="form-control" maxlength="200" :placeholder="$t('ChineseTranslate')" :disabled="disabled" :name="'sentences['+index+'][zh]'" :value="item.zh">
                </div>
            </div>
        </div>
        <div class="col-md-12">
				<i v-if="spin" class="fa fa-refresh fa-spin"></i>
				<span class="info text-danger">{{ info }}</span>
			</div>
        <div class="col-md-12">
            <button type="button" class="btn btn-danger w-100 p-2" v-if="disabled" @click="disabled=false">{{ $t('EditWord')}}</button>
            <button type="submit" class="btn btn-primary w-100 p-2 submit" v-else>{{ $t('Submit')}}</button>
        </div>
    </form>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { friendlyJSONstringify } from '~/node_modules/@intlify/shared/dist/shared'

const { $backendapi } = useNuxtApp()
const pos_list = await $backendapi('GET', '/api/dictionarylist/pos')
const classification_list = await $backendapi('GET', '/api/dictionarylist/classification')
const { t } = useI18n()
const props = defineProps(['data'])
const   disabled = ref(true),
	    spin = ref(false),
		info = ref('')

const submitForm = async (e) => {
	spin.value = true
	info.value = ''
    
    //1. form data
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    //2. classification
    if ( formData.has('classification[]') ) {
        data.classification = formData.getAll('classification[]')
        data.classification = data.classification.filter(Boolean)
        delete data['classification[]']
    }

    //3. sentences
    const sentences = [];
    for  (const [key, value] of Object.entries(data) ) {
        const match = key.match(/sentences\[(\d+)\]\[(en|zh)\]/)

        if ( match ) {
            const index = parseInt(match[1], 10)
            const lang = match[2]

            if ( !sentences[index] ) {  sentences[index] = {} }
            sentences[index][lang] = value
        }
    }

    data['sentences'] = sentences.filter(sentence => sentence.en && sentence.zh)

    //4. post data
    const post_data = {
        'translation' : data['translation'],
        'phonetic' : data['phonetic'],
        'pos' : data['pos'],
        'classification' : data['classification'],
        'sentences' : data['sentences']
    }

    //5. api
    let api = await $backendapi(
        'PUT',
        '/api/openedit/word/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1],
        JSON.stringify(post_data)
    )

	spin.value = false
    
	//6. error
	if ( api.error ) {
		const error = JSON.parse(api.error)
		
		//7. active
		if ( error.status == 403 ) { resend.value = true }
		else { resend.value = false }

		//8.
		if ( error.status !== 200 ) {
			info.value = error.message
		}

		return
	}
    
    info.value = t('OpeneditUpdateSuccessfuly')
    disabled.value = true

    window.location.reload()
    
}
</script>

<style lang="scss" scoped>
#openeditword {
    .sentences-info {
        font-size: .875em;
        color: #dc3545;
    }

    .word {
        background-color: transparent;
        color: #6610f2;
        cursor: not-allowed;
    }

    input:disabled, select:disabled  {
        background-color: transparent;
        border-radius: 0;
        border: none;
        border-bottom: solid 1px #ccc ;
    }

    .opacity-0 {
        opacity: 0;
    }
}
</style>