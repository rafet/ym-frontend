<template>
  <b-row class="h-100" align-v="center" align-h="center">
    <b-col cols="6">
      <b-card class="shadow-sm p-3">
        <b-form>
          <h1 class="mb-4">Anketör Girişi</h1>

          <b-form-group class="mb-3" label="Email:">
            <b-form-input v-model="form.email" required></b-form-input>
          </b-form-group>

          <b-form-group class="mb-3" label="Şifre:">
            <b-form-input
              v-model="form.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button class="mt-1" @click="onSubmit" variant="primary"
            >Giriş Yap</b-button
          ><router-link to="/signup">
            <b-button class="mt-1" type="submit" variant="link"
              >Kaydol</b-button
            >
          </router-link>
        </b-form></b-card
      >
    </b-col></b-row
  >
</template>

<script>
import { mapActions } from "vuex";
import router from "../router";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["pollsterLogin"]),
    async onSubmit() {
      try {
        await this.pollsterLogin({ ...this.form });
        router.push({ name: "PollsterSurveys" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
body,
html {
  height: 100%;
}
</style>
