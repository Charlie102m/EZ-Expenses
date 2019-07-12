<template>
    <nav>
        <router-link to="/"><i class="fas fa-home"></i></router-link>
      <router-link to="/trips"><i class="fas fa-th"></i></router-link>
      <router-link to="/trips/new"><i class="fas fa-car"></i></router-link>
    </nav>
</template>

<script>
export default {
name: 'SideNav',
}
</script>

<style>
    nav {
        background-color: black;
        height: 100vh;
        padding: 50px 0px;
        width: 80px;
    }
    nav a {
        display: block;
        font-size: 50px;
        color: rgb(255, 255, 255);
        margin-top: 30px;
        text-align: center;
    }

</style>
