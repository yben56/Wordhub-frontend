<template>
    <div class="class">
        <a :class="{ 'active': !$route.query.class }" class="btn btn-sm" href="/">{{ $t('All') }}</a>
        <a :class="{ 'active': $route.query.class == 'noun' }" class="btn btn-sm" href="?class=noun">{{ $t('Noun') }}</a>
        <a :class="{ 'active': $route.query.class == 'verb' }" class="btn btn-sm" href="?class=verb">{{ $t('Verb') }}</a>
        <a :class="{ 'active': $route.query.class == 'adj' }" class="btn btn-sm" href="?class=adj">{{ $t('Adj') }}</a>
    </div>
</template>

<style scoped lang="scss">
.class {
    padding: 5px 10px;
    margin: 0 -10px;
    margin-bottom: 10px;
    border-bottom: solid 1px #555;

    .btn {
        margin-right: 10px;
        color: #fff;
        border: solid 1px #555;
    }

    .active {
        color: #555 !important;
        background-color: #f1e47e;
    }
}
</style>