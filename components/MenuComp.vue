<template>
	<div class="menucomp">
		<div class="btn-group">
			<button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
				<i class="fa-solid fa-bars"></i> 
				{{ $t('Menu') }}
			</button>
			<ul class="dropdown-menu">
				<li><a class="dropdown-item" to="/">{{ $t('Index') }}</a></li>
				<li><hr class="dropdown-divider"></li>
				<li><a class="dropdown-item" href="#" @click="Logout()">{{ $t('Logout') }}</a></li>
			</ul>
		</div>
	</div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const jwt = useCookie('jwt').value

const Logout = () => {
	nuxtApp.Logout(jwt)
}
</script>

<style scoped>
.menucomp {
	float: right;

	a:hover {
		background-color: transparent;
	}

}
</style>