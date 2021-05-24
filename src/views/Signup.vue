<template>
  <b-row class="h-100" align-v="center" align-h="center">
    <b-col cols="6">
      <b-card class="shadow-sm p-3">
        <b-form @submit="onSubmit" @reset="onReset">
          <h1 class="mb-4">Kaydol</h1>
          <b-form-group class="mb-3" label="E-posta:">
            <b-form-input
              v-model="form.email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group class="mb-3" label="Kullanıcı adı:">
            <b-form-input v-model="form.username" required></b-form-input>
          </b-form-group>
          <b-form-group class="mb-3" label="Şifre:">
            <b-form-input
              v-model="form.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="mb-3"
            label="Üyelik Tipiniz"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio
              v-model="form.userType"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              value="0"
              ><span class="ms-2">Standart Paket (30$)</span></b-form-radio
            >
            <b-form-radio
              v-model="form.userType"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              value="1"
              ><span class="ms-2">Özel Paket (50$)</span></b-form-radio
            >
          </b-form-group>
          <b-form-group>
            <b-form-checkbox
              v-model="form.kvkk"
              name="checkbox-1"
              required
              value="accepted"
            >
              <a href="#" class="ms-2">Kullanıcı sözleşmesini</a> okudum kabul
              ediyorum
            </b-form-checkbox>
          </b-form-group>
          <b-button class="mt-1" type="submit" variant="primary"
            >Kaydol</b-button
          >
          <router-link to="/login">
            <b-button class="mt-1" type="submit" variant="link"
              >Giriş Yap</b-button
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
        username: "",
        password: "",
        userType: 0,
        kvkk: false,
      },
    };
  },
  methods: {
    ...mapActions(["register"]),
    async onSubmit(event) {
      event.preventDefault();
      await this.register({
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        customerType: this.form.userType,
        reportingTypeId: "609ea5cbb93b650ff017fea4",
      });
      router.go({ name: "Login" });
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
