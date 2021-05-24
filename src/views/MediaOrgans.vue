<template>
  <div v-if="mediaOrgans">
    <b-modal
      id="new-media-organ"
      title="Yeni Medya Organı"
      v-if="mediaOrganTypes"
      hide-footer
    >
      <b-form>
        <b-form-group label="Ad">
          <b-input size="sm" v-model="newMediaOrgan.name"></b-input>
        </b-form-group>
        <b-form-group label="Tip">
          <b-form-select
            v-model="newMediaOrgan.mediaOrganTypeId"
            :options="_mediaOrganTypes"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group class="mt-3">
          <b-button size="sm" @click="addMediaOrgan(newMediaOrgan)"
            >Ekle</b-button
          >
        </b-form-group>
      </b-form>
    </b-modal>
    <b-modal
      id="update-media-organ"
      title="Yeni Medya Organı"
      v-if="mediaOrganTypes"
      hide-footer
    >
      {{ editMediaOrgan }}
      <b-form>
        <b-form-group label="Ad">
          <b-input size="sm" v-model="editMediaOrgan.name"></b-input>
        </b-form-group>
        <b-form-group label="Tip">
          <b-form-select
            v-model="editMediaOrgan.mediaOrganTypeId"
            :options="_mediaOrganTypes"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group class="mt-3">
          <b-button
            size="sm"
            @click="
              () => {
                updateMediaOrgan(editMediaOrgan);
                $forceUpdate();
              }
            "
            >Düzenle</b-button
          >
        </b-form-group>
      </b-form>
    </b-modal>
    <div class="d-flex align-items-center justify-content-between pe-2">
      <h2>Medya Organları</h2>
      <b-button size="sm" variant="success" v-b-modal.new-media-organ>
        Yeni Ekle</b-button
      >
    </div>
    <b-table small :fields="fields" :items="mediaOrgans" responsive="sm">
      <template #cell(actions)="data">
        <b-button size="sm" class="me-2" variant="danger">Sil</b-button>
        <b-button
          v-b-modal.update-media-organ
          size="sm"
          @click="editMediaOrgan = { ...data.item }"
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
      fields: ["_id", "name", "mediaOrganType", "actions"],
      editMediaOrgan: {},
      newMediaOrgan: {
        name: null,
        mediaOrganTypeId: null,
      },
    };
  },
  async created() {
    await this.getMediaOrgans();
    await this.getMediaOrganTypes();
  },
  computed: {
    _mediaOrgans() {
      return this.mediaOrgans.map((x, index) => {
        console.log(x);
        return {
          index,
          _id: x._id,
          name: x.name,
          mediaOrganType: x.mediaOrganTypeId.title,
        };
      });
    },
    _mediaOrganTypes() {
      return this.mediaOrganTypes.map((x) => {
        return {
          value: x._id,
          text: x.title,
        };
      });
    },
    ...mapState(["mediaOrgans", "mediaOrganTypes"]),
  },
  methods: {
    ...mapActions([
      "getMediaOrgans",
      "getMediaOrganTypes",
      "addMediaOrgan",
      "updateMediaOrgan",
    ]),
  },
};
</script>
