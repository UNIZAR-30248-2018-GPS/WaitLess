import { mount } from "@vue/test-utils";
import Pedidos from "../../components/Pedidos";

describe("Pedidos.vue", () => {

  it("carga la página correctamente", () => {
    const msg = "Pedidos";
    const wrapper = mount(Pedidos, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
    console.log(wrapper);
  });

  it('carga pedidos', () => {
    const wrapper = mount(Pedidos);

    expect(
      wrapper.findAll('[jest="card"]').wrappers.length
    ).toBe(0);

    wrapper.setData({wsData: [{mesa: "2",
      num_pedido: 1291,
      item: [{nombre: "Kas Limon", cantidad: 1, id: 11601, comentario: "", estado: 0}]}]});

    expect(
      wrapper.findAll('[jest="card"]').wrappers.length
    ).toBe(1);

  })


});

