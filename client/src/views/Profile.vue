<template>
    <v-layout align-start justify-center row wrap mt-5>
        <v-flex text-center shrink>
            <div class="image-container ma-5">
                <v-img
                :src="profileImage"
                lazy-src="https://where-inc.com/wpradmin/template/enfold/images/no_agent.png"
                alt="https://where-inc.com/wpradmin/template/enfold/images/no_agent.png"
                aspect-ratio="1"
                max-width="500"
                max-height="500"
                shadow
                ></v-img>
            </div>
            <p class="caption mt-5 grey--text text--darken-2">Member Since: {{ user.createdAt}}</p>
            <form v-on:submit.prevent="uploadImage" enctype="multipart/form-data">
                <v-file-input
                    :loading=loading
                    :rules="rules"
                    color="teal darken-1"
                    v-model="image"
                    ref="image"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick a new profile image"
                    prepend-icon="mdi-camera"
                    label="Profile Image"
                ></v-file-input>
                <v-btn type="submit" rounded small color="teal darken-1" dark :disabled="image ? false : true">Update Avatar</v-btn>
            </form>
        </v-flex>
        <v-flex mt-5 shrink>
            <h3 class="display-2 ma-5">{{user.firstName ? user.firstName : 'John' }} {{user.lastName ? user.lastName : 'Smith' }}</h3>
            <h5 class="display-1 teal--text text--darken-1 ma-5">{{user.email}}</h5>
            <p class="headline font-weight-light ma-5 grey--text text--darken-2">Personal License</p>
            <p class="headline font-weight-light ma-5 grey--text text--darken-2">Defualt Milage Rate: £{{ user.milageValueDefualt}}</p>
        </v-flex>
        <v-flex ma-5>
            <form v-on:submit.prevent="updateMilageRate" class="mt-5">
                <p class="caption">Defualt Milage Rate</p>
                <input
                    type="number"
                    v-on:keypress.enter.stop.prevent="updateMilageRate"
                    v-model="user.milageValueDefualt"
                    step="any"
                    />
                    <v-flex text-right mt-5>
                        <v-btn type="submit" rounded small color="teal darken-1" dark>
                            Update Milage Rate
                            <v-icon class="ml-1" small>save</v-icon>
                        </v-btn>
                    </v-flex>
            </form>
            <form v-on:submit.prevent="updateHome" class="mt-5">
                <p class="caption">Home</p>
                <input
                    v-on:keypress.enter.stop.prevent="updateHome"
                    ref="autocomplete3"
                    placeholder="Search for your home address" 
                    v-model="home.temp"
                    @focus="initHomeSearch"
                    type="text"/>
                    <v-flex text-right mt-5>
                        <v-btn type="submit" rounded small color="teal darken-1" :dark="home.temp ? true : false" :disabled="home.temp ? false : true">
                            Update Home
                            <v-icon class="ml-1" small>save</v-icon>
                        </v-btn>
                    </v-flex>
            </form>
            <form v-on:submit.prevent="updateWork" class="mt-5">
                <p class="caption">Work</p>
                <input
                    v-on:keypress.enter.stop.prevent="updateWork"
                    ref="autocomplete4" 
                    placeholder="Your place of work/head office" 
                    v-model="work.temp"
                    @focus="initWorkSearch"
                    type="text"/>
                    <v-flex text-right mt-5>
                        <v-btn type="submit" rounded small color="teal darken-1" :dark="work.temp ? true : false" :disabled="work.temp ? false : true">
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
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            loading: false,
            image: null,
            user: {
                fisrtName: null,
                lastName: null,
                email: null,
                milageValueDefualt: null,
                homeAddressId: null,
                workAddressId: null,
                createdAt: null,
            },
            profileImage: "https://where-inc.com/wpradmin/template/enfold/images/no_agent.png",
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
                this.user = response.data[0]
                this.profileImage = response.data[0].profileImageUrl
            })
            .catch((error) => {
                this.$store.dispatch('setMessage', error.response)
            })
    },
    methods: {
        async updateMilageRate () {
            this.user.milageValueDefualt = await Number(this.user.milageValueDefualt)
            HttpService.updateProfile('milageValueDefualt', this.user)
                .then(result => {
                    console.log('result: ', result);
                })
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        },
        async uploadImage () {
            this.loading = true
            let formData = new FormData();
            formData.append('image', this.image)
            HttpService.uploadImage(formData)
                .then(() => {
                    this.$router.go(0);
                })
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        },
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
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 3px solid white;
    width: 250px;
    border-radius: 100%;
    overflow: hidden;
}

</style>
