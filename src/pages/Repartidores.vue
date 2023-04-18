<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card>
                <md-card-header data-background-color="green">
                <div class="md-size-100">  
                <h4 class="title md-size-80">Repartidores Registrados
                    <md-button href="#/altaRepartidor" style="float: right" class="md-raised md-info">Crear</md-button>
                </h4>
                <!--<p class="category">Here is a subtitle for this table</p>-->
                </div>

                </md-card-header>
                <md-card-content>
                  <div>
                    <md-table v-model="this.repartidores" table-header-color="green">
                      <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Nombre">{{ item.nomapeRep }}</md-table-cell>
                        <md-table-cell md-label="Teléfono">{{ item.telefonoRep }}</md-table-cell>
                        <md-table-cell md-label="Acciones">
                          <div>
                            <md-button class="md-icon-button md-fab md-warning md-raised" @click="editRepartidor(item.idRepartidor)">
                              <md-icon>edit</md-icon>
                            </md-button>
                          </div>
                          <div>
                            <md-dialog-confirm
                              :md-active.sync="activePopup"
                              :md-backdrop="false"
                              md-title = "¿Eliminar Repartidor?"
                              md-content = "El repartidor se borrará de la base de datos."
                              md-confirm-text="Eliminar"
                              md-cancel-text="Cancelar"
                              @md-confirm="deleteRepartidor()"
                              />
                              <md-button class="md-icon-button md-fab md-danger md-raised" @click="changeId(item.idRepartidor)">
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
  name: 'DialogConfirm',
  mounted() {
    this.getRepartidores()
  },
  data() {
    return {
      idDeleted: Number,
      repartidores: [],
      activePopup: false,
      value: null
    };
  },
  methods: {
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
    },
    editRepartidor(idRepartidor) {
      this.$router.push({
        name: "Alta Repartidor",
        params: {
          idSelected: idRepartidor
        }
      })
    },
    deleteRepartidor() {
      var bodyFormData = new FormData();
      bodyFormData.append('idRepartidor', this.idDeleted) ;
      axios({
        method: 'DELETE',
        url: Config.API_URL + 'delete/delRepartidor',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        console.log(response.data);
        this.getRepartidores()
      });
    },
    getRepartidores () {
      axios.get(Config.API_URL + 'get/Repartidor',{headers: {"Authorization": localStorage.token}}).then(response => {
        console.log(response.data);
        this.repartidores = Object.freeze(response.data);
      });
    }
  }
};
</script>