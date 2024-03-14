<template>
    <table class="masthead">
        <tbody>
            <tr>
                <td :class="{ 'd-none': !search, 'd-sm-block': search }"><a href="/"><img class="logo" src="/images/logo.png" /></a></td>
                <td>
                    <div class="searchbar">
                        <form action="/result" :class="{ 'd-none': search, 'd-sm-block': search }">
                            <div class="input-group input-group-sm">
                                <button @click="ToggleSearch" class="btn d-inline-block d-sm-none" type="button">
                                    <i class="fa-solid fa-arrow-left"></i>
                                </button>
                                <input class="form-control" name="search" :placeholder="$t('Search')" type="text" :value="$route.query.search" />
                                <button class="btn btn-outline-secondary" type="submit">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </td>
                <td :class="{ 'd-none': !search, 'd-sm-block': search }">
                    <i @click="ToggleSearch" class="btn d-inline-block d-sm-none fa-solid fa-magnifying-glass magnifying-glass"></i>
                    <UserComp />
                </td>
            </tr>
        </tbody>
    </table>  
</template>

<script setup>
const search = ref(true)

function ToggleSearch() {
  search.value = !search.value
}

onMounted(() => {
    window.addEventListener('resize', () => {
        if ( window.innerWidth >= 768 ) {
            search.value = true
        }
    })
})
</script>

<style scoped lang="scss">
.masthead {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 30px;
    border-bottom: solid 1px #eee;

    td {
        text-align: right;
        padding-bottom: 15px;
    }

    td:first-child {
        text-align: left;
    }

    button {
      border: solid 1px #ccc;
    }

    input:focus, button:focus {
      box-shadow: none !important;
    }
}
</style>