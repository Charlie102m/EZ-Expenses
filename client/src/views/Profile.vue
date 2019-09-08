<template>
    <v-layout align-start justify-center row wrap mt-5>
        <v-flex text-center shrink>
            <div class="image-container ma-5">
                <v-img
                src="@/assets/66711277_10156148056800025_6782326558129389568_n.jpg"
                lazy-src="https://where-inc.com/wpradmin/template/enfold/images/no_agent.png"
                aspect-ratio="1"
                max-width="500"
                max-height="500"
                ></v-img>
            </div>
            <v-btn rounded color="blue-grey darken-4" dark>Change Picture</v-btn>
            <p class="caption mt-5 grey--text text--darken-2">Member Since: {{ user.createdAt}}</p>
        </v-flex>
        <v-flex mt-5>
            <h3 class="display-2 ma-5">{{user.firstName ? user.firstName : 'John' }} {{user.lastName ? user.lastName : 'Smith' }}</h3>
            <h5 class="display-1 teal--text text--darken-1 ma-5">{{user.email}}</h5>
            <p class="headline font-weight-light ma-5 grey--text text--darken-2">Personal License</p>
        </v-flex>
        <v-flex ma-5>
            <form v-on:submit.prevent="updateHome" class="mt-5">
                <p class="caption">Home</p>
                <input
                    v-on:keypress.enter.stop.prevent=""
                    ref="autocomplete3"
                    placeholder="Search for your home address" 
                    v-model="home.temp"
                    @focus="initHomeSearch"
                    type="text"/>
                    <v-flex text-right mt-5>
                        <v-btn type="submit" rounded small color="teal darken-1" dark>
                            Update Home
                            <v-icon class="ml-1" small>save</v-icon>
                        </v-btn>
                    </v-flex>
            </form>
            <form v-on:submit.prevent="updateWork" class="mt-5">
                <p class="caption">Work</p>
                <input
                    v-on:keypress.enter.stop.prevent=""
                    ref="autocomplete4" 
                    placeholder="Your place of work/head office" 
                    v-model="work.temp"
                    @focus="initWorkSearch"
                    type="text"/>
                    <v-flex text-right mt-5>
                        <v-btn type="submit" rounded small color="teal darken-1" dark>
                            Update Work
                            <v-icon class="ml-1" small>save</v-icon>
                        </v-btn>
                    </v-flex>
            </form>
        </v-flex>
    </v-layout>
</template>

<script>
import { HttpService } from '@/services/HttpService.js'
export default {
    data () {
        return {
            user: {
                fisrtName: null,
                lastName: null
            },
            home: {
                temp: null,
                name: null,
                address: null
            },
            work: {
                temp: null,
                name: null,
                address: null
            }   
        }
    },
    mounted () {
        HttpService.getUserProfile()
            .then((response) => {
                console.log('response: ', response);
                this.user = response.data[0]
            })
            .catch((error) => {
                this.$store.dispatch('setMessage', error.response)
            })
    },
    methods: {
        updateHome () {
            console.log(this.home);
            return false
        },
        updateWork () {
            console.log(this.work);
            return false
        },
        initHomeSearch () {
            // eslint-disable-next-line            
            const autocomplete3 = new google.maps.places.Autocomplete((this.$refs.autocomplete3));
            // parse auto complete response for origin field
            autocomplete3.addListener('place_changed', () => {
                let homeResult = autocomplete3.getPlace()
                this.home.name = homeResult.name
                this.home.temp = homeResult.name + ' - ' + homeResult.formatted_address
                this.home.address = homeResult.formatted_address
            })
        },
        initWorkSearch () {
            // eslint-disable-next-line
            const autocomplete4 = new google.maps.places.Autocomplete((this.$refs.autocomplete4));

            // parse auto complete response for destination field
            autocomplete4.addListener('place_changed', () => {
                let workResult = autocomplete4.getPlace()
                this.work.name = workResult.name
                this.work.temp = workResult.name + ' - ' + workResult.formatted_address
                this.work.address = workResult.formatted_address
            })
        }
    }
}
</script>

<style>
.image-container {
    width: 250px;
    border-radius: 100%;
    overflow: hidden;
}

</style>
