<template>
  <div class="w-full h-full mx-0 overflow-y-auto overflow-x-hidden">
    <Navbar />
    <div class="container !px-20 py-6">
      <div>
        <div class="flex mb-2 items-center gap-4">
          <span class="text-dark-02 text-sm">Last updated 1 minute ago</span>
          <div
            @click="refreshData"
            class="flex items-center gap-2 text-robin-green text-sm cursor-pointer"
          >
            <SvgoRefresh :class="{ 'animate-spin': refresh }" />
            <span>Refresh</span>
          </div>
        </div>
        <div class="card-ctn w-full">
          <Card>
            <template #title>
              <div class="title">Users Online</div>
            </template>
            <template #value>
              <div v-if="!loading" class="value">{{ usersOnline }}</div>
              <div v-else class="pulse skeleton"></div>
            </template>
          </Card>
          <Card>
            <template #title>
              <div class="title">Users Active Today</div>
            </template>
            <template #value>
              <div v-if="!loading" class="value">{{ usersActiveToday }}</div>
              <div v-else class="pulse skeleton"></div>
            </template>
          </Card>
          <Card>
            <template #title>
              <div class="title">Users Active This Month</div>
            </template>
            <template #value>
              <div v-if="!loading" class="value">
                {{ usersActiveThisMonth }}
              </div>
              <div v-else class="pulse skeleton"></div>
            </template>
          </Card>
          <Card>
            <template #title>
              <div class="title">Peak Concurrency This Month</div>
            </template>
            <template #value>
              <div v-if="!loading" class="value">{{ peakConcurrency }}</div>
              <div v-else class="pulse skeleton"></div>
            </template>
          </Card>
          <Card>
            <template #title>
              <div class="title">Dashboard</div>
            </template>
            <template #value>
              <div v-if="!loading" class="flex items-baseline gap-1">
                <div class="value">{{ dashboardData }} GB</div>
                <span class="text-xs">of 512 GB</span>
              </div>

              <div v-else class="pulse skeleton"></div>
            </template>
          </Card>
        </div>
        <div class="border-b border-[#535F891a] my-6"></div>
        <div class="flex items-center gap-4">
          <DailyChart />
          <MonthlyChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let refresh = ref(false);
let usersOnline = ref(0);
let usersActiveToday = ref(0);
let usersActiveThisMonth = ref(0);
let peakConcurrency = ref(0);
let dashboardData = ref(0);
let loading = ref(true);

onMounted(() => {
  fetchDashboardData();
});

let refreshData = () => {
  refresh.value = true;
  fetchDashboardData();
};

let fetchDashboardData = async () => {
  loading.value = true;
  try {
    const response = await $fetch(
      "https://sfe-m3if.onrender.com/api/v1/dashboard"
    );
    if (response) {
      usersOnline.value = response.data.usersOnline;
      usersActiveToday.value = response.data.usersActiveToday;
      usersActiveThisMonth.value = response.data.usersActiveThisMonth;
      peakConcurrency.value = response.data.peakConcurrency;
      let dashboard = response.data.dashboard;
      //convert dashboardData from bytes to GB
      dashboardData.value = (dashboard / 1024 / 1024 / 1024).toFixed(0);
      loading.value = false;
      refresh.value = false;
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped>
.title {
  @apply uppercase text-xs;
}

.value {
  @apply text-2xl font-medium my-2;
}

.card-ctn {
  display: grid;
  grid-template-columns: repeat(4, 24%);
  grid-gap: 1%;
  gap: 1%;
}

.pulse {
  @apply bg-[#DDDBDD] my-2 h-8 w-16 rounded;
}
</style>
