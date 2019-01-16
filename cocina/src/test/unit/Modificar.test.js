import { mount } from "@vue/test-utils";
import Modificar from "../../components/Modificar";

describe("Modificar.vue", () => {

  it("carga la página correctamente", () => {
    const msg = "Modificar carta";
    const wrapper = mount(Modificar, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
    console.log(wrapper);
  });

  it('carga platos y bebidas', () => {
    const wrapper = mount(Modificar);

    var plato = [{
      disponible: true,
      id: 91,
      nombre: "Chuletón de buey",
      nombres_alergenos: [],
      nombres_ingredientes: ["Patatas","Chuletón de Buey","Sal"],
      precio: 15,
      tipo: 3,
      tipos: "menu2"
    }]

    expect(
      wrapper.findAll('[jest="card"]').wrappers.length
    ).toBe(0);

    wrapper.setData({platos: plato});

    expect(
      wrapper.findAll('[jest="card"]').wrappers.length
    ).toBe(1);

  })


});

