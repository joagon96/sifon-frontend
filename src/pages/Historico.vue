<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card>
                <md-card-header data-background-color="green">
                  <div class="md-size-80">  
                    <h4 class="title md-size-80">Historico Repartos
                      <md-button class="md-raised md-info md-size-20" style="float: right; margin-top: 10px" @click="showSearchDialog()"><md-icon>tune</md-icon> Filtros</md-button>
                    </h4>
                  </div>
                </md-card-header>

                <md-card-content>
                  <div>
                    <md-table v-model="this.repartos" table-header-color="green">
                      <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Zona">{{ item.zona }}</md-table-cell>
                        <md-table-cell md-label="Día">{{ item.dia }}</md-table-cell>
                        <md-table-cell md-label="Repartidor">{{ item.repartidor }}</md-table-cell>
                        <md-table-cell md-label="Fecha">{{ dateTime(item.fecha) }}</md-table-cell>
                        <md-table-cell md-label="Acciones">
                          <div>
                            <md-button @click="showClientes(item)" class="md-icon-button md-fab md-info md-raised">
                                <md-icon>grid_on</md-icon>
                              </md-button>
                          </div>
                        </md-table-cell>
                      </md-table-row>
                    </md-table>
                  </div>
                </md-card-content>
            </md-card>
            <div>
              <md-dialog :md-active.sync="searchDialog" style="z-index: 5;">
                <md-dialog-title>Filtrar</md-dialog-title>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                      <md-field>
                        <label>Zona</label>
                        <md-select md-dense v-model="search.zona">
                          <md-option v-for="z in zonas" :key="z.idZona" :value="z.descripcion">{{z.descripcion}}</md-option>
                        </md-select>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                          <md-field>
                            <label>Dia</label>
                            <md-select md-dense v-model="search.dia">
                              <md-option v-for="d in dias" :key="d.id" :value="d.name">{{d.name}}</md-option>
                            </md-select>
                          </md-field>
                        </div>
                    <div class="md-layout-item md-size-100">
                          <md-field>
                            <label>Repartidor</label>
                            <md-select md-dense v-model="search.repartidor">
                              <md-option v-for="r in repartidores" :key="r.idRepartidor" :value="r.nomapeRep">{{r.nomapeRep}}</md-option>
                            </md-select>
                          </md-field>
                        </div>
                    <div class="md-layout-item md-size-100">
                      <md-field>
                        <md-datepicker v-model="search.fecha" />
                      </md-field>
                    </div>
                  </div>
                </div>
                <md-dialog-actions>
                  <md-button @click="cleanSearch()">Limpiar filtros</md-button>
                  <md-button class="md-primary" @click="searchHistoricos()">Aplicar filtros</md-button>
                </md-dialog-actions>
              </md-dialog>
            </div>
        </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {Config} from '../config.js'
import moment from 'moment';
require('moment/locale/es')


export default {
  mounted() {
    this.getHistorico()
    this.getZonas()
    this.getRepartidores()
  },
  data() {
    return {
      repartos: [],
      zonas: [],
      repartidores:[],
      dias: [
        {id: 1, name: 'Lunes'},
        {id: 2, name: 'Martes' },
        {id: 3, name: 'Miercoles'},
        {id: 4, name: 'Jueves'},
        {id: 5, name: 'Viernes' },
        {id: 6, name: 'Sabado'},
        {id: 7, name: 'Domingo'}
      ],
      searchDialog: false,
      search:{
        zona: '',
        dia: '',
        repartidor: '',
        fecha: '',
      }
    };
  },
  methods: {
    showClientes(item) {
      this.$router.push({
        name: "Historico Clientes en Reparto",
        params: {
          idHistorico: item.idHistorico,
          dia: item.dia,
          fecha: item.fecha,
          repartidor: item.repartidor,
          zona: item.zona
        }
      })
    },
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
    },
    getHistorico () {
      axios.post(Config.API_URL + 'search/historico',{headers: {"Authorization": localStorage.token}}).then(response => {
      this.repartos = response.data;
      });
    },
    dateTime(value) {
      return moment(value).format("DD MMMM YYYY");
    },
    getZonas() {
      axios.get(Config.API_URL + 'getH/Zona').then(response => {
        this.zonas = Object.freeze(response.data)
      });
    },
    getRepartidores() {
      axios.get(Config.API_URL + 'getH/Repartidor').then(response => {
        this.repartidores = Object.freeze(response.data)
      });
    },
    searchHistoricos() {
      var fecha = ''
      if (this.search.fecha != ''){
        fecha = moment(this.search.fecha).format("YYYY-MM-DD")
      }
      var bodyFormData = new FormData();
      bodyFormData.append('zona', this.search.zona) ;
      bodyFormData.append('dia', this.search.dia) ;
      bodyFormData.append('repartidor', this.search.repartidor) ;
      bodyFormData.append('fecha', fecha) ;
      axios({
        method: 'POST',
        url: Config.API_URL + 'search/historico',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        this.searchDialog = false
        this.repartos = response.data;
      });
    },
    cleanSearch(){
      this.search.zona = ''
      this.search.dia = ''
      this.search.repartidor = ''
      this.search.fecha = ''
    },
    showSearchDialog(){
      this.cleanSearch()
      this.searchDialog = true
    }
  }
};
</script>


<style>

</style>


