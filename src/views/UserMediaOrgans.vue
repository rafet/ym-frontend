<template>
  <div v-if="mediaOrgans">
    <b-tabs content-class="mt-3">
      <b-tab
        :title="key"
        v-for="([key, val], index) in groupedMediaOrgans"
        :key="index"
        ><p>
          <b-row>
            <b-col cols="3" v-for="(item, index2) in val" :key="index2">
              <b-card
                bg-variant="light"
                text-variant="dark"
                class="text-center media-organ-card"
              >
                <b-card-text
                  >{{ item.name }}
                  <p style="font-size: 12px">
                    {{ item.mediaOrganTypeId.title }}
                  </p></b-card-text
                >
                <b-button
                  size="sm"
                  variant="danger"
                  v-if="followingMediaOrgans.includes(item._id)"
                  pill
                  @click="unfollowMediaOrgan(item._id)"
                  >Takibi Bırak</b-button
                >
                <b-button
                  size="sm"
                  variant="success"
                  pill
                  v-else
                  @click="followMediaOrgan(item._id)"
                  >Takip Et</b-button
                >
              </b-card></b-col
            >
          </b-row>
        </p></b-tab
      >
    </b-tabs>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["mediaOrgans", "followingMediaOrgans"]),
    groupedMediaOrgans() {
      var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      return Object.entries(groupBy(this.mediaOrgans, "mediaOrganType"));
    },
  },
  async created() {
    await this.getMediaOrgans();
  },
  methods: {
    ...mapActions(["getMediaOrgans", "followMediaOrgan", "unfollowMediaOrgan"]),
  },
};
</script>

<style>
.media-organ-card {
  cursor: pointer;
  margin-bottom: 12px;
}
</style>
