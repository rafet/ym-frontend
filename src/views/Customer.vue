<template>
  <div class="customer">
    <h4>{{ customer.username }}</h4>
    <h6>{{ customer.email }}</h6>
    <p>Şirket</p>

    <hr />
    <h6>Medya Organları</h6>
    <b-table
      small
      :fields="mediaOrganFileds"
      :items="customer.mediaOrgans"
      responsive="sm"
    >
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <!-- A custom formatted column -->
      <!-- <template #cell(name)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b
        >, <b>{{ data.value.first }}</b>
      </template> -->

      <!-- <template #cell(actions)>
        <b-button size="sm">Detay</b-button>
      </template> -->

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
    <hr />
    <h6>Raporlar</h6>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaOrganFileds: ["index", "name", "type"],
      customer: {
        username: "rafettopcu",
        email: "rafet1998@gmail.com",
        userType: 0,
        reportType: 0,
        mediaOrgans: [
          { index: 0, name: "Hürriyet", type: 0 },
          { index: 1, name: "Kafa", type: 1 },
          { index: 2, name: "Milliyet", type: 0 },
        ],
      },
    };
  },
};
</script>
<style lang="scss">
.customer {
}
</style>
