<template>
  <div>
    <b-row class="toolbar mb-3">Beşduyu Medya</b-row>
    <b-row align-h="center">
      <b-col cols="3"
        ><b-list-group>
          <b-list-group-item
            ><router-link
              to="/pollster/surveys"
              style="text-decoration: none !important"
              >Anketler</router-link
            ></b-list-group-item
          >

          <b-list-group-item @click="logout"
            ><router-link
              to="#"
              variant="link"
              size="sm"
              style="text-decoration: none !important"
              >Çıkış Yap</router-link
            ></b-list-group-item
          >
        </b-list-group></b-col
      >
      <b-col cols="9"> <router-view /> </b-col
    ></b-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
