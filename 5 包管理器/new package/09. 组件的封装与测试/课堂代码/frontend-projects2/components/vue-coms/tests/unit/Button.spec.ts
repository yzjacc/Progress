import { mount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button.vue", () => {
  it("renders button with default type", () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain("duyi-button");
    expect(wrapper.classes()).toContain("duyi-button-default");
  });

  it("renders button with correct type", () => {
    const wrapper = mount(Button, { props: { type: "primary" } });
    expect(wrapper.classes()).toContain("duyi-button");
    expect(wrapper.classes()).toContain("duyi-button-primary");
  });

  it("renders button with plain style", () => {
    const wrapper = mount(Button, { props: { plain: true } });
    expect(wrapper.classes()).toContain("is-plain");
  });

  it("renders button with round style", () => {
    const wrapper = mount(Button, { props: { round: true } });
    expect(wrapper.classes()).toContain("is-round");
  });

  it("renders button with circle style", () => {
    const wrapper = mount(Button, { props: { circle: true } });
    expect(wrapper.classes()).toContain("is-circle");
  });

  it("renders button with disabled state", () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    expect(wrapper.classes()).toContain("is-disabled");
    expect(wrapper.attributes()).toHaveProperty("disabled");
  });

  it("renders button with icon", () => {
    const wrapper = mount(Button, { props: { icon: "home" } });
    expect(wrapper.find("i").classes()).toContain("duyi-icon-home");
  });

  it("renders button with slot content", () => {
    const wrapper = mount(Button, { slots: { default: "Click Me" } });
    expect(wrapper.text()).toContain("Click Me");
  });

  it("emits click event when button is clicked", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
