<template>
<div>
    <router-link to="/login">Login</router-link>
    <v-form v-on:submit.prevent="register">
        <input 
        v-model="credentials.email"
        placeholder="Enter your email"
        type="email">
        <input 
        v-model="credentials.password"
        placeholder="Create a password"
        type="password">
        <v-btn type="submit" rounded color="teal lighten-1" dark>
            <v-icon class="mr-2" dark>send</v-icon>Register
        </v-btn>
    </v-form>
</div>
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
        register () {
            HttpService.register(this.credentials)
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
        }
    }
}
</script>

<style>

</style>
