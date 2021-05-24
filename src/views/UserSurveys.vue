<template>
  <div>
    <b-modal id="new-survey" title="Yeni Anket" hide-footer>
      <b-form>
        <b-form-group label="Sorular">
          <b-form-group label="Yeni soru" class="mx-5">
            <b-input size="sm" v-model="newSurvey.name"></b-input>
            <center>
              <b-button
                size="sm"
                pill
                variant="dark"
                class="mt-2"
                @click="
                  () => {
                    newSurvey.questions.push(newSurvey.name);
                    newSurvey.name = '';
                  }
                "
                >Ekle</b-button
              >
            </center>
            <ul class="survey-questions">
              <li v-for="(question, index) in newSurvey.questions" :key="index">
                <p>{{ question }}</p>
                <span
                  @click="
                    newSurvey.questions.splice(
                      newSurvey.questions.indexOf(question),
                      1
                    )
                  "
                >
                  <b-icon icon="x"></b-icon>
                </span>
              </li>
            </ul>
          </b-form-group>
        </b-form-group>
        <hr />
        <b-form-group class="mb-3" label="Anket Başlangıç Tarihi">
          <b-form-datepicker
            :min="minDate"
            label-no-date-selected="Tarih seçilmedi"
            v-model="newSurvey.startDate"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group label="Anket Bitiş Tarihi">
          <b-form-datepicker
            :min="minDate"
            label-no-date-selected="Tarih seçilmedi"
            v-model="newSurvey.endDate"
          ></b-form-datepicker>
        </b-form-group>
        <hr />
        <b-form-group class="mt-3">
          <b-button
            size="sm"
            @click="_addSurvey({ ...newSurvey, customerId: customerId })"
            variant="success"
            >Oluştur</b-button
          >
        </b-form-group>
        <b-alert variant="danger" show v-if="error" class="mt-3"
          >Anket yapabilecek müsait bir anketör bulunmamaktadır.</b-alert
        >
      </b-form>
    </b-modal>
    <div class="d-flex align-items-center justify-content-between pe-2">
      <h2>Anketlerim</h2>
      <b-button size="sm" variant="success" v-b-modal.new-survey>
        Yeni oluştur</b-button
      >
    </div>
    <b-table small :fields="fields" :items="surveys" responsive="sm">
      <template #cell(startDate)="data">
        <i>{{
          new Date(data.item.startDate).toLocaleDateString() +
          " " +
          new Date(data.item.startDate).toLocaleTimeString()
        }}</i>
      </template>
      <template #cell(endDate)="data">
        <i>{{
          new Date(data.item.endDate).toLocaleDateString() +
          " " +
          new Date(data.item.endDate).toLocaleTimeString()
        }}</i>
      </template>
      <template #cell(questions)="data">
        <i>{{ data.item.questions.map((x) => x.text).join(", ") }}</i>
      </template>
      <template #cell(pollsterId)="data">
        <i>{{ data.item.pollsterId.name }}</i>
      </template>
      <template #cell(actions)="data">
        <b-button
          @click="deleteSurvey(data.item._id)"
          size="sm"
          class="me-2"
          variant="danger"
          >Sil</b-button
        >
        <b-button
          @click="downloadSurveyResults(data.item._id)"
          size="sm"
          class="me-2"
          variant="light"
          >Sonuçları İndir</b-button
        >
      </template>
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      minDate: new Date(),
      error: false,
      fields: [
        "_id",
        "pollsterId",
        "questions",
        "startDate",
        "endDate",
        "actions",
      ],
      newSurvey: {
        questions: [],
        startDate: new Date(),
        endDate: null,
      },
    };
  },
  created() {
    this.getMeSurveys();
  },
  computed: {
    ...mapState(["surveys"]),
    ...mapGetters(["customerId", "token"]),
  },
  methods: {
    ...mapActions(["addSurvey", "getMeSurveys", "deleteSurvey"]),
    downloadSurveyResults(surveyId) {
      axios({
        url: "http://localhost:8080/v1.0/surveys/" + surveyId + "/results",
        headers: {
          Authorization: "Bearer " + this.token,
        },
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Anket Sonucu.txt");
        document.body.appendChild(link);
        link.click();
      });
    },
    async _addSurvey(payload) {
      try {
        await this.addSurvey(payload);
      } catch (error) {
        console.log(error);
        if (error.status === 400) this.error = true;
      }
    },
  },
};
</script>

<style lang="scss">
.survey-questions {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    p {
      margin: 0;
    }
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

    &:last-child {
      border-bottom: 0;
    }
    span {
      cursor: pointer;
      transition: 200ms;
      &:hover {
        color: rgb(155, 42, 42);
      }
    }
  }
}
</style>
