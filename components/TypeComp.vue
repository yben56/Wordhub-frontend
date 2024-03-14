<template>
    <div class="type">
        <a :class="{ 'btn-dark': !$route.query.type }" class="btn btn-sm" href="/">{{ $t('All') }}</a>
        <a :class="{ 'noun': $route.query.type == 'noun' }" class="btn btn-sm" href="?type=noun">{{ $t('Noun') }}</a>
        <a :class="{ 'verb': $route.query.type == 'verb' }" class="btn btn-sm" href="?type=verb">{{ $t('Verb') }}</a>
        <a :class="{ 'adj': $route.query.type == 'adj' }" class="btn btn-sm" href="?type=adj">{{ $t('Adj') }}</a>
    </div>
</template>

<style scoped>
.type {
    padding-bottom: 20px;
    padding-left: 0px;

    .btn {
        margin-right: 10px;
    }
}
</style>