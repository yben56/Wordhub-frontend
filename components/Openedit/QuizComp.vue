<template>
    <form @submit.prevent="submitForm" id="openeditquiz" class="row g-3">
        <div class="col-md-12">
            <label class="form-label">正確答案</label>
            <div class="input-group input-group-sm">
                <span class="input-group-text btn-primary">{{ $t('English') }}</span>
                <input type="text" class="form-control" maxlength="200" :value="$route.params.slug[0]" disabled>
                <span class="input-group-text btn-danger">{{ $t('Chinese') }}</span>
                <input type="text" class="form-control" maxlength="200" :placeholder="$t('ChineseTranslate')">
            </div>
            <br>
            <label class="form-label">錯誤選項</label>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text btn-primary">{{ $t('English') }}</span>
                <input type="text" class="form-control" maxlength="200">
                <span class="input-group-text btn-danger">{{ $t('Chinese') }}</span>
                <input type="text" class="form-control" maxlength="200" :placeholder="$t('ChineseTranslate')">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text btn-primary">{{ $t('English') }}</span>
                <input type="text" class="form-control" maxlength="200" :value="$route.params.slug[0]">
                <span class="input-group-text btn-danger">{{ $t('Chinese') }}</span>
                <input type="text" class="form-control" maxlength="200" :placeholder="$t('ChineseTranslate')">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text btn-primary">{{ $t('English') }}</span>
                <input type="text" class="form-control" maxlength="200" :value="$route.params.slug[0]">
                <span class="input-group-text btn-danger">{{ $t('Chinese') }}</span>
                <input type="text" class="form-control" maxlength="200" :placeholder="$t('ChineseTranslate')">
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