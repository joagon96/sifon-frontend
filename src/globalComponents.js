import DropDown from "./components/Dropdown.vue";
import JsonExcel from 'vue-json-excel';

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
    Vue.component("downloadExcel", JsonExcel);
  }
};

export default GlobalComponents;
