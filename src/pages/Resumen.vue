<template>
  <div class="content">
    <div v-if="this.ventasMesData.disponible">
      <chart-card
        :chart-data="this.ventasMesData"
        :chart-type="this.ventasMesData.tipo"
        :data-background-color="this.ventasMesData.color">
        <template slot="content">
          <h4 class="title">{{this.ventasMesData.titulo}}</h4>
            <!-- <p class="category">
              <span class="text-success"><i class="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.
            </p> -->
        </template>

        <!-- <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            updated 4 minutes ago
          </div>
        </template> -->
   </chart-card>
      </div>
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-20"
      >
        <stats-card data-background-color="green">
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
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-20"
      >
        <stats-card data-background-color="blue">
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
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-20"
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
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-20"
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
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-20"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>handshake</md-icon>
          </template>

          <template slot="content">
            <p class="category">Repartos Realizados</p>
            <h3 class="title">{{cantidadHistorico}}</h3>
          </template>

   
        </stats-card>
        
      </div>
      
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Envases</h4>
            <p class="category">Cantidad de envases vendidos</p>
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

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Ventas</h4>
            <p class="category">Resumen financiero</p>
          </md-card-header>
          <md-card-content>
           <div>
              <md-table v-model="financiero" table-header-color="black">
                <md-table-row slot="md-table-row" slot-scope="{ item }" >
                  <md-table-cell md-label="Ingreso">{{ item.ingreso}}</md-table-cell>
                  <md-table-cell md-label="Fiado">{{ item.fiado}}</md-table-cell>
                  <md-table-cell md-label="Total">{{ item.fiado + item.ingreso}}</md-table-cell>                  
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card> 
      </div> 

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
    cantHistoricos() {
      axios.get(Config.API_URL + 'CantHistorico').then(response => {
        console.log(response.data);
        this.cantidadHistorico = response.data[0];
      });
    },
    cantBidones12() {
      axios.get(Config.API_URL + 'CantBidones12').then(response => {
        console.log(response.data);
        this.datos[0].cantidad = response.data[0];
      });
    },
    cantBidones20() {
      axios.get(Config.API_URL + 'CantBidones20').then(response => {
        console.log(response.data);
        this.datos[1].cantidad = response.data[0];
      });
    },
    cantSoda() {
      axios.get(Config.API_URL + 'CantSoda').then(response => {
        console.log(response.data);
        this.datos[2].cantidad= response.data[0];
      });
    },
    cantPagos() {
      axios.get(Config.API_URL + 'CantPago').then(response => {
        console.log(response.data);
        this.financiero[0].ingreso= response.data[0];
      });
    },
    cantFiados() {
      axios.get(Config.API_URL + 'CantFiado').then(response => {
        console.log(response.data);
        this.financiero[0].fiado= response.data[0];
      });
    },
    ventasMes(){
      axios.get(Config.API_URL + 'reporte/ventasxmes').then(response => {
        this.ventasMesData.labels = Object.keys(response.data);
        this.ventasMesData.series.push(Object.values(response.data));
        this.ventasMesData.disponible = true
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
    this.cantPagos()
    this.cantFiados()
    this.cantHistoricos()
    this.ventasMes()
  },
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable},  
  data () {
  return {
    cantidadClientes: 0,
    cantidadRepartidores: 0,
    cantidadRepartos: 0,
    cantidadZonas: 0,
    cantidadBidones12: 0,
    cantidadBidones20: 0,
    cantidadSoda: 0,
    cantidadHistorico: 0,
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
    ],
    financiero:[
      {
        ingreso: 0,
        fiado: 0,
      }
    ],
    ventasMesData:{
      labels: [],
      series: [],
      disponible: false,
      tipo: "Line",
      color: "green",
      titulo: "Ventas por Mes"
    },
  }
} 
};

</script>
