<template>
  <div>
    <div v-if="feed && feed.length > 0">
      <b-row>
        <b-col cols="4" v-for="(item, index) in feed" :key="index">
          <b-card
            :title="item.mediaTitle"
            :img-src="item.photo"
            img-alt="Image"
            img-top
          >
            <b-card-text>
              <p style="font-size: 13px">{{ item.mediaOrganId.name }}</p>
              {{ item.text.split("").slice(0, 200).join("") }}
            </b-card-text>
            <template #footer>
              <small class="text-muted">{{
                moment(item.date).fromNow()
              }}</small>
            </template>
          </b-card></b-col
        >
      </b-row>
    </div>
    <div v-else>
      Haberleri görmek için medya organlarını takip etmeyi unutmayın!
    </div>

    <div align-h="center" class="my-5">
      <center>
        <b-pagination
          v-if="feedCount"
          v-model="currentPage"
          :total-rows="feedCount"
          :per-page="perPage"
          size="sm"
        ></b-pagination>
      </center>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      perPage: 9,
      currentPage: 1,
    };
  },
  async created() {
    await this.getMeFeed({ perPage: this.perPage, page: this.currentPage - 1 });
  },
  computed: {
    ...mapState(["feed", "feedCount"]),
  },
  methods: { moment, ...mapActions(["getMeFeed"]) },
  watch: {
    async currentPage() {
      await this.getMeFeed({
        perPage: this.perPage,
        page: this.currentPage - 1,
      });
    },
  },
};
</script>
