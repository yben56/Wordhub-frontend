<template>
	<div class="menucomp">
		<div class="btn-group">
			<button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
				<i class="fa-solid fa-bars"></i> 
				{{ $t('Menu') }}
			</button>
			<ul class="dropdown-menu">
				<li><a class="dropdown-item" href="/history"><i class="fa-solid fa-clock-rotate-left"></i> {{ $t('SearchHistory') }}</a></li>
				<li><a class="dropdown-item" href="/"><i class="fa-solid fa-chart-simple"></i> {{ $t('LearningStatistic') }}</a></li>
				<li><a class="dropdown-item" href="/"><i class="fa-solid fa-pen-to-square"></i> {{ $t('OpenEdit') }}</a></li>
				<li><hr class="dropdown-divider"></li>
				<li><a class="dropdown-item" @click="signOut({ callbackUrl: '/' })"><i class="fa-solid fa-right-from-bracket"></i> {{ $t('Logout') }}</a></li>
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

	li {
		margin-top: 5px;
	}

	a:hover {
		background-color: transparent;
		color: #6610f2;
	}

}
</style>