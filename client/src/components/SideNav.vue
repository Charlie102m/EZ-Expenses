<template>
    <nav>
        <router-link to="/"><i class="material-icons">home</i></router-link>
        <router-link to="/trips"><i class="material-icons">directions_car</i></router-link>
        <router-link to="/trips"><i class="material-icons">payment</i></router-link>
        <router-link to="/trips/new"><i class="material-icons">attach_money</i></router-link>
        <router-link to="/trips/new"><i class="material-icons">attach_money</i></router-link>
    </nav>
</template>

<script>
export default {
name: 'SideNav',
}
</script>

<style>
    nav {
        background-color: #2F303C;
        /* height: 100vh; */
        /* width: 100px; */
    }
    .material-icons {
        color: white;
        font-size: 70px;
    }

</style>
