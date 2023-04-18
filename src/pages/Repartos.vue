<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card>
                <md-card-header data-background-color="green">
                <div class="md-size-100">  
                <h4 class="title md-size-80">Repartos
                    <md-button href="#/altaReparto" style="float: right" class="md-raised md-info">Crear</md-button>
                </h4>
                <!--<p class="category">Here is a subtitle for this table</p>-->
                </div>
                </md-card-header>

                <md-card-content>
                  <div>
                    <md-table v-model="this.repartos" table-header-color="green">
                      <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Zona">{{ item.idZona }}</md-table-cell>
                        <md-table-cell md-label="Día">{{ item.dia }}</md-table-cell>
                        <md-table-cell md-label="Repartidor">{{ item.idRepartidor }}</md-table-cell>
                        <md-table-cell md-label="Estado">{{ item.estado }}</md-table-cell>
                        <md-table-cell md-label="Acciones">
                          <div>
                            <md-button class="md-icon-button md-fab md-warning md-raised" @click="editReparto(item.idReparto)">
                              <md-icon>edit</md-icon>
                            </md-button>
                          </div>
                          <div>
                            <md-dialog-confirm
                              :md-active.sync="activePopup"
                              :md-backdrop="false"
                              md-title = "¿Eliminar Reparto?"
                              md-content = "El reparto se borrara de la base de datos"
                              md-confirm-text="Eliminar"
                              md-cancel-text="Cancelar"
                              @md-confirm="deleteReparto()"
                              />
                              <md-button class="md-icon-button md-fab md-danger md-raised clickable" @click="changeId(item.idReparto)">
                                <md-icon>delete_forever</md-icon>
                              </md-button>
                          </div>
                          <div>
                            <md-button @click="showClientes(item.idZona, item.descripcion, item.idReparto)" class="md-icon-button md-fab md-info md-raised">
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

export default {
  mounted() {
    this.getRepartos()
  },
  data() {
    return {
      repartos: [],
      activePopup: false
    };
  },
  methods: {
    showClientes(idz, dz, idr) {
      this.$router.push({
        name: "Clientes en Reparto",
        params: {
          idZona: idz,
          zonaSelected: dz,
          idReparto: idr
        }
      })
    },
    iraPlanilla(){
      this.$router.push({name: "Planilla Reparto"})
    },
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
      },
    editReparto(idReparto) {
      this.$router.push({
        name: "Alta Reparto",
        params: {
          idSelected: idReparto
        }
      })
    },
    deleteReparto () {
      var bodyFormData = new FormData();
      bodyFormData.append('idReparto', this.idDeleted) ;
      axios({
        method: 'DELETE',
        url: Config.API_URL + 'delete/delReparto',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        console.log(response.data);
        this.getRepartos()
      });
    },
    getRepartos () {
      axios.get(Config.API_URL + 'get/Reparto',{headers: {"Authorization": localStorage.token}}).then(response => {
      console.log(response.data);
      this.repartos = Object.freeze(response.data);
      });
    }
  }
};
</script>
<style>

</style>


