<template>
  <div style="padding: 15px 15px">
    <md-table md-card class="md-size-50">
      <md-table-toolbar>
        <h1 class="md-title">Clientes</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>Nombre</md-table-head>
        <md-table-head>Domicilio</md-table-head>
        <md-table-head>Compra 12L</md-table-head>
        <md-table-head>Compra 20L</md-table-head>
        <md-table-head>Compra Soda</md-table-head>
        <md-table-head>Pago</md-table-head>
        <md-table-head>Fiado</md-table-head>
        <md-table-head>Devuelve 12L</md-table-head>
        <md-table-head>Devuelve 20L</md-table-head>
        <md-table-head>Devuelve Soda</md-table-head>
      </md-table-row>

      <md-table-row v-for="l in lineas" :key="l.idLR">
        <md-table-cell>{{ l.nomapeCli }}</md-table-cell>
        <md-table-cell>{{ l.domicilio }}</md-table-cell>
        <md-table-cell>{{ l.com12 }}</md-table-cell>
        <md-table-cell>{{ l.com20 }}</md-table-cell>
        <md-table-cell>{{ l.comSoda }}</md-table-cell>
        <md-table-cell>{{ l.pago }}</md-table-cell>
        <md-table-cell>{{ l.fiado }}</md-table-cell>
        <md-table-cell>{{ l.dev12 }}</md-table-cell>
        <md-table-cell>{{ l.dev20 }}</md-table-cell>
        <md-table-cell>{{ l.devSoda }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'
import {Config} from '../config.js'

export default {
  created () {
    this.getClientesZona()
  },
  methods: {
    getClientesZona() {
      axios({
          method: 'GET',
          url: Config.API_URL + 'get/RepartoxLineaReparto/' + 2,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        console.log(response.data)
        this.lineas = response.data
      });
    },
  },
  data() {
    return {
      lineas: [],
      textarea: null,
      first:false,
    }
  }
}
</script>
<style>
md-table-head {
  padding-right: 0px;
}
md-table-cell {
  padding-right: 0px;
}
</style>


