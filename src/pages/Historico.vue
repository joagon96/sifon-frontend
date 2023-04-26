<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card>
                <md-card-header data-background-color="green">
                <div class="md-size-100">  
                  <h4 class="title md-size-80">Historico Repartos</h4>
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
                            <md-button @click="showClientes(item.idHistorico)" class="md-icon-button md-fab md-info md-raised">
                                <md-icon>grid_on</md-icon>
                              </md-button>
                          </div>
                        </md-table-cell>
                      </md-table-row>
                    </md-table>
                  </div>
                </md-card-content>
            </md-card>
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
  },
  data() {
    return {
      repartos: [],
    };
  },
  methods: {
    showClientes(idh) {
      this.$router.push({
        name: "Historico Clientes en Reparto",
        params: {
          idHistorico: idh
        }
      })
    },
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
    },
    getHistorico () {
      axios.get(Config.API_URL + 'get/Historico',{headers: {"Authorization": localStorage.token}}).then(response => {
      this.repartos = Object.freeze(response.data);
      });
    },
    dateTime(value) {
      return moment(value).format("DD MMMM YYYY");
    },
  }
};
</script>
<style>

</style>


