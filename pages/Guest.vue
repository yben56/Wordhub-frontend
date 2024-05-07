<template>
    <span>guest page</span>
</template>

<script setup>
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    }
})
</script>