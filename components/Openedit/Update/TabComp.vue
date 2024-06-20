<template>
    <div class="tab">
        <a :class="{ 'active': $route.name === 'Openedit-update-Word-slug' }" class="btn btn-sm" :href="'/openedit/update/word/' + $route.params.slug[0] + '/' + $route.params.slug[1]">
            {{ $t('EditWord') }}
        </a>
        <a :class="{ 'active': $route.name === 'Openedit-update-Quiz-slug' }" class="btn btn-sm" :href="'/openedit/update/quiz/' + $route.params.slug[0] + '/' + $route.params.slug[1]">
            {{ $t('EditQuiz') }}
        </a>
    </div>
    <hr>
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