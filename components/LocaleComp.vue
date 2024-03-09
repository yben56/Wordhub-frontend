<template>
    <div class="form-group">
        <select class="form-control form-select-sm" v-model="selectedLocale" @change="SwitchLocale">
            <option value="" disabled>{{ $t('Lang') }}</option>
            <option value="en-US">{{ $t('en-US') }}</option>
            <option value="zh-TW">{{ $t('zh-TW') }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedLocale: this.$i18n.locale
        }
    },
    methods: {
        SwitchLocale() {
            this.$i18n.locale = this.selectedLocale
            document.cookie = "i18n_redirected=" + this.selectedLocale;
        }
    }
}
</script>

<style scoped lang="scss">
select {
    max-width: 100px;
}
</style>