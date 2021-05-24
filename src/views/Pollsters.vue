<template>
  <div>
    <b-modal id="new-pollster" title="Yeni Anketör Kaydı" hide-footer>
      <b-form>
        <b-form-group label="Ad">
          <b-input size="sm" v-model="newPollster.name"></b-input>
        </b-form-group>
        <b-form-group label="Email">
          <b-input size="sm" v-model="newPollster.email"></b-input>
        </b-form-group>
        <b-form-group label="Password">
          <b-input size="sm" v-model="newPollster.password"></b-input>
        </b-form-group>

        <b-form-group class="mt-3">
          <b-button size="sm" @click="addPollster(newPollster)">Ekle</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
    <b-modal id="update-pollster" title="Anketör Düzenle" hide-footer>
      <b-form>
        <b-form-group label="Ad">
          <b-input size="sm" v-model="editPollster.name"></b-input>
        </b-form-group>

        <b-form-group class="mt-3">
          <b-button size="sm" @click="updatePollster({ ...editPollster })"
            >Düzenle</b-button
          >
        </b-form-group>
      </b-form>
    </b-modal>
    <div class="d-flex align-items-center justify-content-between pe-2">
      <h2>Anketörler</h2>
      <b-button v-b-modal.new-pollster size="sm" variant="success">
        Yeni Ekle</b-button
      >
    </div>

    <b-table small :fields="fields" :items="pollsters" responsive="sm">
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <!-- A custom formatted column -->
      <!-- <template #cell(name)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b
        >, <b>{{ data.value.first }}</b>
      </template> -->

      <template #cell(actions)="data">
        <b-button
          size="sm"
          class="me-2"
          variant="danger"
          @click="deletePollster(data.item._id)"
          >Sil</b-button
        >
        <b-button
          v-b-modal.update-pollster
          size="sm"
          @click="editPollster = { ...data.item }"
          >Düzenle</b-button
        >
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      newPollster: {
        name: null,
        email: null,
        password: null,
      },
      editPollster: {},
      fields: ["index", "name", "busy", "actions"],
      items: [
        { index: 0, name: "Anketör 1" },
        { index: 1, name: "Anketör 2" },
        { index: 2, name: "Anketor 3" },
      ],
    };
  },
  async created() {
    await this.getPollsters();
  },
  methods: {
    ...mapActions([
      "addPollster",
      "getPollsters",
      "deletePollster",
      "updatePollster",
    ]),
  },
  computed: {
    ...mapState(["pollsters"]),
  },
};
</script>
