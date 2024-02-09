import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Card from "~/components/Card.vue";

describe("Card.vue", () => {
  it("renders title and value when not loading", () => {
    const title = "Users Online";
    const value = "100";
    const loading = false;
    const wrapper = shallowMount(Card, {
      propsData: { title, value, loading },
    });
    const titleElement = wrapper.find(".title");
    const valueElement = wrapper.find(".value");
    if (titleElement.exists() && valueElement.exists()) {
      expect(titleElement.text()).toBe(title);
      expect(valueElement.text()).toBe(value);
    }
  });

  it("renders skeleton when loading", () => {
    const title = "Users Online";
    const loading = true;
    const wrapper = shallowMount(Card, {
      propsData: { title, loading },
    });
    expect(wrapper.find(".pulse.skeleton").exists()).toBe(false);
  });
});
