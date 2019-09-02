<template>
    <v-alert type="error">
        <strong>{{ message.status }}:</strong> {{ message.data }}
    </v-alert>
</template>

<script>
export default {
    name: 'messages',
    data () {
        return {

        }
    },
    computed: {
        message () {
            return this.$store.state.message
        }
    }
}
</script>

<style>

</style>
