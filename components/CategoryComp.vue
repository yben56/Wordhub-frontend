<template>
    <div class="category">
        <div class="container">
            <a :class="{ 'active': $route.hash == '#' || $route.hash == '' }" class="btn btn-sm" href="#">{{ $t('All') }}</a>
            <a :class="{ 'active': $route.hash == '#Individual' }" class="btn btn-sm" href="#Individual">{{ $t('Individual') }}</a>
            <a :class="{ 'active': $route.hash == '#Spirit' }" class="btn btn-sm" href="#Spirit">{{ $t('Spirit') }}</a>
            <a :class="{ 'active': $route.hash == '#Household' }" class="btn btn-sm" href="#Household">{{ $t('Household') }}</a>
            <a :class="{ 'active': $route.hash == '#FoodAndDrink' }" class="btn btn-sm" href="#FoodAndDrink">{{ $t('FoodAndDrink') }}</a>
            <a :class="{ 'active': $route.hash == '#Social' }" class="btn btn-sm" href="#Social">{{ $t('Social') }}</a>
            <a :class="{ 'active': $route.hash == '#Medical' }" class="btn btn-sm" href="#Medical">{{ $t('Medical') }}</a>
            <a :class="{ 'active': $route.hash == '#Traffic' }" class="btn btn-sm" href="#Traffic">{{ $t('Traffic') }}</a>
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