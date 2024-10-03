<template>
    <form @submit.prevent="submitForm" id="openeditword" class="row g-3">
        <div class="col-md-4">
            <label class="form-label">*{{ $t('Word') }}</label>
            <input
                type="text"
                class="form-control form-control-sm word"
                maxlength="50"
                :readonly="props.method == 'PUT'"
                :disabled="disabled"
                v-model="data.word"
                required
            >
        </div>
        <div class="col-md-4">
            <label class="form-label">*{{ $t('Translation') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" required :disabled="disabled" v-model="data.translation">
        </div>
        <div class="col-md-2">
            <label class="form-label">{{ $t('Phonetic') }}</label>
            <input type="text" class="form-control form-control-sm" maxlength="50" :disabled="disabled" v-model="data.phonetic">
        </div>
        <div class="col-md-2">
            <label class="form-label">*{{ $t('Pos') }}</label>
            <select class="form-control form-control-sm" required :disabled="disabled" v-model="data.pos">
                <option v-for="value in pos_list" :value="value">{{ value }}</option>
            </select>
        </div>

        <div class="col-md-12">
            <label class="form-label">{{ $t('Classification') }} <i class="fa-solid fa-angle-down"></i></label>
            <div class="classification-area pb-2" :class="{ 'disabled-span' : !disabled }">
                <span class="badge bg-success me-2 p-2" v-for="item in data.classification">{{ $t(item) }}</span>
            </div>
            <div :class="{ 'disabled-span' : disabled }">
                <div class="form-check mb-3 classification" v-for="(item, index) in classification_list">
                    <span class="text-secondary">{{ index }} :</span>
                    <div class="form-check form-check-inline" v-for="(k, i) in item">
                        <div>
                            <input class="form-check-input mt-1" type="checkbox" :value="i" v-model="data.classification">
                            <label class="form-check-label">{{ k }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-md-12">
            <label class="form-label">{{ $t('Sentences') }}</label>
            <div class="sentence mb-4" v-for="(item, index) in data.sentences" :key="index">
                <div class="input-group input-group-sm" :class="{ 'd-none' : !item && disabled }">
                    <span class="input-group-text btn-primary" :class="{ 'disabled-span' : disabled }">{{ $t('English') }}</span>
                    <input 
                        type="text" maxlength="200" class="form-control" :class="{ 'disabled-input' : disabled }" 
                        :placeholder="$t('EnglishSentence...')" :disabled="disabled" v-model="item['en']"
                    >
                    <span class="input-group-text btn-danger" :class="{ 'disabled-span' : disabled }">{{ $t('Chinese') }}</span>
                    <input 
                        type="text" maxlength="200" class="form-control" :class="{ 'disabled-input' : disabled }"
                        :placeholder="$t('ChineseTranslate...')" :disabled="disabled" v-model="item['zh']"
                    >
                </div>
            </div>
            <b class="btn text-danger" :class="{ 'disabled-btn' : disabled }" @click="addSentence" v-if="addmore">+{{ $t('AddMore') }}</b>
        </div>
        <div class="col-md-12">
				<i v-if="spin" class="fa fa-refresh fa-spin"></i>
				<span class="info text-danger">{{ info }}</span>
			</div>
        <div class="col-md-12">
            <button type="button" class="btn btn-danger w-100 p-2" v-if="disabled" @click="disabled=false">
                <span v-if="$route.params.slug.length == 2">{{ $t('EditWord')}}</span>
                <span v-else>{{ $t('AddWord')}}</span>
            </button>
            <button type="submit" class="btn btn-primary w-100 p-2 submit" v-else>{{ $t('Submit')}}</button>
        </div>
    </form>
</template>

<script setup>
const { t } = useI18n()
const { $backendapi } = useNuxtApp()
const pos_list = await $backendapi('GET', '/api/dictionarylist/pos')
const classification_list = await $backendapi('GET', '/api/dictionarylist/classification')

const props = defineProps(['data', 'method'])
const disabled = ref(true)
const spin = ref(false)
const info = ref('')

const submitForm = async (e) => {
	spin.value = true
	info.value = ''

    //1.
    const postdata = {}
    postdata.word = props.data.word
    postdata.translation = props.data.translation
    postdata.phonetic = props.data.phonetic
    postdata.pos = props.data.pos
    postdata.classification = props.data.classification
    postdata.sentences = props.data.sentences

    //2. classification
    postdata.classification = postdata.classification.filter(Boolean)

    //3. sentences
    postdata.sentences = postdata.sentences.filter(item => item.en !== '' || item.zh !== '')

    console.log(postdata)
    

    //*
    //4. url
    let url = ''
    if ( props.method == 'POST') {
        url = 'api/openedit/word'
    } else {
        url = 'api/openedit/word/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1]
    }

    //5. api
    let api = await $backendapi(props.method, url, JSON.stringify(postdata))

    spin.value = false

	if ( api.error ) {
        //6. error
		info.value = api.message
	} else {
        //7. success, output message

        if ( props.method == 'POST') {
            info.value = t('OpeneditAddSuccessfuly')

            //redirect
            window.location.href = decodeURIComponent('/Word/' + api.data.word + '/' + api.data.wordid)
        } else {
            info.value = t('OpeneditUpdateSuccessfuly')
        }
    }

    disabled.value = true
    //*/
}

const addmore = ref(true)
const addSentence = () => {
    if ( props.data.sentences.length < 11) {
        props.data.sentences.push({'en':'','zh':''})
    }

    if ( props.data.sentences.length == 10 ) { addmore.value = false }
}
</script>

<style lang="scss" scoped>
#openeditword {
    .word {
        background-color: transparent;
        color: #6610f2;
    }

    .classification {
        .text-secondary {
            margin-right: 15px;
        }
    }

    input:disabled, select:disabled, .classification-area  {
        background-color: transparent;
        border-radius: 0;
        border: none;
        border-bottom: solid 1px #ccc ;
    }

    .opacity-0 {
        opacity: 0;
    }

    .disabled-span, .disabled-btn, .disabled-badge {
        display: none;
    }

    .disabled-input {
        margin-left: 10px
    }
}
</style>