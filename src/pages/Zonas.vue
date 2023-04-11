<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card>
                <md-card-header data-background-color="green">
                <div class="md-size-100">  
                <h4 class="title md-size-80">Zonas Registradas
                    <md-button href="#/altaZona" style="float:right" class="md-raised md-info">Crear</md-button>
                </h4>
                <!--<p class="category">Here is a subtitle for this table</p>-->
                </div>

                </md-card-header>
                <md-card-content>
                  <div>
                    <md-table v-model="this.zonas" table-header-color="green">
                      <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Zona">{{ item.descripcion }}</md-table-cell>
                        <md-table-cell md-label="Acciones">                         
                          <div>
                            <md-button class="md-icon-button md-fab md-warning md-raised" @click="editZona(item.idZona)">
                              <md-icon>edit</md-icon>
                            </md-button>
                          </div>
                          <div>
                          <md-dialog-confirm
                            :md-active.sync="activePopup"
                            :md-backdrop="false"
                            md-title = "¿Eliminar Zona?"
                            md-content = "La zona se borrará de la base de datos. Si algún cliente pertenece a esta zona en la planilla figurará un espacio en blanco."
                            md-confirm-text="Aceptar"
                            md-cancel-text="Cancelar"
                            @md-confirm="deleteZona()"
                            />
                            <md-button class="md-icon-button md-fab md-danger md-raised" @click="changeId(item.idZona)">
                              <md-icon>delete_forever</md-icon>
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

export default {
  mounted() {
    this.getZonas()
  },
  data() {
    return {
      idDeleted: Number,
      zonas: [],
      activePopup: false
    };
  },
  methods: {
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
    },
    editZona(idZona) {
      this.$router.push({
        name: "Alta Zona",
        params: {
          idSelected: idZona
        }
      })
    },
    deleteZona (idZona) {
      var bodyFormData = new FormData();
      bodyFormData.append('idZona', this.idDeleted) ;
      axios({
        method: 'DELETE',
        url: Config.API_URL + 'delete/delZona',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        console.log(response.data);
        this.getZonas()
      });
    },
    getZonas () {
      axios.get(Config.API_URL + 'get/Zona').then(response => {
      console.log(response.data);
      this.zonas = Object.freeze(response.data);
      });
    }
  }
};
</script>
