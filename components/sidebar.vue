<template>
  <div
    class="w-[270px] h-screen bg-white overflow-x-hidden overflow-y-auto scrollbar sticky top-0 left-0 pl-8 pr-3 pt-8"
    :class="{ 'w-[70px]': isCollapsed }"
  >
    <div class="pl-2">
      <div class="flex items-center justify-between mb-2">
        <img
          class="w-[120px] h-[30px] object-contain"
          src="@/assets/img/robin.svg"
          alt="logo"
        />
        <div
          class="bg-tone-blue w-9 h-9 rounded-full flex items-center justify-center"
        >
          <SvgoCompress class="text-dark-02" />
        </div>
      </div>
      <div class="text-xs text-dark-03">App Name</div>
    </div>
    <div class="my-10 pl-2">
      <ul class="flex flex-col gap-8">
        <li>
          <NuxtLink to="">
            <SvgoCircuit />
            <span>Get Started</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            <SvgoAnalytics />
            <span>Analytics</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/chat">
            <SvgoChat />
            <span>Chat</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="">
            <SvgoSilence />
            <span>Moderation</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="">
            <SvgoLightbulb />
            <span>API & Auth Keys</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="">
            <SvgoBell />
            <span>Announcement</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="">
            <SvgoSettings />
            <span>Settings</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="w-[90%] border-t border-[#d3d7ea66] mb-6"></div>
    <div
      @click="toggleSidebar"
      class="sidebar-item mb-16 text-subtle-blue hover:text-robin-orange"
    >
      <SvgoArrowleft />
      <span v-show="!isCollapsed">Collapse</span>
    </div>
    <div class="sidebar-item mb-8 text-[#D53120]">
      <SvgoComment />
      <span>Give Feedback</span>
    </div>
  </div>
</template>

<script setup>
let isCollapsed = ref(false);

let toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  console.log(isCollapsed.value);
};
</script>

<style scoped>
a {
  @apply flex items-center gap-4 text-subtle-blue font-light transition-all duration-300 cursor-pointer;
}

a:hover {
  @apply text-robin-orange font-normal;
}

.router-link-exact-active {
  @apply text-robin-orange font-normal;
}

.sidebar-item {
  @apply flex items-center gap-4 cursor-pointer font-light transition-all duration-300 pl-4;
}
</style>
