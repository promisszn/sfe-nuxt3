<template>
  <div class="p-6 flex items-center justify-center gap-2">
    <button @click="paginate('prev')" :disabled="data.page === 1">
      <SvgoLeftcaret class="text-xs text-[#C4CDD5]" />
    </button>
    <!-- show first page -->
    <button @click="paginate(1)" :class="{ active: data.page == 1 }">1</button>
    <button class="!items-end">
      <SvgoEllipsis />
    </button>
    <!-- show last page -->
    <button
      @click="paginate(data.totalPages)"
      :class="{ active: data.page == data.totalPages }"
    >
      {{ data.totalPages }}
    </button>
    <button @click="paginate('next')" :disabled="data.page === data.totalPages">
      <SvgoRightcaret class="text-xs text-[#C4CDD5]" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["paginate"]);

const paginate = (page) => {
  let p = 1;
  if (page === "prev") {
    p = props.data.page - 1;
  } else if (page === "next") {
    p = props.data.page + 1;
  } else {
    p = page;
  }
  emit("paginate", p);
};
</script>

<style scoped>
button {
  @apply h-8 w-8 bg-white border border-[#DFE3E8] text-[#212B36] rounded-md flex items-center justify-center font-bold hover:border-[#0546E0] hover:text-[#0546E0] disabled:bg-[#919EAB80] disabled:border-none;
}

button:disabled {
  @apply cursor-not-allowed;
}

button:disabled svg {
  @apply text-white;
}

button.active {
  @apply border border-[#0546E0] text-[#0546E0];
}
</style>
