import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { mount, unmount } from "@vue/test-utils";
import FilterModal from "~/components/filterModal.vue";

describe("FilterModal.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FilterModal);
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("emits closeModal event when Filter Table button is clicked", async () => {
    await wrapper.find(".px-8").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("closeModal");
  });

  it("emits closeModal event when Clear Filter button is clicked", async () => {
    await wrapper.find(".text-dark-03").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("closeModal");
  });

  it("sets body overflow to hidden on mount", () => {
    expect(document.body.style.overflow).toBe("hidden");
  });
});
