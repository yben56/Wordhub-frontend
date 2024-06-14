<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 offset-lg-4">
                <div class="card mt-5">
                    <div class="card-title p-3 card-header">
                        {{ $t('Login') }}
                    </div>
                    <div class="card-body">
                        <AuthLoginComp />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter()
const { status } = useAuth()

if ( status.value === 'authenticated' ) {router.replace('/') }
</script>

<style scoped lang="scss">
.card {
    box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -webkit-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 1px 6px 1px rgba(0,0,0,0.05);
}
</style>