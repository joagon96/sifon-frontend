<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
          <div class="md-size-100">  
            <h4 class="title md-size-80">Clientes Registrados
              <md-button href="#/altaCliente" style="float: right;" class="md-raised md-info">Crear</md-button>
            </h4>
          </div>

          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="this.clientes" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Nombre">{{ item.nomapeCli }}</md-table-cell>
                  <md-table-cell md-label="Domicilio">{{ item.domicilio }}</md-table-cell>
                  <md-table-cell md-label="Teléfono">{{ item.telefonoCli }}</md-table-cell>
                  <md-table-cell md-label="Zona">{{ item.idZona }}</md-table-cell>
                  <md-table-cell md-label="Acciones">
                    <div>
                      <md-button class="md-icon-button md-fab md-warning md-raised" @click="editCliente(item.idCliente)">
                        <md-icon>edit</md-icon>
                      </md-button>
                    </div>
                    <div>
                      <md-dialog-confirm
                        :md-active.sync="activePopup"
                        :md-backdrop="false"
                        md-title = "¿Eliminar Cliente?"
                        md-content = "El cliente se borrará de la base de datos."
                        md-confirm-text="Eliminar"
                        md-cancel-text="Cancelar"
                        @md-confirm="deleteCliente()"
                        />
                        <md-button class="md-icon-button md-fab md-danger md-raised" @click="changeId(item.idCliente)">
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
    this.getClientes()
  },
  data() {
    return  {
      idDeleted: Number, 
      clientes: [],
      activePopup: false,
      value: null
    };
  },
  methods: {
    changeId(id) {
      this.idDeleted = id
      this.activePopup = true
    },
    editCliente(idCliente) {
      this.$router.push({
        name: "Alta Cliente",
        params: {
          idSelected: idCliente
        }
      })
    },
    deleteCliente () {
      var bodyFormData = new FormData();
      bodyFormData.append('idCliente', this.idDeleted) ;
      axios({
        method: 'DELETE',
        url: Config.API_URL + 'delete/delCliente',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        console.log(response.data);
        this.getClientes()
      });
    },
    getClientes () {
      axios.get(Config.API_URL + 'get/Cliente',{headers: {"Authorization": localStorage.token}}).then(response => {
      console.log(response.data);
      this.clientes = Object.freeze(response.data);
    });
    }
  }
};

</script>

<style>
.title {
  font-size: 40px;
}
</style>
