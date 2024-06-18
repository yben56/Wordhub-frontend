<template>
    <div class="classification">
        <div class="container">
            <a :class="{ 'active': Object.keys($route.query).length === 0 }" class="btn btn-sm" href="/">{{ $t('All') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Food' }" class="btn btn-sm" href="?classification=Food">{{ $t('Food') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Beverage' }" class="btn btn-sm" href="?classification=Beverage">{{ $t('Beverage') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Social' }" class="btn btn-sm" href="?classification=Social">{{ $t('Social') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Emotional' }" class="btn btn-sm" href="?classification=Emotional">{{ $t('Emotional') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Work' }" class="btn btn-sm" href="?classification=Work">{{ $t('Work') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Datetime' }" class="btn btn-sm" href="?classification=Datetime">{{ $t('Datetime') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Traffic' }" class="btn btn-sm" href="?classification=Traffic">{{ $t('Traffic') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Politics' }" class="btn btn-sm" href="?classification=Politics">{{ $t('Politics') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Business' }" class="btn btn-sm" href="?classification=Business">{{ $t('Business') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Technology' }" class="btn btn-sm" href="?classification=Technology">{{ $t('Technology') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Medical' }" class="btn btn-sm" href="?classification=Medical">{{ $t('Medical') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Entertainment' }" class="btn btn-sm" href="?classification=Entertainment">{{ $t('Entertainment') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Sports' }" class="btn btn-sm" href="?classification=Sports">{{ $t('Sports') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Travel' }" class="btn btn-sm" href="?classification=Travel">{{ $t('Travel') }}</a>
            <a :class="{ 'active': $route.query.classification == 'Weather' }" class="btn btn-sm" href="?classification=Weather">{{ $t('Weather') }}</a>
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