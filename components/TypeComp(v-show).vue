<template>
    <div class="btn-group">
        <button @click="show('all')" type="button" class="btn btn-sm btn-dark">全部</button>
        <button @click="show('noun')" type="button" class="btn btn-sm btn-light">名詞</button>
        <button @click="show('verb')" type="button" class="btn btn-sm btn-light">動詞</button>
        <button @click="show('adj')" type="button" class="btn btn-sm btn-light">形容詞</button>
    </div>
</template>

<style scoped>
.btn-group {
    padding-bottom: 20px;
    padding-left: 0px;

    .btn {
        margin-right: 10px;
    }
}
</style>

<script>
export default {
  data() {
    return {
        all: true,
        noun: false,
        verb: false,
        adj: false,
    };
  },
  methods: {
    show(type) {

        this.all = false
        this.noun = false
        this.verb = false
        this.adj = false

        if ( type == 'all' ) { this.all = true }
        if ( type == 'noun' ) { this.noun = true }
        if ( type == 'verb' ) { this.verb = true }
        if ( type == 'adj' ) { this.adj = true }
    }
  }
}
</script>