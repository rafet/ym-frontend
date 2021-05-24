<template>
  <div class="px-2">
    <component :is="layout">
      <!-- <default-layout /> -->
    </component>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "user") + "-layout";
    },
  },
  async created() {
    await this.getMe();
  },
  methods: {
    ...mapActions(["getMe"]),
  },
};
</script>
<style lang="scss">
.toolbar {
  background: rgb(73, 73, 255);
  padding: 16px;
  padding-left: 30px;
  color: white;
  font-weight: 600;
}
</style>
