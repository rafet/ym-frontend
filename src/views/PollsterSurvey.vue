<template>
  <div v-if="singleSurvey">
    <p>
      <b>{{ singleSurvey.customerId.username }}</b> adına
      <b
        >{{ moment(singleSurvey.startDate).lang("tr").format("lll") }} -
        {{ moment(singleSurvey.endDate).lang("tr").format("lll") }}
      </b>
      tarhileri arasında düzenlenmiş anketin sonuçları.
    </p>
    <b-form>
      <b-form-group label="Anketi Dolduran Kişinin Adı Soyadı">
        <b-input v-model="form.username"></b-input>
      </b-form-group>
      <b-form-group label="Anketi Dolduran Kişinin Emaili">
        <b-input v-model="form.email"></b-input>
      </b-form-group>
      <hr />
      <b-form-group
        v-for="(item, index) in singleSurvey.questions"
        :label="item.text"
        :key="index"
      >
        <b-textarea v-model="item.answer"></b-textarea>
      </b-form-group>
      <b-button variant="success" @click="_addAnswer" class="mt-4"
        >Ekle</b-button
      >
    </b-form>
    <hr />
    <b-table small :fields="fields" :items="_answers" responsive="sm">
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(surveyId)="data">
        {{ data.item.surveyId._id }}
      </template>
      <template #cell(actions)="data">
        <b-button
          size="sm"
          variant="danger"
          @click="deleteAnswer(data.item._id)"
          >Sil</b-button
        >
      </template>

      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
    <hr />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      form: {
        username: null,
        email: null,
        answers: [],
      },
    };
  },
  methods: {
    moment,
    _addAnswer() {
      this.addAnswer({
        ...this.form,
        surveyId: this.singleSurvey._id,
        answers: this.singleSurvey.questions.map((x) => {
          return {
            questionId: x._id,
            answer: x.answer,
          };
        }),
      });
    },
    ...mapActions([
      "getSinglePollsterSurveys",
      "addAnswer",
      "getAnswer",
      "deleteAnswer",
    ]),
  },
  computed: {
    fields() {
      return [
        "_id",
        "username",
        "email",
        "surveyId",
        ...this.singleSurvey.questions.map((x) => x.text),
        "actions",
      ];
    },
    _answers() {
      return this.singleSurvey.answers.map((x) => {
        const answers = x.answers;

        const questions = x.surveyId.questions;

        const qa = Object.fromEntries(
          answers.map((a, index) => [questions[index].text, a.answer])
        );
        return { ...x, ...qa };
      });
    },
    ...mapState(["singleSurvey"]),
  },
  async created() {
    await this.getSinglePollsterSurveys(this.$route.params.id);
    await this.getAnswer(this.$route.params.id);
  },
};
</script>