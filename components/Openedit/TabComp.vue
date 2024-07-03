<template>
    <div class="tab">
        <div v-if="$route.params.slug !== undefined">
            <a :class="{ 'active': $route.name === 'Openedit-Word-slug' }" class="btn btn-sm" :href="'/openedit/word/' + $route.params.slug[0] + '/' + $route.params.slug[1]">
                {{ $t('EditWord') }}
            </a>
            <a :class="{ 'active': $route.name === 'Openedit-Quiz-slug' }" class="btn btn-sm" :href="'/openedit/quiz/' + $route.params.slug[0] + '/' + $route.params.slug[1]">
                {{ $t('EditQuiz') }}
            </a>
        </div>
        <div v-else>
            <a class="active btn btn-sm">{{ $t('EditWord') }}</a>
        </div>
    </div>
    <hr class="mt-3">
</template>

<style lang="scss">
.tab {   
    a {
        margin-right : 10px;
    }

    .active {
        color: #fff;
        background-color: #6610f2;
    }
}
</style>