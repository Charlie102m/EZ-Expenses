<template>
    <v-layout align-top justify-center row fill-height>
        <div>
        <v-img
            src="../assets/logo.png"
            aspect-ratio="1"
            class="image-container white"
            max-width="130"
            max-height="130"
            ></v-img>
        <v-card
            max-width="442"
            class="mx-auto pt-5"
            color="blue-grey lighten-5"
            elevation="3">
            <v-card-title>
                <v-layout align-center justify-space-between row wrap ma-3>
                    <v-flex>
                        <h3 class="display-1">Login</h3>
                    </v-flex>
                    <v-flex grow-shrink-0 text-right>
                        <span class="caption mr-5">Dont have an account?</span>
                            <router-link to="/register">
                                <v-btn rounded small color="blue-grey darken-4" dark>
                                    Register
                                </v-btn>
                            </router-link>
                    </v-flex>
                </v-layout>
            </v-card-title>
            <v-card-text>
                <v-form v-on:submit.prevent="login">
                    <v-layout align-center justify-center row ma-3>
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
                            <v-icon class="mr-2" dark>send</v-icon>Login
                        </v-btn>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
        </div>

    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            image: 'client/src/assets/dark-background.png',
            credentials: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        login () {
            this.$store.dispatch('login', this.credentials)
                .then(() => {
                    this.$router.push({ name: 'dashboard'})
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
    top: 50px;
    z-index: 100;
    margin: 0 auto;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 3px solid white;
    border-radius: 100%;
    overflow: hidden;
}
</style>
