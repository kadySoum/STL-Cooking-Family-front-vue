import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/recettes",
      name: "recettes",
      component: () => import("./components/RecettesList")
    },
    {
      path: "/recettes/:id",
      name: "recette-details",
      component: () => import("./components/Recette")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddRecette")
    }
  ]
});
