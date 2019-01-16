import App from '../../../src/App';
import { bus } from '../../../src/EventBus';
import { mount } from '@vue/test-utils';
import card_carta from '../../../src/layouts/card_carta';
import Primeros from '../../../src/components/Primeros';


describe('card_carta.vue', () => {
  test('increments quantity when button is clicked', () => {
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],0,[''],true];

    mount(App);
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
    expect(wrapper.find('#cantidad').text()).toMatch('1');
    expect(wrapper.vm.quantity).toBe(1);

  });

  test('decremnts quantity when button is clicked', () => {
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],0,[''],true];
    const wrapper = mount(card_carta, {
      propsData: { name },
      data(){
        return{
          show: false,
          quantity: 1,
        }
      }
    });
    wrapper.find('#decrement').trigger('click');
    expect(wrapper.find('#cantidad').text()).toMatch('0');
    expect(wrapper.vm.quantity).toBe(0);
  });

  test('decremnts quantity when button is clicked and quantity is 0', () => {
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],0,[''],true];
    const wrapper = mount(card_carta, {
      propsData: { name },
      data(){
        return{
          show: false,
          quantity:0
        }
      }
    });
    wrapper.find('#decrement').trigger('click');
    expect(wrapper.find('#cantidad').text()).toMatch('0');
    expect(wrapper.vm.quantity).toBe(0);
  })
});

describe('App.vue', () => {
  test('Add plate to the order ', () => {
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
          pedido: ['10','Chuleton','35','Chuleton a la brasa',1,1]
        }
      }
    });
    expect(wrapper_app_1.html().includes('index')).toBe(true);
    expect(wrapper_app_1.find('#index').text()).toMatch('- Chuleton');

  })

  test('List products with ingredients and allogens',  async () => {

    const wrapper = mount(Primeros, {
      data(){
        return{
          items:[ {
            "id": 91,
            "nombre": "Chuletón de buey",
            "precio": 15,
            "tipo": 3,
            "descripcion": null,
            "disponible": true,
            "nombres_alergenos": ["ninguno"],
            "nombres_ingredientes": [
              "Patatas",
              "Chuletón de Buey",
              "Sal"
            ],
            "tipos": "menu2"
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

    expect(wrapper.html().includes('alergeno')).toBe(true);
    expect(wrapper.findAll('#alergeno').at('0').text()).toMatch('ninguno');




  })
});


