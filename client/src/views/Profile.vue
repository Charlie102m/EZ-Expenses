<template>
    <v-container :key="componentKey">
        <v-row justify="center">
            <v-col md="4" class="mt-5 text-center">
                <div class="image-container mx-auto">
                    <v-img
                    :src="profileImageUrl"
                    lazy-src="../assets/logo.png"
                    aspect-ratio="1"
                    max-width="500"
                    max-height="500"
                    shadow>
                    </v-img>
                </div>
                <p class="caption mt-5 grey--text text--darken-2">Member Since: {{ user.createdAt}}</p>
                <form v-on:submit.prevent="uploadImage" enctype="multipart/form-data">
                    <v-file-input
                        :loading=loading
                        :rules="rules"
                        messages="After uploading a new profile image, you may need to hard refresh your page for it to appear. If this doesn't work, try clearing your browser cache."
                        color="teal darken-1"
                        v-model="image"
                        ref="image"
                        chips
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Pick a new profile image"
                        prepend-icon="mdi-camera"
                        label="Profile Image"
                    ></v-file-input>
                    <v-flex text-right>
                        <v-btn type="submit" rounded small color="teal darken-1" :dark="image ? true : false" :disabled="image ? false : true">Update Avatar</v-btn>
                    </v-flex>
                </form>
            </v-col>
            <v-col md="8">
                <!-- <v-col> -->
                    <h3 class="display-2 my-3">{{ user.firstName }} {{ user.lastName }}</h3>
                    <h5 class="headline teal--text text--darken-1 my-3">{{user.email}}</h5>
                    <p class="body-1 font-weight-light my-3 grey--text text--darken-2">Personal License</p>
                    <hr class="my-5 teal elevation-2">
                <!-- </v-col> -->
                <v-row>
                    <v-col cols="12" sm="6">
                        <p class="subtitle-2 teal--text text--darken-1 mx-3 mb-5">Defualt Milage Rate:</p>
                        <p class="subtitle-1 font-weight-light ma-5 grey--text text--darken-2">£{{ user.milageValueDefualt}}</p>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <form v-on:submit.prevent="updateMilageRate" class="mx-3">
                            <p class="caption mb-0">Update Defualt Milage Rate (£0.00)</p>
                            <input
                                type="number"
                                v-on:keypress.enter.stop.prevent="updateMilageRate"
                                class="mb-5"
                                placeholder="0.00"
                                v-model="newMilageValue"
                                step="any"
                                />
                                <v-flex text-right>
                                    <v-btn type="submit" rounded small color="teal darken-1" :dark="newMilageValue ? true : false" :disabled="newMilageValue ? false : true">
                                        Update Milage Rate
                                        <v-icon class="ml-1" small>save</v-icon>
                                    </v-btn>
                                </v-flex>
                        </form>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <p class="subtitle-2 teal--text text--darken-1 mx-3">Home Address:</p>
                        <p class="subtitle-1 font-weight-light ma-5 grey--text text--darken-2">{{ user.homeAddress}}</p>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <form v-on:submit.prevent="updateHome" class="mx-3">
                            <p class="caption mb-1">Update Home Address</p>
                            <input
                                v-on:keypress.enter.stop.prevent=""
                                class="mb-5"
                                ref="autocomplete3"
                                placeholder="Search for your home address" 
                                v-model="home.temp"
                                @focus="initHomeSearch"
                                type="text"/>
                                <v-flex text-right>
                                    <v-btn type="submit" rounded small color="teal darken-1" :dark="home.temp ? true : false" :disabled="home.temp ? false : true">
                                        Update Home
                                        <v-icon class="ml-1" small>save</v-icon>
                                    </v-btn>
                                </v-flex>
                        </form>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <p class="subtitle-2 teal--text text--darken-1 mx-3">Work Address:</p>
                        <p class="subtitle-1 font-weight-light ma-5 grey--text text--darken-2">{{ user.workAddress}}</p>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <form v-on:submit.prevent="updateWork" class="mx-3">
                            <p class="caption">Update Work Address</p>
                            <input
                                v-on:keypress.enter.stop.prevent=""
                                class="mb-5"
                                ref="autocomplete4" 
                                placeholder="Your place of work/head office" 
                                v-model="work.temp"
                                @focus="initWorkSearch"
                                type="text"/>
                                <v-flex text-right>
                                    <v-btn type="submit" rounded small color="teal darken-1" :dark="work.temp ? true : false" :disabled="work.temp ? false : true">
                                        Update Work
                                        <v-icon class="ml-1" small>save</v-icon>
                                    </v-btn>
                                </v-flex>
                        </form>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { HttpService } from '@/services/HttpService.js'
export default {
    data () {
        return {
            componentKey: 0,
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            loading: false,
            image: null,
            profileImageUrl: '',
            user: {
                fisrtName: null,
                lastName: null,
                email: null,
                milageValueDefualt: null,
                homeAddressId: null,
                workAddressId: null,
                createdAt: null,
            },
            newMilageValue: null,
            home: {
                type: 'home',
                temp: null,
                name: null,
                address: null
            },
            work: {
                type: 'work',
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
                this.profileImageUrl = response.data[0].profileImageUrl
            })
            .catch((error) => {
                this.$store.dispatch('setMessage', error.response)
            })
    },
    methods: {
        async updateMilageRate () {
            this.newMilageValue= await Number(this.newMilageValue)
            let payload = {milageValueDefualt: this.newMilageValue}
            HttpService.updateProfile('milageValueDefualt', payload)
                .then(() => {
                    this.$router.go(0)
                })
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        },
        uploadImage () {
            this.loading = true
            let formData = new FormData();
            formData.append('image', this.image)
            HttpService.uploadImage(formData)
                .then(() => {
                    this.$router.go(0)
                })
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        },
        async updateHome () {
            HttpService.updateAddress(this.home)
                .then(() => {
                    this.$router.go(0)
                })
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        },
        async updateWork () {
            HttpService.updateAddress(this.work)
                .then(() => {
                    this.$router.go(0)
                })
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
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
