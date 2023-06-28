<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link v-if="role === 'admin'" to="/resumen">
        <md-icon>dashboard</md-icon>
        <p>Resumen</p>
      </sidebar-link>
      <sidebar-link v-if="role === 'admin'" to="/productos">
        <md-icon>work</md-icon>
        <p>Productos</p>
      </sidebar-link>
      <sidebar-link v-if="role === 'admin'" to="/clientes">
        <md-icon>account_circle</md-icon>
        <p>Clientes</p>
      </sidebar-link>
      <sidebar-link v-if="role === 'admin'" to="/repartidores">
        <md-icon>assignment_ind</md-icon>
        <p>Repartidores</p>
      </sidebar-link>
      <sidebar-link v-if="role === 'admin'" to="/Zonas">
        <md-icon>my_location</md-icon>
        <p>Zonas</p>
      </sidebar-link>
      <sidebar-link to="/Repartos">
        <md-icon>local_shipping</md-icon>
        <p>Repartos</p>
      </sidebar-link>
      <sidebar-link v-if="role === 'admin'" to="/Historico">
        <md-icon>inventory</md-icon>
        <p>Historico</p>
      </sidebar-link>
      <sidebar-link to="/Login">
        <md-icon>logout</md-icon>
        <p>Cerrar Sesion</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content> </dashboard-content>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  computed: {
      role () {
         return localStorage.role
      }
   }
};
</script>
