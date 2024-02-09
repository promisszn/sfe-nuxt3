import { describe, expect, it, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import tableFooter from "~/components/tableFooter.vue";

describe("tableFooter.vue", () => {
  let wrapper;
  let mockData = {
    page: 1,
    totalPages: 5,
  };

  beforeEach(() => {
    wrapper = mount(tableFooter, {
      props: {
        data: mockData,
      },
    });
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("disables the prev button on the first page", async () => {
    const button = wrapper.find("button:first-child");
    expect(button.attributes("disabled")).toBe("");
  });

  it("disables the next button on the last page", async () => {
    await wrapper.setProps({ data: { page: 5, totalPages: 5 } });
    const button = wrapper.find("button:last-child");
    expect(button.attributes("disabled")).toBe("");
  });

  it('emits paginate event with "next" when next button is clicked', async () => {
    const button = wrapper.find("button:last-child");
    await button.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("paginate");
    expect(wrapper.emitted().paginate[0]).toEqual([2]);
  });

  it("emits paginate event with correct page number when a page button is clicked", async () => {
    const button = wrapper.findAll("button")[1]; // Assuming this is the first page button
    await button.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("paginate");
    expect(wrapper.emitted().paginate[0]).toEqual([1]);
  });
});
