
import enUS from '@/assets/locale/en-US.json'
import zhTW from '@/assets/locale/zh-TW.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'zh-TW',
    messages: {
        'en-US': enUS,
        'zh-TW': zhTW,
    }
}))