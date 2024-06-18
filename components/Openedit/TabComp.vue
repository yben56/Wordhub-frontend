<template>
    <div class="tab">
        <a :class="{ 'active': $route.name === 'Openedit-Word-slug' }" class="btn btn-sm" :href="'/openedit/word/' + $route.params.slug[0] + '/' + $route.params.slug[1]"><i class="fa-solid fa-pen-to-square"></i> {{ $t('EditWord') }}</a>
        <a :class="{ 'active': $route.name === 'Openedit-Quiz-slug' }" class="btn btn-sm" :href="'/openedit/quiz/' + $route.params.slug[0] + '/' + $route.params.slug[1]"><i class="fa-solid fa-pen-to-square"></i> {{ $t('EditQuiz') }}</a>
    </div>
    <hr>
</template>

<style lang="scss">
.tab {
    margin-top: 25px;
    
    a {
        margin-right : 10px;
    }

    .active {
        color: #fff;
        background-color: #6610f2;
    }
}
</style>