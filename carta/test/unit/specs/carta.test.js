import { mount } from '@vue/test-utils'
import card_carta from '../../../src/layouts/card_carta'
import App from '../../../src/App'
import { bus } from '../../../src/EventBus';


describe('card_carta.vue', () => {
  test('increments quantity when button is clicked', () => {
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],1,['']]
    const wrapper = mount(card_carta, {
      propsData: { name }
    });
    wrapper.find('#increment').trigger('click');
    expect(wrapper.find('#cantidad').text()).toMatch('1');
    expect(wrapper.vm.quantity).toBe(1);
  })
});

describe('card_carta.vue', () => {
  test('decremnts quantity when button is clicked', () => {
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],1,['']]
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
  })
});

describe('card_carta.vue', () => {
  test('decremnts quantity when button is clicked and quantity is 0', () => {
    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],1,['']]
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

describe('card_carta.vue', () => {
  test('Add plate to the order ', () => {

    const name = ['10','Chuleton','35','Chuleton a la brasa',['1kg de chuleton'],1,['']]
    const wrapper = mount(card_carta, {
      propsData: { name }
    });

    const datos = ['10','Chuleton','35','Chuleton a la brasa',1,1];
    wrapper.vm.$emit('emittedEvent', datos);
    expect(wrapper.emitted().emittedEvent).toBeTruthy();
    expect(wrapper.emitted().emittedEvent.length).toBe(1);

    const datos1 = ['11','Salmon','25','Salmmon a la brasa',1,1];
    wrapper.vm.$emit('emittedEvent', datos1);
    expect(wrapper.emitted().emittedEvent).toBeTruthy();
    expect(wrapper.emitted().emittedEvent.length).toBe(2);


    const wrapper_app = mount(App);
    wrapper_app.vm.$on('emmitEvent',datos1);
    //expect(wrapper_app.vm.pedido.length).toBe(1);


  })
});

describe('App.vue', () => {
  test('Add plate to the order ', () => {
    const datos = ['10','Chuleton','35','Chuleton a la brasa',1,1];
    const wrapper = mount(App)
    wrapper.vm.$on('emmitEvent',data => {
      expect(wrapper.vm.value).toBe(data);
    });




  })
});

