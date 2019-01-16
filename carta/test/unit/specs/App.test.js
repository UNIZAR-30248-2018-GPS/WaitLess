import App from '../../../src/App';
import { bus } from '../../../src/EventBus';
import { mount } from '@vue/test-utils';
import card_carta from '../../../src/layouts/card_carta';
import Primeros from '../../../src/components/Primeros';
import Segundos from '../../../src/components/Segundos';
import Postres from '../../../src/components/Postres';
import Bebidas from '../../../src/components/Bebidas';
import PedidoFinalizado from '../../../src/components/PedidoFinalizado';

describe('card_carta.vue', () => {
  test('increments quantity when button is clicked', () => {
    localStorage.clear();
    localStorage.__STORE__ = {};
    localStorage.setItem("10",'0');
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],0,[''],true];

    mount(App);
    const wrapper = mount(card_carta, {
      propsData: { name },
      data(){
        return{
          show: false,
          quantity: localStorage.getItem("10"),
        }
      }
    });
    wrapper.find('#increment').trigger('click');
    expect(wrapper.find('#cantidad').text()).toMatch('1');
    localStorage.setItem("10",'1');
    expect(wrapper.vm.quantity).toBe(1);
    expect(localStorage.getItem("10")).toBe('1');

    const wrapper_1 = mount(card_carta, {
      propsData: { name },
      data(){
        return{
          show: false,
          quantity: localStorage.getItem("10"),
        }
      }
    });
    wrapper_1.find('#increment').trigger('click');
    expect(wrapper_1.find('#cantidad').text()).toMatch('2');
    localStorage.setItem("10",'2');
    expect(wrapper_1.vm.quantity).toBe(2);
    expect(localStorage.getItem("10")).toBe('2');

  });

  test('decremnts quantity when button is clicked', () => {
    localStorage.clear();
    localStorage.__STORE__ = {};
    localStorage.setItem("10",'0');
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],0,[''],true];
    mount(App);
    const wrapper = mount(card_carta, {
      propsData: { name },
      data(){
        return{
          show: false,
          quantity: localStorage.getItem("10"),
        }
      }
    });
    wrapper.find('#increment').trigger('click');
    expect(wrapper.find('#cantidad').text()).toMatch('1');
    localStorage.setItem("10",'1');
    expect(wrapper.vm.quantity).toBe(1);
    expect(localStorage.getItem("10")).toBe('1');

    const wrapper_1 = mount(card_carta, {
      propsData: { name },
      data(){
        return{
          show: false,
          quantity: localStorage.getItem("10"),
        }
      }
    });
    wrapper_1.find('#decrement').trigger('click');
    expect(wrapper_1.find('#cantidad').text()).toMatch('0');
    localStorage.setItem("10",'0');
    expect(wrapper_1.vm.quantity).toBe(0);
    expect(localStorage.getItem("10")).toBe('0');
  });

  test('decremnts quantity when button is clicked and quantity is 0', () => {
    localStorage.clear();
    localStorage.__STORE__ = {};
    localStorage.setItem("10",'0');
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],0,[''],true];

    const wrapper = mount(card_carta, {
      propsData: { name },
      data(){
        return{
          show: false,
          quantity:localStorage.getItem("10"),
        }
      }
    });
    wrapper.find('#decrement').trigger('click');
    expect(wrapper.find('#cantidad').text()).toMatch('0');
    expect(wrapper.vm.quantity).toBe('0');
    expect(localStorage.getItem("10")).toBe('0');
  })
});

