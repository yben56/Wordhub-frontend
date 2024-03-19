<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 offset-lg-4">
                <div class="card mt-5">
                    <h5 class="card-title p-3">
                        {{ $t('Login') }}
                    </h5>
                    <div class="card-body">
                        <AuthLoginComp />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const token = useCookie('token').value
const router = useRouter()

if ( token ) { router.replace('/') }
</script>

<style scoped lang="scss">
.card {
    border: solid 1px #555;
    background-color: transparent;
    color: #fff;

    .card-title {
        border-bottom: solid 1px #555;
    }
}
</style>