<template>
    <v-form v-on:submit.prevent="login">
        <input 
        v-model="credentials.email"
        placeholder="Enter your email"
        type="email">
        <input 
        v-model="credentials.password"
        placeholder="Create a password"
        type="password">
        <v-btn type="submit" round color="teal lighten-1" dark>
            <v-icon class="mr-2" dark>send</v-icon>Login
        </v-btn>
    </v-form>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
    data () {
        return {
            credentials: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        login () {
            HttpService.login(this.credentials)
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
        }
    }
}
</script>

<style>

</style>
