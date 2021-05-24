<template>
  <div>
    <div class="d-flex align-items-center justify-content-between pe-2">
      <h2>Anketler</h2>
    </div>

    <b-table small :fields="fields" :items="pollsterSurveys" responsive="sm">
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <!-- A custom formatted column -->
      <!-- <template #cell(title)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b
        >, <b>{{ data.value.first }}</b>
      </template> -->
      <template #cell(questions)="data">
        {{ data.item.questions.length }} soru
      </template>
      <template #cell(pollsterId)="data">
        {{ data.item.pollsterId.name }}
      </template>
      <template #cell(actions)="data">
        <b-button
          v-b-modal.update-mediaOrganType
          size="sm"
          @click="editMediaOrganType = { ...data.item }"
          >Cevap Ekle</b-button
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
      fields: [
        "_id",
        "pollsterId",
        "questions",
        "startDate",
        "endDate",
        "actions",
      ],
    };
  },
  created() {
    this.getPollsterSurveys();
  },
  methods: {
    ...mapActions(["getPollsterSurveys"]),
  },
  computed: { ...mapState(["pollsterSurveys"]) },
};
</script>