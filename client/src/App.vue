<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/trips">Trips</router-link> | 
      <router-link to="/trips/new">New Trip</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
