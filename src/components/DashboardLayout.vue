<template>
  <div class="flex h-screen bg-white font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden bg-gray-100">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="mx-auto px-5">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";

export default defineComponent({
  components: {
    Header,
    Sidebar,
  },
});
</script>
