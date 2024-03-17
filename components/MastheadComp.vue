<template>
    <div class="masthead">
        <table>
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
    </div> 
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
    padding: 10px 15px;
    border-bottom: solid 1px #555;
    
    table {
        width: 100%;
        
        td {
            text-align: right;
        }

        td:first-child {
            text-align: left;

            .logo {
                margin-left: 15px;
            }
        }

        button {
            border: solid 1px #999;
        }

        .fa-solid {
            color: #aaa;
        }

        input {
            background-color: transparent;
            color: #fff;
            border: solid 1px #999;
            border-right: none;
            font-size: 14px;
        }

        input:focus, button:focus, button:hover {
            box-shadow: none !important;
            background-color: transparent;
        }
    }
}
</style>