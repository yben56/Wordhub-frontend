<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 offset-lg-4">
                <div class="card mt-5">
                    <div class="card-header">{{ $t('ForgotPassword') }}:</div>
                    <div class="card-body">
                        <AuthForgotPasswordComp />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 400px;
    max-width: 500px;
    box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -webkit-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);

    .card-header {
        background-color: #f4f4f4;
    }

    .card-body {
        padding-top: 20px;
        padding-bottom: 20px;
        color: purple;
    }
}
</style>