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
				<li><a class="dropdown-item" @click="signOut({ callbackUrl: '/' })">{{ $t('Logout') }}</a></li>
			</ul>
		</div>
	</div>
</template>

<script setup>
const { signOut } = useAuth()
</script>

<style scoped lang="scss">
.menucomp {
	float: right;

	a:hover {
		background-color: transparent;
	}

}
</style>