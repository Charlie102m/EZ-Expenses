<template>
<nav class="nav">
    <v-layout align-center justify-space-between column fill-height text-center>
        <div class="nav-head">
            <router-link to="/register"><i class="material-icons">person</i></router-link>
        </div>
        <div class="nav-body">
            <router-link to="/"><i class="material-icons">home</i></router-link>
            <router-link to="/trips"><i class="material-icons">directions_car</i></router-link>
            <router-link to="/expenses"><i class="material-icons">payment</i></router-link>
            <router-link to="/claims"><i class="material-icons">attach_money</i></router-link>
        </div>
        <div class="nav-footer">
            <router-link to="/playgrounds"><i class="material-icons">settings</i></router-link>
        </div>
    </v-layout>
</nav>
</template>

<script>
export default {
name: 'SideNav',
}
</script>

<style>

    .nav {
        background-color: #263238;
        width: 100px;
        height: 100%;
    }

    .nav .nav-body {
        flex: 1 1 400px;
        margin-top: 80px;
    }

    .nav .nav-head .material-icons {
        color: #2F303C;
    }

    .nav .nav-head {
        margin-top: 30px;
        background: white;
        border-radius: 50%;
    }

    .nav .material-icons {
        color: white;
        font-size: 50px;
        margin: 15px;
        opacity: 0.9;
        transition: all 0.3s ease-in;
    }

    .nav .material-icons:hover {
        opacity: 1;
        transform: scale(1.1)
    }

    .is-active .material-icons {
        color: #26A69A !important;
        transform: scale(1.1)
    }

</style>
