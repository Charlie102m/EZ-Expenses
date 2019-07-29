<template>
    <nav class="top-nav">
        <v-layout align-center row wrap>
            <v-flex text-right>
                <v-btn text color="grey lighten-1" @click="logout">Logout <v-icon right>exit_to_app</v-icon></v-btn>
            </v-flex>
        </v-layout>
    </nav>
</template>

<script>
export default {
    name: 'TopNav',
    methods: {
        logout () {
            this.$store.dispatch('logout')
            .then(() => this.$router.push({ name: 'login'}))
        }
    }
}
</script>

<style>

</style>
