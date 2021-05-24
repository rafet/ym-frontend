<template>
  <div>
    <div class="d-flex align-items-center justify-content-between pe-2">
      <h2>Raporlar</h2>
      <b-button size="sm" variant="success"> Yeni Ekle</b-button>
    </div>
    <b-table small :fields="fields" :items="items" responsive="sm">
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <!-- A custom formatted column -->
      <!-- <template #cell(name)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b
        >, <b>{{ data.value.first }}</b>
      </template> -->

      <template #cell(actions)>
        <b-button size="sm" class="me-2" variant="danger">Sil</b-button>
        <b-button size="sm" class="me-2">Düzenle</b-button>
        <b-button size="sm" variant="success">İndir</b-button>
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ["index", "customer", "date", "actions"],
      items: [
        { index: 0, customer: "Hürriyet", date: "wfagsjdkfa" },
        { index: 1, customer: "Kafa", date: "wfagsjdkfa" },
        { index: 2, customer: "Milliyet", date: "wfagsjdkfa" },
      ],
    };
  },
};
</script>
