<template>
  <div>
    <b-row class="toolbar mb-3"> Beşduyu Medya {{ r }} </b-row>
    <b-row align-h="center">
      <b-col cols="3" v-if="!['Login', 'Signup', 'PollsterLogin'].includes(r)"
        ><b-list-group>
          <b-list-group-item
            ><router-link to="/admin/customers"
              >Müşteriler</router-link
            ></b-list-group-item
          >
          <b-list-group-item
            ><router-link to="/admin/media-organs"
              >Medya Organları</router-link
            ></b-list-group-item
          >
          <b-list-group-item
            ><router-link to="/admin/media-organ-types"
              >Medya Organ Tipleri</router-link
            ></b-list-group-item
          >
          <b-list-group-item
            ><router-link to="/admin/pollsters"
              >Anketörler</router-link
            ></b-list-group-item
          >
          <b-list-group-item
            ><router-link to="/admin/reports"
              >Raporlar</router-link
            ></b-list-group-item
          >
        </b-list-group></b-col
      >
      <b-col cols="9">
        <router-view />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import router from "./router";
export default {
  computed: {
    r() {
      return router.currentRoute.name;
    },
  },
};
</script>
