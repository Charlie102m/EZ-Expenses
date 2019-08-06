<template>
    <nav class="top-nav">
        <v-layout align-center row wrap>
            <v-flex text-left>
                <h5 class="caption grey--text text--lighten-1">Logged in as: {{ userEmail }}</h5>
            </v-flex>
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
                .catch(error => console.error(error))
        }
    },
    computed: {
        userEmail () {
        return this.$store.getters.userEmail
        }
    }
}
</script>

<style>
</style>
