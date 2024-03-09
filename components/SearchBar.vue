<template>
    <!-- (d-md+) -->
    <form action="/result" class="search d-none d-sm-block">
        <div class="input-group input-group-sm mb-3">
        <input class="form-control" name="search" :placeholder="$t('Search')" type="text" v-model="search" />
        <button class="btn btn-outline-secondary" type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        </div>
    </form>
    <!-- (d-sm-)  -->
    <form action="/result" class="search d-block d-sm-none">
        <div class="input-group input-group-sm mb-3" v-if="search_sm">
        <button @click="ToggleSmSearch" class="btn" type="button">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <input class="form-control" name="search" :placeholder="$t('Search')" type="text" v-model="search" />
        <button class="btn btn-outline-secondary" type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        </div>
        <i @click="ToggleSmSearch" class="btn d-block d-sm-none fa-solid fa-magnifying-glass float-end magnifying-glass" v-if="!search_sm"></i>
    </form>
</template>

<script setup>
const search = ref('')
const search_sm = ref(false)

function ToggleSmSearch() {
  search_sm.value = !search_sm.value
}
</script>

<style scoped>
.search {
  input {
    border: solid 1px #ccc;
  }

  button {
    border: solid 1px #ccc;
  }

  input:focus, button:focus {
    box-shadow: none;
  }
  .magnifying-glass {
    cursor: pointer;
  }
}
</style>