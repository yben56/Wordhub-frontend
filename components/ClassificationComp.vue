<template>
    <div class="classification">
        <div class="container">
            <a :class="{ 'active': Object.keys($route.query).length === 0 }" class="btn btn-sm" href="/">{{ $t('All') }}</a>
            <a :class="{ 'active': $route.query.classification == 'food' }" class="btn btn-sm" href="?classification=food">{{ $t('food') }}</a>
            <a :class="{ 'active': $route.query.classification == 'beverage' }" class="btn btn-sm" href="?classification=beverage">{{ $t('beverage') }}</a>
            <a :class="{ 'active': $route.query.classification == 'social' }" class="btn btn-sm" href="?classification=social">{{ $t('social') }}</a>
            <a :class="{ 'active': $route.query.classification == 'emotional' }" class="btn btn-sm" href="?classification=emotional">{{ $t('emotional') }}</a>
            <a :class="{ 'active': $route.query.classification == 'numerical' }" class="btn btn-sm" href="?classification=numerical">{{ $t('numerical') }}</a>
            <a :class="{ 'active': $route.query.classification == 'datetime' }" class="btn btn-sm" href="?classification=datetime">{{ $t('datetime') }}</a>
            <a :class="{ 'active': $route.query.classification == 'traffic' }" class="btn btn-sm" href="?classification=traffic">{{ $t('traffic') }}</a>
            <a :class="{ 'active': $route.query.classification == 'politics' }" class="btn btn-sm" href="?classification=politics">{{ $t('politics') }}</a>
            <a :class="{ 'active': $route.query.classification == 'medical' }" class="btn btn-sm" href="?classification=medical">{{ $t('medical') }}</a>
            <a :class="{ 'active': $route.query.classification == 'sports' }" class="btn btn-sm" href="?classification=sports">{{ $t('sports') }}</a>
            <a :class="{ 'active': $route.query.classification == 'travel' }" class="btn btn-sm" href="?classification=travel">{{ $t('travel') }}</a>
            <a :class="{ 'active': $route.query.classification == 'weather' }" class="btn btn-sm" href="?classification=weather">{{ $t('weather') }}</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.classification {
    padding: 15px 10px;
    margin: 10px -10px;

    .btn {
        margin-right: 10px;
    }

    .active {
        color: #fff;
        background-color: #6610f2;
    }
}
</style>