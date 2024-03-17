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
const token = useCookie('token').value

const Logout = () => {
	nuxtApp.Logout(token)
}
</script>

<style scoped>
.menucomp {
	float: right;

	.dropdown-menu {
		background-color: #262626;
		border:  solid 1px #555;

		.dropdown-divider { color: #ccc; }
		a { color: #fff; }
		a:hover { background-color: #212121; }
	}
}
</style>