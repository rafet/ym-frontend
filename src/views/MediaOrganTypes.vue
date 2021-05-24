<template>
  <div>
    <b-modal
      id="new-mediaOrganType"
      title="Yeni Medya Organ Tipi Kaydı"
      hide-footer
    >
      <b-form>
        <b-form-group label="Ad">
          <b-input size="sm" v-model="newMediaOrganType.title"></b-input>
        </b-form-group>

        <b-form-group class="mt-3">
          <b-button size="sm" @click="addMediaOrganType(newMediaOrganType)"
            >Ekle</b-button
          >
        </b-form-group>
      </b-form>
    </b-modal>
    <b-modal
      id="update-mediaOrganType"
      title="Medya Organ Tipi Düzenle"
      hide-footer
    >
      <b-form>
        <b-form-group label="Ad">
          <b-input size="sm" v-model="editMediaOrganType.title"></b-input>
        </b-form-group>

        <b-form-group class="mt-3">
          <b-button
            size="sm"
            @click="updateMediaOrganType({ ...editMediaOrganType })"
            >Düzenle</b-button
          >
        </b-form-group>
      </b-form>
    </b-modal>
    <div class="d-flex align-items-center justify-content-between pe-2">
      <h2>Media Organ Tipleri</h2>
      <b-button v-b-modal.new-mediaOrganType size="sm" variant="success">
        Yeni Ekle</b-button
      >
    </div>

    <b-table small :fields="fields" :items="mediaOrganTypes" responsive="sm">
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <!-- A custom formatted column -->
      <!-- <template #cell(title)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b
        >, <b>{{ data.value.first }}</b>
      </template> -->

      <template #cell(actions)="data">
        <b-button
          size="sm"
          class="me-2"
          variant="danger"
          @click="deleteMediaOrganType(data.item._id)"
          >Sil</b-button
        >
        <b-button
          v-b-modal.update-mediaOrganType
          size="sm"
          @click="editMediaOrganType = { ...data.item }"
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
      newMediaOrganType: {
        title: null,
      },
      editMediaOrganType: {},
      fields: ["index", "title", "actions"],
    };
  },
  async created() {
    await this.getMediaOrganTypes();
  },
  methods: {
    ...mapActions([
      "addMediaOrganType",
      "getMediaOrganTypes",
      "deleteMediaOrganType",
      "updateMediaOrganType",
    ]),
  },
  computed: {
    ...mapState(["mediaOrganTypes"]),
  },
};
</script>
