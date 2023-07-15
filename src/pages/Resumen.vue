<template>
  <div class="content">
    <div class="md-layout">
      <div v-for="grafico in this.graficos" :key="grafico.id" class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
        <div v-if="grafico.disponible">
          <chart-card
            :chart-data="grafico"
            :chart-type="grafico.tipo"
            :data-background-color="grafico.color"
            :chart-options="grafico.options">
            <template slot="content">
              <h4 class="title">{{grafico.titulo}}</h4>
              <div v-if="grafico.legend">
                <p>
                  <span class="legend-box" style="background-color: white;"></span>
                  Bidon 12L &nbsp;&nbsp;
                  <span class="legend-box" style="background-color: red;"></span>
                  Bidon 20L &nbsp;&nbsp;
                  <span class="legend-box" style="background-color: orange;"></span>
                  Sifon Soda
                </p>
              </div>
            </template>
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
            <router-link :to="rutaZonas">
              <md-icon>my_location</md-icon>
            </router-link>
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
            <router-link :to="rutaClientes">
              <md-icon>account_circle</md-icon>
            </router-link>
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
            <router-link :to="rutaRepartidores">
              <md-icon>assignment_ind</md-icon>
            </router-link>
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
            <router-link :to="rutaRepartos">
              <md-icon>local_shipping</md-icon>
            </router-link>
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
            <router-link :to="rutaHistorico">
              <md-icon>handshake</md-icon>
            </router-link>
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
import Chartist from 'chartist';
import 'chartist-plugin-tooltip';
import 'chartist-plugin-pointlabels';

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
        this.graficos[0].labels = Object.keys(response.data);
        this.graficos[0].series.push(Object.values(response.data));
        this.graficos[0].disponible = true
      });
    },
    productosMes(){
      axios.get(Config.API_URL + 'reporte/productosxmes').then(response => {
        this.graficos[1].labels = Object.keys(response.data);
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
        this.graficos[1].series.push(bidones12);
        this.graficos[1].series.push(bidones20);
        this.graficos[1].series.push(sifones);
        this.graficos[1].disponible = true
      });
    },
    repartosMes(){
      axios.get(Config.API_URL + 'reporte/repartosxmes').then(response => {
        this.graficos[2].labels = Object.keys(response.data);
        this.graficos[2].series.push(Object.values(response.data));
        this.graficos[2].disponible = true
      });
    },
    clientesZona(){
      axios.get(Config.API_URL + 'reporte/clientesxzona').then(response => {
        this.graficos[3].labels = Object.keys(response.data);
        this.graficos[3].series.push(Object.values(response.data));
        this.graficos[3].disponible = true
      });
    },
    repartosZona(){
      axios.get(Config.API_URL + 'reporte/repartosxzona').then(response => {
        this.graficos[4].labels = Object.keys(response.data);
        this.graficos[4].series.push(Object.values(response.data));
        this.graficos[4].disponible = true
      });
    },
    repartosDia(){
      axios.get(Config.API_URL + 'reporte/repartosxdia').then(response => {
        this.graficos[5].labels = Object.keys(response.data);
        this.graficos[5].series.push(Object.values(response.data));
        this.graficos[5].disponible = true
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
    rutaZonas: "/Zonas",
    rutaClientes: "/Clientes",
    rutaRepartidores: "/Repartidores",
    rutaRepartos: "/Repartos",
    rutaHistorico: "/Historico",
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
    graficos:[
      {
        id: 1,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "green",
        titulo: "Ventas por mes",
        options:{
          chartPadding: {
              top: 30
          },
          plugins: [
            Chartist.plugins.ctPointLabels({
              textAnchor: 'middle',
              labelClass: 'custom-point-label',
            })
          ]
        }
      },
      {
        id: 2,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Bar",
        color: "blue",
        titulo: "Productos vendidos por mes",
        options:{
          chartPadding: {
              top: 30,
          },
          plugins: [
            Chartist.plugins.ctPointLabels({
              textAnchor: 'middle',
              labelClass: 'custom-point-label',
              labelOffset: {
                x: 0,
                y: 30
              },
            })
          ]
        },
        legend: true,
      },
      {
        id: 3,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "orange",
        titulo: "Repartos realizados por mes",
        options:{
          chartPadding: {
              top: 30
          },
          plugins: [
            Chartist.plugins.ctPointLabels({
              textAnchor: 'middle',
              labelClass: 'custom-point-label',
            })
          ]
        }
      },
      {
        id: 4,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "green",
        titulo: "Clientes por zona",
        options:{
          chartPadding: {
              top: 30
          },
          plugins: [
            Chartist.plugins.ctPointLabels({
              textAnchor: 'middle',
              labelClass: 'custom-point-label',
            })
          ]
        }
      },
      {
        id: 5,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "blue",
        titulo: "Repartos por zona",
        options:{
          chartPadding: {
              top: 30
          },
          plugins: [
            Chartist.plugins.ctPointLabels({
              textAnchor: 'middle',
              labelClass: 'custom-point-label',
            })
          ]
        }
      },
      {
        id: 6,
        labels: [],
        series: [],
        disponible: false,
        tipo: "Line",
        color: "orange",
        titulo: "Repartos por dia",
        options:{
          chartPadding: {
              top: 30
          },
          plugins: [
            Chartist.plugins.ctPointLabels({
              textAnchor: 'middle',
              labelClass: 'custom-point-label',
              labelInterpolationFnc: value => (value !== undefined ? value : 0)
            })
          ]
        }
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

<style>
.custom-point-label {
  color: #FFFFFF !important;
}

.legend-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 1px;
  border: 1px solid #000;
}

</style>
