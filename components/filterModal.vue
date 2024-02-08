<template>
  <div class="modal-container">
    <div class="modal-content">
      <div class="content">
        <div class="modal-top mb-6">
          <p class="text-lg">Filter Table</p>

          <div
            class="rounded-full h-7 w-7 bg-tone-blue flex items-center justify-center"
          >
            <SvgoClose
              class="cursor-pointer text-[#D53120]"
              @click="closeModal"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center gap-4">
            <div
              class="px-4 py-1.5 border border-robin-orange text-robin-orange bg-[#FFF1E9] rounded-3xl text-xs cursor-pointer"
            >
              Today
            </div>
            <div
              class="px-4 py-1.5 border border-[#EFF1F6] text-[#131316] rounded-3xl text-xs cursor-pointer"
            >
              Last 7 days
            </div>
            <div
              class="px-4 py-1.5 border border-[#EFF1F6] text-[#131316] rounded-3xl text-xs cursor-pointer"
            >
              This month
            </div>
            <div
              class="px-4 py-1.5 border border-[#EFF1F6] text-[#131316] rounded-3xl text-xs cursor-pointer"
            >
              Last 3 months
            </div>
          </div>
          <div class="flex flex-col gap-4 my-8">
            <div class="flex gap-4">
              <div class="form-group">
                <label for="date_from">Date From</label>
                <input type="date" name="" id="" />
              </div>
              <div class="form-group">
                <label for="date_to">Date To</label>
                <input type="date" name="" id="" />
              </div>
            </div>
            <div class="form-group">
              <label for="messages">Messages</label>
              <select name="" id="">
                <option value="" selected disabled>Please Select</option>
                <option value="0-500">0 - 500 Messages</option>
                <option value="500-2000">500 - 2000 Messages</option>
                <option value="2000+">2000+ Messages</option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Media Storage Used</label>
              <select name="" id="">
                <option value="" selected disabled>Please Select</option>
                <option value="0-50">0 - 50MB</option>
                <option value="50-200">50MB - 200MB</option>
                <option value="200-1GB">200MB - 1GB</option>
                <option value="1GB+">1GB+</option>
              </select>
            </div>
          </div>
          <div
            class="absolute bottom-16 left-24 flex flex-col items-center gap-8"
          >
            <button
              class="px-8 py-2 bg-robin-blue text-white rounded-3xl text-sm w-80"
              @click="closeModal"
            >
              Filter Table
            </button>
            <button class="text-dark-03 text-sm" @click="closeModal">
              Clear Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});
</script>

<style scoped>
.modal-container {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background: #fff;
  width: 500px;
  position: relative;
  overflow-y: scroll;
  transition: min-width 0.3s ease;
}

.content {
  padding-block: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-inline: auto;
}

.modal-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.form-group {
  @apply text-sm w-full;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input,
select {
  padding: 0.75rem 1rem;
  border: 1px solid #9999bc;
  border-radius: 0.25rem;
  background: #f5f7fc;
  outline: none;
}
</style>
