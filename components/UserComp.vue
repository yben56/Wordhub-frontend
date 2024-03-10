<template>
    <div v-if="!token">
        <!--Login-->
        <ModalComp template="LoginComp" :title="$t('Login')">
            <template v-slot:body-content>
                <AuthLoginComp />
            </template>
            <template v-slot:toggle-btn>
                <button class="login-btn btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#LoginComp">
                    <i class="fa-solid fa-right-to-bracket"></i>
                    {{ $t('Login') }}
                </button>
            </template>
        </ModalComp>
        <!--Signup-->
        <ModalComp template="SignupComp" :title="$t('Signup')">
            <template v-slot:body-content>
                <AuthSignupComp />
            </template>
            <template v-slot:toggle-btn>
                <button class="signup-btn btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#SignupComp">
                    <i class="fa-solid fa-pencil"></i>
                    {{ $t('Signup') }}
                </button>
            </template>
        </ModalComp>
    </div>
    <div v-else>
        <a class="firstname">Benjamin</a>
        <MenuComp />
    </div>
</template>

<script setup>
const token = useCookie('token').value
const firstname = useCookie('firstname').value
</script>

<style scoped lang="scss">
div {
    display: inline-block;
    
    .firstname {
        margin: 0 10px;
        line-height: 28px;
    }

    .login-btn, .signup-btn {
        margin-left: 5px;
    }
}
</style>