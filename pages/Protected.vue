<template>
    <span>protected page</span>
    <pre>{{ getSession }}</pre>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

const { data: getSession } = useAuth()


</script>