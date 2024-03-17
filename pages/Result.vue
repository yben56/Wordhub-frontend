<template>
    <div id="container" class="container">
        <div class="row">
            <div class="col-md-9 searchs">
                <SearchComp />
            </div>
            <div class="col-md-3 d-none d-sm-block questions">
                <QuestionsComp />
            </div>
        </div>
    </div>
</template>

<style>
.searchs {
    margin-top: 15px;

    .card {
        margin-bottom: 15px !important;
    }
}

.questions {
    margin-top: 15px;
    
    .card {
        margin-bottom: 15px;
    }
}
</style>