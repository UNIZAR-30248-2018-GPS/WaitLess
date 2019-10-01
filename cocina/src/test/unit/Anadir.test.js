import { mount } from "@vue/test-utils";
import Anadir from "../../components/Anadir";

describe("Anadir.vue", () => {

  it("carga la página correctamente", () => {
    const msg = "Añadir a carta";
    const wrapper = mount(Anadir, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
    console.log(wrapper);
  });

});




