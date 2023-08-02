<template>
    <ManagerHeaderComponent></ManagerHeaderComponent>
    <ManagerNavigationComponent :route="route"></ManagerNavigationComponent>
    <slot/>
</template>
<script>

    export default {
        data() {
            return {
                route: ''
            }
        },
        methods: {
           
        },
        updated() {
            this.route = this.$route.path;
        },
        mounted() {
            this.route = this.$route.path;

            
        },
    }
</script>

<style scoped>

</style>