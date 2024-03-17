<template>
    <div class="type">
        <a :class="{ 'all': !$route.query.type }" class="btn btn-sm" href="/">{{ $t('All') }}</a>
        <a :class="{ 'noun': $route.query.type == 'noun' }" class="btn btn-sm" href="?type=noun">{{ $t('Noun') }}</a>
        <a :class="{ 'verb': $route.query.type == 'verb' }" class="btn btn-sm" href="?type=verb">{{ $t('Verb') }}</a>
        <a :class="{ 'adj': $route.query.type == 'adj' }" class="btn btn-sm" href="?type=adj">{{ $t('Adj') }}</a>
    </div>
</template>

<style scoped>
.type {
    padding: 5px 10px;
    margin: 0 -10px;
    margin-bottom: 10px;
    border-bottom: solid 1px #555;

    .btn {
        margin-right: 10px;
        color: #fff;
        border: solid 1px #555;
    }
}
</style>