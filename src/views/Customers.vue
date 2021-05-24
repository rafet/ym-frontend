<template>
  <div v-if="customers">
    <h2>Müşteriler</h2>

    <b-table small :fields="fields" :items="_customers" responsive="sm">
      <!-- A virtual column -->

      <template #cell(actions)="data">
        <router-link :to="{ name: 'Customer', params: { id: data.index } }"
          ><b-button size="sm">Detay</b-button></router-link
        >
      </template>
      <template #cell(customerType)="data">
        {{ data.item.customerType === 0 ? "Şahıs" : "Şirket" }}
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      fields: [
        "_id",
        "username",
        "email",
        "customerType",
        "reportingType",
        "actions",
      ],
      items: [
        {
          index: 1,
          username: "rafettopcu",
          email: "rafet1998@gmail.com",
          userType: 0,
          reportType: 0,
          mediaOrgans: [],
        },
      ],
    };
  },
  async created() {
    await this.getCustomers();
  },
  computed: {
    ...mapState(["customers"]),
    _customers() {
      return this.customers.map((x) => {
        return {
          _id: x._id,
          email: x.email,
          customerType: x.customerType,
          username: x.username,
          reportingType: x.reportingTypeId.name,
        };
      });
    },
  },
  methods: {
    ...mapActions(["getCustomers"]),
  },
};
</script>
