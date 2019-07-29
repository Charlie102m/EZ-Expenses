<template>
    <div>
        <h3 class="display-3 ma-5">Playgrounds</h3>
        <v-form @submit.prevent="updateMyState">
            <v-layout align-center justify-space-around row wrap ma-5>
                <v-flex xs12 ma-5>
                    <span class="headline">Objective: </span><span class="subtitle-1">Learn to manipulate state in Vue.js with mutations, actions &amp; getters</span>
                </v-flex>
                <v-flex ma-5>
                    <input 
                        type="text"
                        placeholder="Type something to update the state"
                        v-model="newState">
                </v-flex>
                <v-flex ma-5>
                    <v-btn type="submit" 
                        rounded color="teal lighten-1"
                        dark>
                        <v-icon class="mr-2" dark>send</v-icon>Update State
                    </v-btn>
                </v-flex>
                <v-flex xs12 ma-5>
                    <span class="headline">State: </span><span class="subtitle-1">{{ testState }}</span>
                </v-flex>  
                <v-flex xs12 ma-5>
                    <span class="subtitle-2">{{ prettyState }}</span>
                </v-flex>  
            </v-layout>
        </v-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            newState: null
        }
    },
    methods: {
        updateMyState () {
            this.$store.dispatch('updateState', this.newState)
        }
    }, 
    computed: {
        testState () {
            return this.$store.state.testState
        },
        prettyState () {
            return this.$store.getters.prettyState
        }
    }
}
</script>

<style>

</style>
