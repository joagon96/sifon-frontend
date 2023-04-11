<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>account_circle</md-icon>
          </template>

          <template slot="content">
            <p class="category">Clientes</p>
            <h3 class="title">{{cantidadClientes}}</h3>
          </template>

        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>assignment_ind</md-icon>
          </template>

          <template slot="content">
            <p class="category">Repartidores</p>
            <h3 class="title">{{cantidadRepartidores}}</h3>
          </template>

        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>local_shipping</md-icon>
          </template>

          <template slot="content">
            <p class="category">Planillas de Reparto</p>
            <h3 class="title">{{cantidadRepartos}}</h3>
          </template>

   
        </stats-card>
        
      </div>

      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>my_location</md-icon>
          </template>

          <template slot="content">
            <p class="category">Zonas</p>
            <h3 class="title">{{cantidadZonas}}</h3>
          </template>

   
        </stats-card>
        
      </div>
      
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Ventas</h4>
            <p class="category">Cantidad de envases a vender</p>
          </md-card-header>
          <md-card-content>
           <div>
              <md-table v-model="datos" table-header-color="black">
                <md-table-row slot="md-table-row" slot-scope="{ item }" >
                  <md-table-cell md-label="Envase">{{ item.envase}}</md-table-cell>
                  <md-table-cell md-label="Cantidad">{{ item.cantidad}}</md-table-cell>                 
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card> 
      </div> 
      <!-- <div 
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">Tasks:</span>
            <md-tabs md-sync-route class="md-success" md-alignment="left">
              <md-tab id="tab-home" md-label="Bugs" md-icon="bug_report">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-pages" md-label="Website" md-icon="code">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-posts" md-label="server" md-icon="cloud">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>  -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {Config} from '../config.js'

import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";

export default {
  methods: {
    cantClientes() {
      axios.get(Config.API_URL + 'CantClientes').then(response => {
        console.log(response.data);
        this.cantidadClientes = response.data[0];
      });
    },
    cantRepartidores() {
      axios.get(Config.API_URL + 'CantRepartidores').then(response => {
        console.log(response.data);
        this.cantidadRepartidores = response.data[0];
      });
    },
    cantZonas() {
      axios.get(Config.API_URL + 'CantZonas').then(response => {
        console.log(response.data);
        this.cantidadZonas = response.data[0];
      });
    },
    cantRepartos() {
      axios.get(Config.API_URL + 'CantRepartos').then(response => {
        console.log(response.data);
        this.cantidadRepartos = response.data[0];
      });
    },
    cantBidones12() {
      axios.get(Config.API_URL + 'CantBidones12').then(response => {
        console.log(response.data);
        this.datos[0].cantidad = response.data;
      });
    },
    cantBidones20() {
      axios.get(Config.API_URL + 'CantBidones20').then(response => {
        console.log(response.data);
        this.datos[1].cantidad = response.data;
      });
    },
    cantSoda() {
      axios.get(Config.API_URL + 'CantSoda').then(response => {
        console.log(response.data);
        this.datos[2].cantidad= response.data;
      });
    }
  },
  mounted() {
    this.cantClientes()
    this.cantRepartidores()
    this.cantBidones12()
    this.cantBidones20()
    this.cantRepartos()
    this.cantSoda()
    this.cantZonas()
  },
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },  
  data () {
  return {
    cantidadClientes: 0,
    cantidadRepartidores: 0,
    cantidadRepartos: 0,
    cantidadZonas: 0,
    cantidadBidones12: 0,
    cantidadBidones20: 0,
    cantidadSoda: 0,
    datos:[
      {
        envase: "Bidon 12 L",
        cantidad: 0,
      },
      {
        envase: "Bidon 20 L",
        cantidad: 0,
      },
       {
        envase: "Sifon Soda",
        cantidad: 0,
      }
    ]
  }
} 
};

</script>
