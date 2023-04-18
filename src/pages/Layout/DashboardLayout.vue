<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/resumen">
        <md-icon>dashboard</md-icon>
        <p>Resumen</p>
      </sidebar-link>
      <sidebar-link to="/clientes">
        <md-icon>account_circle</md-icon>
        <p>Clientes</p>
      </sidebar-link>
      <sidebar-link to="/repartidores">
        <md-icon>assignment_ind</md-icon>
        <p>Repartidores</p>
      </sidebar-link>
      <sidebar-link to="/Zonas">
        <md-icon>my_location</md-icon>
        <p>Zonas</p>
      </sidebar-link>
      <sidebar-link to="/Repartos">
        <md-icon>local_shipping</md-icon>
        <p>Repartos</p>
      </sidebar-link>
      <sidebar-link to="/Login">
        <md-icon>logout</md-icon>
        <p>Cerrar Sesion</p>
      </sidebar-link>
      <!--<sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>

      <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link>-->
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
};
</script>
