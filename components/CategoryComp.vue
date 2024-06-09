<template>
    <div class="category">
        <div class="container">
            <a :class="{ 'active': Object.keys($route.query).length === 0 }" class="btn btn-sm" href="/">{{ $t('All') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Individual' }" class="btn btn-sm" href="?classification=Individual">{{ $t('Individual') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Spirit' }" class="btn btn-sm" href="?classification=Spirit">{{ $t('Spirit') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Household' }" class="btn btn-sm" href="?classification=Household">{{ $t('Household') }}</a>
            <a :class="{ 'active': $route.query.classification == 'FoodAndDrink' }" class="btn btn-sm" href="?classification=FoodAndDrink">{{ $t('FoodAndDrink') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Social' }" class="btn btn-sm" href="?classification=Social">{{ $t('Social') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Medical' }" class="btn btn-sm" href="?classification=Medical">{{ $t('Medical') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Traffic' }" class="btn btn-sm" href="?classification=Traffic">{{ $t('Traffic') }}</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.category {
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