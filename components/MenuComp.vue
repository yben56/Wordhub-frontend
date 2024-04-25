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
const jwt = useCookie('jwt').value

const Logout = async () => {
	let api = await useNuxtApp().$api('DELETE', useRuntimeConfig().public.BACKEND_API_BASE_URL + 'users/logout', {
		'Content-Type': 'application/json',
		'Accept-Language' : 'zh-tw'
	})
	let status = await api.status
	let response = await api.json()

	//2. check state
	if ( status !== 200 ) { console.log(response) }

	//3. destroy cookie
	document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
	document.cookie = "first_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
	//document.cookie = "profile_pic=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

	//4. to index
	window.location.href = '/'
}
</script>

<style scoped lang="scss">
.menucomp {
	float: right;

	a:hover {
		background-color: transparent;
	}

}
</style>