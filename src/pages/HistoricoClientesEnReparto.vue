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
                    <md-table-cell md-label="Cliente">{{ item.cliente }}</md-table-cell>
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
          <div class="md-size-100">
              <md-button class="md-raised md-success md-size-20" style="float: right; margin-top: 10px; margin-right: 10px;" @click="resumenReparto()">Ver Resumen</md-button>
          </div>
        </div>

        <div>
        <md-dialog :md-active.sync="showResumenDialog" style="z-index: 5;">
          <md-dialog-title>Resumen</md-dialog-title>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="movie">Repartidor</label>
                  <md-input v-model="resumen.repartidor" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones comprados 12L</label>
                  <md-input v-model="resumen.com12" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones devueltos 12L</label>
                  <md-input v-model="resumen.dev12" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones comprados 20L</label>
                  <md-input v-model="resumen.com20" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Bidones devueltos 20L</label>
                  <md-input v-model="resumen.dev20" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Sifones comprados</label>
                  <md-input v-model="resumen.comSoda" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label>Sifones devueltos</label>
                  <md-input v-model="resumen.devSoda" type="number" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-50">
                <md-field>
                  <label>Pago</label>
                  <md-input v-model="resumen.pago" type="number" disabled></md-input>
                  <md-icon>attach_money</md-icon>
                </md-field>
              </div>
              <div class="md-layout-item md-size-50">
                <md-field>
                  <label>Fiado</label>
                  <md-input v-model="resumen.fiado" type="number" disabled></md-input>
                  <md-icon>attach_money</md-icon>
                </md-field>
              </div>
            </div>
          </div>
          <md-dialog-actions>
            <download-excel style="float: right; margin-right: 10px;"
                :data   = "resumenData"
                :fields = "resumenFields"
                :name = "resumenName">
                <md-button class="md-button md-success md-raised">
                  Descargar
                </md-button>
              </download-excel>
            <md-button class="md-primary" @click="closeResumenDialog()">Aceptar</md-button>
          </md-dialog-actions>
        </md-dialog>
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
        showResumenDialog: false,
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
        resumen: {
          com12: null,
          com20: null,
          comSoda: null,
          pago: null,
          fiado: null,
          dev12: null,
          dev20: null,
          devSoda: null,
          repartidor: null,
        },
        resumenData:[],
        resumenFields:{
          'Repartidor': 'repartidor',
          'Bidones 12L comprados': 'com12',
          'Bidones 20L comprados': 'com20',
          'Sifones Soda comprados': 'comSoda',
          'Pago': 'pago',
          'Fiado': 'fiado',
          'Bidones 12L devueltos': 'dev12',
          'Bidones 20L devueltos': 'dev20',
          'Sifones Soda devueltos': 'devSoda'
        },
        resumenName: 'Resumen_reparto_zona_' + this.$route.params.zona + '_dia_' + this.$route.params.dia + '_repartidor_'+ this.$route.params.repartidor + '_fecha_' + this.$route.params.fecha,
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
      getResumen() {
        axios({
            method: 'GET',
            url: Config.API_URL + 'resumen/historico/' + this.$route.params.idHistorico,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true"
            }
        }).then(response => {
          this.resumen.repartidor = response.data[0].repartidor
          this.resumen.com12 = response.data[0].com12
          this.resumen.com20 = response.data[0].com20
          this.resumen.comSoda = response.data[0].comSoda
          this.resumen.dev12 = response.data[0].dev12
          this.resumen.dev20 = response.data[0].dev20
          this.resumen.devSoda = response.data[0].devSoda
          this.resumen.pago = response.data[0].pago
          this.resumen.fiado = response.data[0].fiado
          this.resumenData = Object.freeze(response.data)
        });
      },
      resumenReparto(){
        this.getResumen()
        this.showResumenDialog = true
      },
      closeResumenDialog(){
        this.showResumenDialog = false
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
