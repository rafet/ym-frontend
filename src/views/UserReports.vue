<template>
  <div>
    <b-modal
      v-if="reportPeriod"
      id="change-report-period"
      title="Rapor Periodunu Değiştir"
      hide-footer
    >
      <p class="my-4">
        <b-form-group label="Period (Saat)">
          <b-form-input
            style="width: 100%"
            v-model="reportPeriod"
            type="range"
            min="1"
            max="23"
          ></b-form-input>
          <p>
            {{ reportPeriod }}
          </p>
        </b-form-group>
        <b-button
          @click="savePeriod"
          block
          class="mt-4"
          variant="success"
          pill
          size="sm"
          >Kaydet</b-button
        >
      </p>
    </b-modal>
    <b-button variant="link" v-b-modal.change-report-period class="mb-4"
      >Özel Rapor Periodunu Değiştir</b-button
    >
    <b-row>
      <b-col
        cols="4"
        v-for="(item, index) in reports"
        :key="index"
        class="mb-3"
      >
        <b-card border-variant="dark" align="center">
          <b-card-text>
            {{
              item.period === "D"
                ? "Günlük Rapor"
                : item.period === "W"
                ? "Haftalık Rapor"
                : item.period === "M"
                ? "Aylık Rapor"
                : item.period === "P"
                ? "Özel Rapor"
                : null
            }}
            <p style="font-size: 12px">
              {{ moment(item.date).lang("tr").format("MMMM Do YYYY, h:mm") }}
            </p>
          </b-card-text>
          <b-button variant="link" size="sm" @click="downloadReport(item)">
            <b-spinner small v-if="item.downloading"></b-spinner>
            <b-icon
              v-else
              icon="file-earmark-arrow-down"
              aria-hidden="true"
            ></b-icon>

            İndir</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      reportPeriod: null,
    };
  },
  async created() {
    const x = await this.getReportsByUserId(this.customer._id);
    this.reportPeriod = this.customer.reportPeriod;
    console.log(x);
  },
  computed: {
    ...mapState(["reports"]),
    ...mapGetters(["customer", "token"]),
  },
  methods: {
    moment,
    ...mapActions(["getReportsByUserId", "getReport", "changePeriod"]),
    async downloadReport(report) {
      report.downloading = true;
      // const res = await this.getReport(reportId);
      axios({
        url: "http://localhost:8080/v1.0/reports/" + report._id,
        headers: {
          Authorization: "Bearer " + this.token,
        },
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          report.period === "D"
            ? "Günlük Rapor"
            : report.period === "W"
            ? "Haftalık Rapor"
            : report.period === "M"
            ? "Aylık Rapor"
            : report.period === "P"
            ? "Özel Rapor"
            : "" + report.date + ".txt"
        );
        document.body.appendChild(link);
        link.click();
        report.downloading = false;
      });
    },
    async savePeriod() {
      await this.changePeriod({
        customerId: this.customer._id,
        reportPeriod: this.reportPeriod,
      });
      this.$bvModal.hide("change-report-period");
    },
  },
};
</script>
