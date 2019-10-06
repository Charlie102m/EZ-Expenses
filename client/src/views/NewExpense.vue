<template>
    <div>
         <v-form v-on:submit.prevent="addExpense">
            <v-layout align-start row wrap>
                <v-flex mx-5 mt-5 md6>
                    <div class="input-label mb-3">When did this expense occur?</div>
                    <v-date-picker v-model="expense.expenseDate" full-width :landscape="$vuetify.breakpoint.smAndUp" color="teal lighten-1" class="mt-2"></v-date-picker>
                </v-flex>
                <v-flex mt-1 mx-5 md2>
                    <v-radio-group v-model="expense.expenseType">
                        <template v-slot:label>
                            <div class="mb-3">What sort of expense was this?</div>
                        </template>
                        <v-radio label="Travel" value="travel" color="teal lighten-1"></v-radio>
                        <v-radio label="Accomodation" value="accomodation" color="teal lighten-1"></v-radio>
                        <v-radio label="Subsistence" value="subsistence" color="teal lighten-1"></v-radio>
                        <v-radio label="Other" value="other" color="teal lighten-1"></v-radio>
                    </v-radio-group>
                </v-flex>
                <v-flex color="grey darken-1" ma-5 pt-1>
                    <div class="input-label mb-3">NET (£0.00)</div>
                    <input type="number"
                    v-model="expense.net"
                    required>
                    <v-switch v-model="includeTax" label="Include VAT? (20%)" color="teal lighten-1"></v-switch>
                    <h4 class="input-label headline mt-5">Total £{{ expense.total.toFixed(2) }}</h4>
                </v-flex>
                <v-flex xs12 mx-5 mt-5>
                    <input
                    placeholder="Describe what this expense was for..."
                    v-model="expense.comment"
                    type="text"/>
                </v-flex>
                <v-flex text-right mt-3 v-show="expense.comment && expense.expenseType && expense.net > 0">
                    <v-btn type="submit" 
                    rounded color="teal lighten-1" 
                    dark>
                    <v-icon class="mr-2" dark>send</v-icon>Submit
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </div>
</template>

<script>
import { HttpService } from '@/services/HttpService.js'
export default {
    data () {
        return {
            includeTax: true,
            expense: {
                expenseDate: new Date().toISOString().substr(0, 10),
                expenseType: null,
                comment: null,
                net: 0,
                vat: 0.20,
                total: 0,
                createdBy: null
            },
            items: [
                'Travel',
                'Accomodation',
                'Subsistence',
                'Other'
            ]
        }
    },
    methods: {
        addExpense () {
            this.expense.createdBy = this.$store.getters.userId
            console.log(this.expense);
            HttpService.addExpense(this.expense)
                .then(() => this.$router.push("/expenses"))
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        }
    },
    watch: {
        vatComputed: function () {
            if (this.includeTax === true) {
                return this.expense.total = parseFloat(this.expense.net * this.expense.vat) + parseFloat(this.expense.net)
            } else {
                return this.expense.total = parseFloat(this.expense.net)
            }
        },
        includeTax: function () {
            if (this.includeTax === true) {
                return this.expense.total = parseFloat(this.expense.net * this.expense.vat) + parseFloat(this.expense.net)
            } else {
                return this.expense.total = parseFloat(this.expense.net)
            }
        }
    },
    computed: {
        vatComputed () {
            return this.expense.net
        }
    }
}
</script>

<style>
</style>
