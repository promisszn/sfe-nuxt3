import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Sidebar from "~/components/Sidebar.vue";

describe('Sidebar.vue', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(Sidebar)
    expect(wrapper.exists()).toBe(true)
  })
})
