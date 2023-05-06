<template>
    <div class="content">
      <div class="md-layout">
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
          <md-card>
            <md-card-header data-background-color="green">
            <div class="md-size-100">
              <h4 class="title md-size-80">Planilla de Reparto
                <download-excel style="float: right; margin-right: 20px;"
                :data   = "this.clientesenreparto"
                :fields = "this.historicoFields"
                :name = "this.historicoName">
                <md-button class="md-button md-info md-raised" style="margin-top: 10px">
                  <md-icon>download</md-icon>
                </md-button>
              </download-excel>
              </h4>
            </div>
            </md-card-header>
            <md-card-content>
              <div>
                <md-table v-model="this.clientesenreparto" table-header-color="green">
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Nombre">{{ item.cliente }}</md-table-cell>
                    <md-table-cell md-label="Domicilio">{{ item.domicilio }}</md-table-cell>
                    <md-table-cell md-label="Compra 12L">{{item.com12}}</md-table-cell>
                    <md-table-cell md-label="Compra 20L">{{item.com20}}</md-table-cell>
                    <md-table-cell md-label="Compra Soda">{{item.comSoda}}</md-table-cell>
                    <md-table-cell md-label="Pago">{{item.pago}}$</md-table-cell>
                    <md-table-cell md-label="Fiado">{{item.fiado}}$</md-table-cell>
                    <md-table-cell md-label="Devuelve 12L">{{item.dev12}}</md-table-cell>
                    <md-table-cell md-label="Devuelve 20L">{{item.dev20}}</md-table-cell>
                    <md-table-cell md-label="Devuelve Soda">{{item.devSoda}}</md-table-cell>
                    <md-table-cell md-label="Observaciones">{{truncateText(item.observacion,15)}}</md-table-cell>
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
  
  export default {
    created() {
      this.getLineas()
    },
    data() {
      return {
        clientesenreparto: [],
        historico: {
          zona: '',
          dia: '',
          fecha: '',
          repartidor: ''
        },
        historicoName: 'Reparto_zona_' + this.$route.params.zona + '_dia_' + this.$route.params.dia + '_repartidor_'+ this.$route.params.repartidor + '_fecha_' + this.$route.params.fecha,
        historicoFields:{
          'Nombre y Apellido': 'cliente',
          'Domicilio': 'domicilio',
          'Compra 12': 'com12',
          'Compra 20': 'com20',
          'Compra Soda': 'comSoda',
          'Pago': 'pago',
          'Fiado': 'fiado',
          'Devuelve 12': 'dev12',
          'Devuelve 20': 'dev20',
          'Devuelve Soda': 'devSoda',
          'Observaciones': 'observacion'
        },
      };
    },
    methods: {
      getLineas() {
        axios({
            method: 'GET',
            url: Config.API_URL + 'historico/lineas/' + this.$route.params.idHistorico,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true"
            }
        }).then(response => {
          this.clientesenreparto = Object.freeze(response.data)
        });
      },
      truncateText(text, stop, clamp){
        if (text) {
          return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
        }
        return '-'
      }
    }
  };
  
  </script>
  
  <style>
  .title {
    font-size: 40px;
  }
  
  .md-tooltip{
    max-width: 500px !important;
    width: 400px !important;
  }
  </style>