<template>
  <div class="content">
    <div class="md-layout">
      <div v-for="grafico in this.graficos1" :key="grafico.id" class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
        <div v-if="grafico.disponible">
          <chart-card
            :chart-data="grafico"
            :chart-type="grafico.tipo"
            :data-background-color="grafico.color">
            <template slot="content">
              <h4 class="title">{{grafico.titulo}}</h4>
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
      </div>
      <div v-for="grafico in this.graficos2" :key="grafico.id" class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
        <div v-if="grafico.disponible">
          <chart-card
            :chart-data="grafico"
            :chart-type="grafico.tipo"
            :data-background-color="grafico.color">
            <template slot="content">
              <h4 class="title">{{grafico.titulo}}</h4>
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
      </div>
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
            <p class="category">Repartos</p>
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
      
      <div v-if="clientesCargados"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Ranking de Clientes</h4>
          </md-card-header>
          <md-card-content>
           <div>
            <md-table>
              <md-table-row>
                <md-table-head>Cliente</md-table-head>
                <md-table-head>Aporte</md-table-head>
              </md-table-row>
              <md-table-row v-for="(valor, clave) in clientes" :key="clave">
                <md-table-cell>{{ clave }}</md-table-cell>
                <md-table-cell>{{ valor }}</md-table-cell>
              </md-table-row>
            </md-table>
            </div>
          </md-card-content>
        </md-card> 
      </div> 

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Ranking de Duedores</h4>
          </md-card-header>
          <md-card-content>
           <div>
            <md-table>
              <md-table-row>
                <md-table-head>Cliente</md-table-head>
                <md-table-head>Deuda</md-table-head>
              </md-table-row>
              <md-table-row v-for="(valor, clave) in deudores" :key="clave">
                <md-table-cell>{{ clave }}</md-table-cell>
                <md-table-cell>{{ valor }}</md-table-cell>
              </md-table-row>
            </md-table>
            </div>
          </md-card-content>
        </md-card> 
      </div> 

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Ranking de Productos</h4>
          </md-card-header>
          <md-card-content>
           <div>
            <md-table>
              <md-table-row>
                <md-table-head>Producto</md-table-head>
                <md-table-head>Cantidad</md-table-head>
              </md-table-row>
              <md-table-row v-for="(valor, clave) in productos" :key="clave">
                <md-table-cell>{{ clave }}</md-table-cell>
                <md-table-cell>{{ valor }}</md-table-cell>
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
        this.graficos1[0].labels = Object.keys(response.data);
        this.graficos1[0].series.push(Object.values(response.data));
        this.graficos1[0].disponible = true
      });
    },
    productosMes(){
      axios.get(Config.API_URL + 'reporte/productosxmes').then(response => {
        this.graficos1[1].labels = Object.keys(response.data);
        let productos = []
        let bidones12 = []
        let bidones20 = []
        let sifones = []
        productos = Object.values(response.data)
        bidones12 = []
        bidones20 = []
        sifones = []
        for (let i = 0; i < productos.length; i++) {
          bidones12.push(productos[i]['Bidon 12L'])
          bidones20.push(productos[i]['Bidon 20L'])
          sifones.push(productos[i]['Sifon Soda'])
        }
        this.graficos1[1].series.push(bidones12);
        this.graficos1[1].series.push(bidones20);
        this.graficos1[1].series.push(sifones);
        this.graficos1[1].disponible = true
      });
    },
    repartosMes(){
      axios.get(Config.API_URL + 'reporte/repartosxmes').then(response => {
        this.graficos1[2].labels = Object.keys(response.data);
        this.graficos1[2].series.push(Object.values(response.data));
        this.graficos1[2].disponible = true
      });
    },
    clientesZona(){
      axios.get(Config.API_URL + 'reporte/clientesxzona').then(response => {
        this.graficos2[0].labels = Object.keys(response.data);
        this.graficos2[0].series.push(Object.values(response.data));
        this.graficos2[0].disponible = true
      });
    },
    repartosZona(){
      axios.get(Config.API_URL + 'reporte/repartosxzona').then(response => {
        this.graficos2[1].labels = Object.keys(response.data);
        this.graficos2[1].series.push(Object.values(response.data));
        this.graficos2[1].disponible = true
      });
    },
    repartosDia(){
      axios.get(Config.API_URL + 'reporte/repartosxdia').then(response => {
        this.graficos2[2].labels = Object.keys(response.data);
        this.graficos2[2].series.push(Object.values(response.data));
        this.graficos2[2].disponible = true
      });
    },
    topClientes(){
      axios.get(Config.API_URL + 'reporte/topClientes').then(response => {
        this.clientes = response.data
        this.clientesCargados = true
      });
    },
    topDeudores(){
      axios.get(Config.API_URL + 'reporte/topDeudores').then(response => {
        this.deudores = response.data
        this.deudoresCargados = true
      });
    },
    topProductos(){
      axios.get(Config.API_URL + 'reporte/topProductos').then(response => {
        this.productos = response.data
        this.productosCargados = true
      });
    },
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
    this.productosMes()
    this.repartosMes()
    this.clientesZona()
    this.repartosZona()
    this.repartosDia()
    this.topClientes()
    this.topDeudores()
    this.topProductos()
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
    graficos1:[
      {
        id: 1,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "green",
        titulo: "Ventas por mes"
      },
      {
        id: 2,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Bar",
        color: "blue",
        titulo: "Productos vendidos por mes"
      },
      {
        id: 3,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "orange",
        titulo: "Repartos realizados por mes"
      }
    ],
    graficos2:[
      {
        id: 1,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "green",
        titulo: "Clientes por zona"
      },
      {
        id: 2,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "blue",
        titulo: "Repartos por zona"
      },
      {
        id: 3,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "orange",
        titulo: "Repartos por dia"
      }
    ],
    clientes:{},
    clientesCargados: false,
    deudores:{},
    deudoresCargados: false,
    productos:{},
    productosCargados: false,
  }
} 
};

</script>
