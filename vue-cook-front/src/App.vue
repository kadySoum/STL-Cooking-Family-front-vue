<template>
  <v-app>
   
     <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">STLCookingFamily</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/recettes" class="nav-link">Recettes</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
