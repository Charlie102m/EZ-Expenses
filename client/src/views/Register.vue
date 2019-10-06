<template>
    <v-layout align-top justify-center row fill-height>
        <div>
        <v-img
            src="../assets/logo.png"
            aspect-ratio="1"
            class="image-container white"
            max-width="200"
            max-height="200"
            ></v-img>
        <v-card
            width="600"
            class="mx-auto pt-5"
            color="blue-grey lighten-5"
            elevation="3">
            <v-card-title>
                <v-layout align-center justify-space-between ma-5>
                    <v-flex>
                        <h3 class="display-1">Register</h3>
                    </v-flex>
                    <v-flex text-right>
                        <span class="caption mr-5">Already have an account?</span>
                            <router-link to="/login">
                                <v-btn rounded small color="blue-grey darken-4" dark>
                                    Login
                                </v-btn>
                            </router-link>
                    </v-flex>
                </v-layout>
            </v-card-title>
            <v-card-text>
                <v-form v-on:submit.prevent="register">
                    <v-layout align-center justify-center row ma-5>
                        <input 
                        v-model="credentials.firstName"
                        placeholder="Enter your first name"
                        type="text">
                        <input 
                        v-model="credentials.lastName"
                        placeholder="Enter your last name"
                        type="text">
                        <input 
                        v-model="credentials.email"
                        placeholder="Enter your email"
                        type="email">
                        <input 
                        v-model="credentials.password"
                        placeholder="Create a password"
                        type="password">
                    </v-layout>
                    <v-layout align-center justify-end ma-5>
                        <v-btn type="submit" rounded color="teal lighten-1" dark large>
                            <v-icon class="mr-2" dark>send</v-icon>Register
                        </v-btn>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
        </div>
    </v-layout>
</template>

<script>
import { HttpService } from '@/services/HttpService.js'
export default {
    data () {
        return {
            credentials: {
                firstName: null,
                lastName: null,
                email: null,
                password: null
            }
        }
    },
    methods: {
        register () {
            HttpService.register(this.credentials)
                .then((response) => {
                    if (response.status === 200) {
                        this.$router.push({name: 'login'})
                    }
                    console.log(response);
                })
                                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        }
    }
}
</script>

<style scoped>
.image-container {
    position: relative;
    top: 60px;
    z-index: 100;
    margin: 0 auto;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 3px solid white;
    border-radius: 100%;
    overflow: hidden;
}
</style>
