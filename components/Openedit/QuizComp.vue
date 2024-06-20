<template>
    <form @submit.prevent="submitForm" id="openeditquiz" class="row g-3">
        <div class="col-md-12">
            <div v-for="(item, index) in data" :key="index">
                <label class="form-label mb-3" v-if="index == 0">正確答案</label>
                <label class="form-label" v-else-if="index == 1">錯誤選項</label>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text btn-primary">{{ $t('English') }}</span>
                    <input type="text" class="form-control" maxlength="100" :disabled="disabled" v-model="item[0]">
                    <span class="input-group-text btn-danger">{{ $t('Chinese') }}</span>
                    <input type="text" class="form-control" maxlength="100" :placeholder="$t('ChineseTranslate')" :disabled="disabled" v-model="item[1]">
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

const { t } = useI18n()
const { $backendapi } = useNuxtApp()
const props = defineProps(['data'])
const   disabled = ref(true),
	    spin = ref(false),
		info = ref('')

const submitForm = async (e) => {
    spin.value = true
	info.value = ''

    //5. api
    let api = await $backendapi(
        'PUT',
        '/api/openedit/quiz/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1],
        JSON.stringify(props.data)
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
#openeditquiz {
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