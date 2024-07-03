<template>
    <div id="openedit-add-new-word" class="container">
       <div class="row">
            <div class="col-md-9">
                <OpeneditTabComp />
                <OpeneditInfoComp />
                <OpeneditAddNewWordComp />
                <br>
            </div>
            <div class="col-lg-3">
                
            </div>
       </div> 
    </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })
</script>

<style lang="scss" scoped>
#openedit-add-new-word {
    margin-top: 30px;

    h5 {
        font-weight: bold;
        margin-left: 10px;

        i {
            margin: 10px;
            color: #6610f2;
        }
    }
}
</style>