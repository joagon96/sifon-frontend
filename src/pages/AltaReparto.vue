<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title" v-if="this.idEdit">Editar Reparto</h4>
              <h4 class="title" v-else>Crear Reparto</h4>
              <p class="category">Completar datos</p>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">

                <div class="md-layout-item md-small-size-100 md-size-50">
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                      <md-field>
                        <label>Repartidor</label>
                        <md-select md-dense v-model="newReparto.idRepartidor">
                          <md-option v-for="r in repartidores" :key="r.idRepartidor" :value="r.idRepartidor">{{r.nomapeRep}}</md-option>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                </div>

                <div class="md-layout-item md-small-size-100 md-size-50">
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                      <md-field>
                        <label>Zona</label>
                        <md-select md-dense v-model="newReparto.idZona">
                          <md-option v-for="z in zonas" :key="z.idZona" :value="z.idZona">{{z.descripcion}}</md-option>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                </div>

                <div class="md-layout-item md-small-size-100 md-size-100">
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                      <md-field>
                        <label for="movie">Día</label>
                        <md-select md-dense v-model="newReparto.dia">
                          <md-option v-for="d in dias" :key="d.id" :value="d.name">{{d.name}}</md-option>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                </div>

              </div>
              
             <div class="md-layout-item md-size-100 text-right">
                <md-dialog-alert
                  :md-active.sync="first"
                  md-title="Reparto Creado"
                  md-content="Nueva planilla de reparto creada."
                  md-confirm-text="Aceptar"
                    />
                <md-dialog-alert
                  :md-active.sync="second"
                  md-title="Reparto Modificado"
                  md-content="Planilla de reparto modificada"
                  md-confirm-text="Aceptar"
                    />
                <md-button class="md-raised md-success" v-if="this.idEdit" @click="editReparto(), second = true">Editar</md-button>
                <md-button class="md-raised md-success" v-else @click="createReparto()">Crear</md-button>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Config} from '../config.js'

export default {
  name: 'DialogAlert',
  created() {
    this.getZonas()
    this.getRepartidores()
    var idRuta = this.$route.params.idSelected
    this.idEdit = idRuta
    if (idRuta) {
      axios.get(Config.API_URL + 'get/RepartoTotal/'+idRuta).then(response => {
      console.log(response.data)
        var rep = Object.freeze(response.data[0])
        this.newReparto.idZona = rep.idZona
        this.newReparto.idRepartidor = rep.idRepartidor
        this.newReparto.nomapeRep = rep.nomapeRep
        this.newReparto.descripcion = rep.descripcion
        this.newReparto.dia = rep.dia
      });
    }
  },
  methods: {
    createReparto() {
      var bodyFormData = new FormData();
      bodyFormData.append('idZona', this.newReparto.idZona);
      bodyFormData.append('idRepartidor', this.newReparto.idRepartidor);
      bodyFormData.append('dia', this.newReparto.dia);
      axios({
          method: 'POST',
          url: Config.API_URL + 'post/upReparto',
          data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          }
      }).then(response => {
        this.first = true
        this.newReparto.idZona = ''
        this.newReparto.idRepartidor = ''
        this.newReparto.dia = ''
        console.log(response.data);
      });
    },
    editReparto() {
      var bodyFormData = new FormData();
      bodyFormData.append('idReparto', this.idEdit);
      bodyFormData.append('dia', this.newReparto.dia);
      bodyFormData.append('idRepartidor', this.newReparto.idRepartidor);
      bodyFormData.append('idZona', this.newReparto.idZona);
      axios({
        method: 'PUT',
        url: Config.API_URL + 'update/modReparto',
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      }).then(response => {
        this.second = true
        console.log(response.data);
      });
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
  },
  data() {
    return {
      first: false,
      second:false,
      repartidores: [],
      zonas: [],
      dias: [
        {id: 1, name: 'Lunes'},
        {id: 2, name: 'Martes' },
        {id: 3, name: 'Miercoles'},
        {id: 4, name: 'Jueves'},
        {id: 5, name: 'Viernes' },
        {id: 6, name: 'Sabado'},
        {id: 7, name: 'Domingo'}
      ],
      newReparto: {
        idZona: null,
        idRepartidor: null,
        nomapeRep: null,
        descripcion: null,
        dia: null
      }
    };
  }
};
</script>
<style>
.box {
  background-color: #c8c8c8; 
}
</style>