describe('App.vue', () => {
  test('Add plate to the order ', () => {
    localStorage.clear();
    localStorage.__STORE__ = {};

    const datos = ['10','Chuleton','35','Chuleton a la brasa',1,1];
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],0,[''],true];
    localStorage.setItem("pedido",[]);
    localStorage.setItem("10",'0');

    const wrapper_app = mount(App);
    const wrapper = mount(card_carta, {
      propsData: { name },
      data(){
        return{
          show: false,
          quantity: localStorage.getItem("10"),
        }
      }
    });

    expect(wrapper_app.vm.pedido.length).toBe(0);
    expect(localStorage.getItem("pedido").length).toBe(0);

    wrapper.find('#increment').trigger('click');
    wrapper.vm.$emit('emittedEvent', datos);
    expect(wrapper.emitted().emittedEvent).toBeTruthy();
    expect(wrapper.emitted().emittedEvent.length).toBe(1);

    wrapper_app.vm.$on('emmitEvent',datos => {
      expect(wrapper_app.vm.value).toBe(datos);
      localStorage.setItem("pedido",datos);
      expect(wrapper_app.vm.pedido.length).toBe(1);
      expect(localStorage.getItem("pedido").length).toBe(1);

    });

    const wrapper_app_1= mount(App, {
      data(){
        return{
          pedido: localStorage.getItem("pedido")
        }
      }
    });
    expect(wrapper_app_1.html().includes('index')).toBe(true);
    expect(wrapper_app_1.find('#index').text()).toMatch('- Chuleton');
    expect(wrapper_app.vm.pedido.length).toBe(1);

  });

  test('List second course with ingredients and allogens',() => {

    const wrapper = mount(Segundos, {
      data(){
        return{
          items:[ {"id": 91, "nombre": "Chuletón de buey", "precio": 15, "tipo": 3, "descripcion": "",
            "disponible": true, "nombres_alergenos": [], "nombres_ingredientes": ["Patatas",
              "Chuletón de Buey", "Sal"], "tipos": "menu2"
          }]
        }
      }
    });
    expect(wrapper.html().includes('product')).toBe(true);
    expect(wrapper.find('#product').text()).toMatch('Chuletón de buey');
    expect(wrapper.html().includes('ingrediente')).toBe(true);
    expect(wrapper.findAll('#ingrediente').at('0').text()).toMatch('Patata');
    expect(wrapper.findAll('#ingrediente').at('1').text()).toMatch('Chuletón de Buey');
    expect(wrapper.findAll('#ingrediente').at('2').text()).toMatch('Sal');
    expect(wrapper.html().includes('alergeno')).toBe(false);
    expect(wrapper.find('#descrip').text()).toMatch('Descripcion:');
    expect(wrapper.find('#precio').text()).toMatch('15');

  });

  test('List first course with ingredients and allogens',() => {

    const wrapper = mount(Primeros, {
      data(){
        return{
          items:[ {"id": 311, "nombre": "Menestra de verduras", "precio": 3.7, "tipo": 2, "descripcion": "", "disponible": true,
            "nombres_alergenos": [], "nombres_ingredientes": [], "tipos": "menu1"}]
        }
      }
    });
    expect(wrapper.html().includes('product')).toBe(true);
    expect(wrapper.find('#product').text()).toMatch('Menestra de verduras');
    expect(wrapper.html().includes('ingrediente')).toBe(false);
    expect(wrapper.html().includes('alergeno')).toBe(false);
    expect(wrapper.find('#descrip').text()).toMatch('Descripcion:');
    expect(wrapper.find('#precio').text()).toMatch('3.7');


  });

  test('List desserts with ingredients and allogens', () => {

    const wrapper = mount(Postres, {
      data(){
        return{
          items:[ {"id": 1131, "nombre": "Flan de huevo", "precio": 2, "tipo": 4, "descripcion": "Con nata", "disponible": true,
            "nombres_alergenos": ["Huevos", "Lácteos"], "nombres_ingredientes": ["Nata Montada"], "tipos": "postre"
          }]
        }
      }
    });
    expect(wrapper.html().includes('product')).toBe(true);
    expect(wrapper.find('#product').text()).toMatch('Flan de huevo');
    expect(wrapper.html().includes('ingrediente')).toBe(true);
    expect(wrapper.findAll('#ingrediente').at('0').text()).toMatch('Nata Montada');

    expect(wrapper.html().includes('alergeno')).toBe(true);
    expect(wrapper.findAll('#alergeno').at('0').text()).toMatch('Huevos');
    expect(wrapper.findAll('#alergeno').at('1').text()).toMatch('Lácteos');
    expect(wrapper.find('#descrip').text()).toMatch('Descripcion: Con nata');
    expect(wrapper.find('#precio').text()).toMatch('2');

  });

  test('List drinks with ingredients and allogens', () => {

    const wrapper = mount(Bebidas, {
      data(){
        return{
          items:[{"id": 971, "nombre": "Coca Cola", "precio": 1.8, "tipo": 1, "descripcion": "330cc",
            "disponible": true, "nombres_alergenos": [], "nombres_ingredientes": [], "tipos": "bebida"}
          ]}
      }
    });
    expect(wrapper.html().includes('product')).toBe(true);
    expect(wrapper.find('#product').text()).toMatch('Coca Cola');
    expect(wrapper.html().includes('ingrediente')).toBe(false);
    expect(wrapper.html().includes('alergeno')).toBe(false);
    expect(wrapper.find('#descrip').text()).toMatch('Descripcion: 330cc');
    expect(wrapper.find('#precio').text()).toMatch('1.8');

  });

  test('Add comments on the products', () => {

    const datos = ['10','Chuleton','35','Chuleton a la brasa',1,1];
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],0,[''],true];

    const wrapper_app = mount(App);
    const wrapper = mount(card_carta, {
      propsData: { name },
      data(){
        return{
          show: false,
          quantity: 0,
        }
      }
    });
    wrapper.find('#increment').trigger('click');
    wrapper.vm.$emit('emittedEvent', datos);
    expect(wrapper.emitted().emittedEvent).toBeTruthy();
    expect(wrapper.emitted().emittedEvent.length).toBe(1);


    wrapper_app.vm.$on('emmitEvent',datos => {
      expect(wrapper_app.vm.value).toBe(datos);
      expect(wrapper_app.vm.pedido.length).toBe(1);
    });

    const wrapper_app_1= mount(App, {
      data(){
        return{
          pedido: ['10','Chuleton','35','Chuleton a la brasa',1,1],
          modelo:[]
        }
      }
    });
    expect(wrapper_app_1.html().includes('index')).toBe(true);
    expect(wrapper_app_1.find('#index').text()).toMatch('- Chuleton');

    wrapper_app_1.find('#comentario').trigger('blur');
    expect(wrapper_app_1.vm.modelo.length).toBe(1);

  });

  test('Call the waiter', () => {

    const wrapper = mount(App);
    expect(wrapper.html().includes('camarero')).toBe(true);
    wrapper.find('#camarero').trigger('click');

  });

  test('Ask the account', () => {

    const wrapper = mount(PedidoFinalizado);
    expect(wrapper.html().includes('pedirCuenta')).toBe(true);
    let cuenta = wrapper.find('#pedirCuenta').trigger('click');

  });

});


