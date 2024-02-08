<template>
  <div class="w-full h-full mx-0 overflow-y-auto overflow-x-hidden">
    <Navbar />
    <div class="container !px-20 py-6">
      <div>
        <div class="card-ctn w-full">
          <Card>
            <template #title>
              <div class="title">No of Users</div>
            </template>
            <template #value>
              <div v-if="!loading" class="value">{{ numberOfUsers }}</div>
              <div v-else class="pulse skeleton"></div>
            </template>
          </Card>
          <Card>
            <template #title>
              <div class="title">Total Message Sent</div>
            </template>
            <template #value>
              <div v-if="!loading" class="value">{{ totalMessagesSent }}</div>
              <div v-else class="pulse skeleton"></div>
            </template>
          </Card>
          <Card>
            <template #title>
              <div class="title">Total Media Storage Used</div>
            </template>
            <template #value>
              <div v-if="!loading" class="value">{{ totalStorageUsed }} MB</div>
              <div v-else class="pulse skeleton"></div>
            </template>
          </Card>
          <Card>
            <template #title>
              <div class="title">Total Media Sent</div>
            </template>
            <template #value>
              <div v-if="!loading" class="value">{{ totalMediaSent }}</div>
              <div v-else class="pulse skeleton"></div>
            </template>
          </Card>
        </div>
        <Messages />
      </div>
    </div>
  </div>
</template>

<script setup>
let numberOfUsers = ref(0);
let totalMessagesSent = ref(0);
let totalStorageUsed = ref(0);
let totalMediaSent = ref(0);
let loading = ref(true);

onMounted(() => {
  fetchDashboardData();
});

let fetchDashboardData = async () => {
  loading.value = true;
  try {
    const response = await $fetch(
      "https://sfe-m3if.onrender.com/api/v1/chat_dashboard"
    );
    if (response) {
      numberOfUsers.value = response.data.numberOfUsers;
      totalMessagesSent.value = response.data.totalMessagesSent;
      let totalStorage = response.data.totalStorageUsed;
      totalMediaSent.value = response.data.totalMediaSent;
      //convert totalStorageUsed from bytes to MB
      totalStorageUsed.value = (totalStorage / 1024 / 1024).toFixed(1);
      loading.value = false;
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
