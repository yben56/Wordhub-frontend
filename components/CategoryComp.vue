<template>
    <div class="category">
        <div class="container">
            <a :class="{ 'active': !$route.query.category }" class="btn btn-sm" href="/">{{ $t('All') }}</a>
            <a :class="{ 'active': $route.query.category == 'Individual' }" class="btn btn-sm" href="?category=Individual">{{ $t('Individual') }}</a>
            <a :class="{ 'active': $route.query.category == 'Spirit' }" class="btn btn-sm" href="?category=Spirit">{{ $t('Spirit') }}</a>
            <a :class="{ 'active': $route.query.category == 'Household' }" class="btn btn-sm" href="?category=Household">{{ $t('Household') }}</a>
            <a :class="{ 'active': $route.query.category == 'FoodAndDrink' }" class="btn btn-sm" href="?category=FoodAndDrink">{{ $t('FoodAndDrink') }}</a>
            <a :class="{ 'active': $route.query.category == 'Social' }" class="btn btn-sm" href="?category=Social">{{ $t('Social') }}</a>
            <a :class="{ 'active': $route.query.category == 'Medical' }" class="btn btn-sm" href="?category=Medical">{{ $t('Medical') }}</a>
            <a :class="{ 'active': $route.query.category == 'Traffic' }" class="btn btn-sm" href="?category=Traffic">{{ $t('Traffic') }}</a>
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