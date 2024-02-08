<template>
  <div
    class="bg-white border border-[#E7E9FF] p-4 text-robin-blue-light rounded-md w-2/4"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="uppercase text-xs">Monthly Active Users</div>
      <div class="flex items-center gap-3">
        <select name="" id="">
          <option value="all">All Activities</option>
          <option value="login">Login</option>
          <option value="signup">Signup</option>
        </select>
      </div>
    </div>

    <div v-if="isLoading" class="pulse skeleton"></div>
    <ClientOnly v-else>
      <apexchart
        :key="series"
        height="400px"
        width="100%"
        :options="options"
        :series="series"
      ></apexchart>
    </ClientOnly>
  </div>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
});

const isLoading = ref(true);
const options = ref({
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
    axisTicks: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    show: false,
  },
  stroke: {
    curve: "straight",
    colors: ["#15AE73"],
  },
  fill: {
    colors: ["#15AE73"],
  },
  grid: {
    show: true,
    strokeDashArray: 4,
  },
  markers: {
    size: 0,
    colors: ["#15AE73"],
  },
  tooltip: {
    marker: {
      show: false,
    },
  },
});
const series = ref([
  {
    name: "Active Users",
    data: [340, 245, 452, 247, 360, 148, 452], // Replace with your actual data
  },
]);
</script>

<style scoped>
select {
  @apply font-sora text-sm text-[#021C3E] bg-[#ededed66] rounded-md px-4 py-2 outline-none;
}

.pulse {
  @apply bg-[#DDDBDD] min-h-[415px] w-full rounded;
}
</style>
