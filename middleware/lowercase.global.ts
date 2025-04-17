export default defineNuxtRouteMiddleware((to) => {
    const lowerPath = to.path.toLowerCase()
    if (to.path !== lowerPath) {
        return navigateTo(lowerPath)
    }
})