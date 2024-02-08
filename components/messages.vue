<template>
  <div class="mt-10">
    <div
      class="border-b border-[#535F891a] py-2.5 flex items-center justify-between mb-4 relative"
    >
      <div class="flex items-center gap-14 text-sm">
        <div class="text-robin-orange cursor-pointer">Direct Messages</div>
        <div
          class="absolute bottom-0 left-0 bg-robin-orange w-[116px] h-[2px]"
        ></div>
        <div class="cursor-pointer hover:text-robin-orange">Groups</div>
      </div>
      <div class="flex items-center gap-4 relative">
        <div class="cursor-pointer" @click="showFilterModal = true">
          <SvgoFilter class="text-subtle-blue text-lg" />
        </div>
        <input
          class="border border-[#C1CEC8] outline-none text-dark-03 bg-[#ffffff8a] rounded-md px-6 w-64 py-2.5"
          type="text"
          placeholder="Search..."
        />
        <SvgoLens class="absolute right-3 top-3.5 text-[#000] text-lg" />
      </div>
    </div>
  </div>
  <div class="bg-white border border-[#E7E9FF] rounded-md">
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>Users</th>
          <th>Messages Sent</th>
          <th>Media Storage Used</th>
          <th>Date Created</th>
          <th>Media Sent</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="loadingMessages">
        <tr v-for="item in 10" :key="item">
          <td>
            <div class="pulse skeleton w-20 h-5"></div>
          </td>
          <td>
            <div class="pulse skeleton w-16 h-5"></div>
          </td>
          <td>
            <div class="pulse skeleton w-16 h-5"></div>
          </td>
          <td>
            <div class="pulse skeleton w-16 h-5"></div>
          </td>
          <td>
            <div class="pulse skeleton w-16 h-5"></div>
          </td>
          <td>
            <div class="pulse skeleton w-6 h-5"></div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(message, i) in messages.data" :key="i">
          <td>
            {{ message.full_name }}
          </td>
          <td>
            {{ message.message_sent }}
          </td>
          <td>{{ convertBytesToMB(message.media_storage_used) }} MB</td>
          <td>
            {{ convertDate(message.date_created) }}
          </td>
          <td>
            {{ message.media_sent }}
          </td>
          <td>
            <div class="relative" id="ellipsis">
              <SvgoEllipsis class="cursor-pointer" @click.stop="showModal(i)" />
              <div
                v-if="currentIndex === i"
                ref="modal"
                class="absolute top-4 right-0 bg-white border border-[#F5F7FC] rounded-md shadow w-44 z-20 text-sm"
              >
                <div
                  class="text-dark-02 cursor-pointer flex items-center justify-between px-4 py-2.5"
                >
                  <div>View</div>
                  <SvgoEye />
                </div>
                <hr />
                <div
                  class="text-[#D53120] cursor-pointer flex items-center justify-between px-4 py-2.5"
                >
                  <div>Disable</div>
                  <SvgoXcircle />
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <TableFooter :data="messages" @paginate="paginate" />
  </div>
  <FilterModal v-if="showFilterModal" @closeModal="showFilterModal = false" />
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const currentRoute = router.currentRoute.value;
let loadingMessages = ref(true);
let messages = ref({
  data: [],
  limit: 10,
});
let currentIndex = ref(null);
let modal = ref(null);
let showFilterModal = ref(false);

onMounted(() => {
  fetchMessages(currentRoute.query.page, currentRoute.query.limit);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const fetchMessages = async (page = 1, limit = 10) => {
  loadingMessages.value = true;
  try {
    const response = await $fetch(
      `https://sfe-m3if.onrender.com/api/v1/messages?page=${page}&limit=${limit}`
    );
    if (response) {
      messages.value = response;
      loadingMessages.value = false;
    }
  } catch (e) {
    console.log(e);
  }
};

const convertBytesToMB = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(1);
};

const convertDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const paginate = (page) => {
  fetchMessages(page);
  router.push({
    query: {
      page: page,
    },
  });
};

const showModal = (index) => {
  currentIndex.value = index;
};

const handleClickOutside = (e) => {
  if (modal.value && !modal.value[0].contains(e.target)) {
    currentIndex.value = null;
  }
};
</script>

<style scoped>
tr {
  @apply border-b border-[#0000001a];
}

th {
  @apply text-left py-4 px-6 text-subtle-blue text-sm font-normal uppercase;
}

th:first-child {
  @apply pl-12;
}

td {
  @apply py-4 px-6 text-[#071439] text-sm font-normal capitalize;
}

td:first-child {
  @apply pl-12;
}

.pulse {
  @apply bg-[#DDDBDD] rounded;
}
</style>
