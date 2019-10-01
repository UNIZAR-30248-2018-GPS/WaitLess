import { mount } from "@vue/test-utils";
import Disponibilidad from "../../components/Disponibilidad";

describe("Disponibilidad.vue", () => {

  it("carga la página correctamente", () => {
    const msg = "Disponibilidad de la carta";
    const wrapper = mount(Disponibilidad, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
    console.log(wrapper);
  });

  it('aparece icono de carga', () => {
    const wrapper = mount(Disponibilidad);

    expect(wrapper.vm.loading).toBe(true);

  });

  it('carga plato', () => {
    const wrapper = mount(Disponibilidad);

    var plato =  [{
      disponible: false,
      id: 961,
      nombre: "Arroz tres delicias"
    }];

    wrapper.setData({platos: plato});

    expect(wrapper.vm.platos).toEqual(plato);


  })





});

