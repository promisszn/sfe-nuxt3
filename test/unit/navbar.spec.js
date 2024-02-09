import { describe, expect, it, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Navbar from "~/components/navbar.vue";

describe("Navbar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Navbar);
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the correct greeting", () => {
    const greeting = wrapper.find(".text-subtle-blue");
    expect(greeting.text()).toBe("Hello Ayomide! 👋🏼");
  });

  it("has a download report button", () => {
    const button = wrapper.find("button");
    expect(button.text()).toBe("Download Report");
  });
});
