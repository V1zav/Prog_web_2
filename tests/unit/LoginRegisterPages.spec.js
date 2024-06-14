import { createApp } from 'vue';
import { shallowMount } from '@vue/test-utils';
import LoginPage from '@/components/Login.vue';
import RegisterPage from '@/components/Register.vue';
import { createStore } from 'vuex';
import router from '@/router';

// Ми не мокуємо Axios тут, оскільки це робиться в глобальному моку в вашому тестовому файлі

const store = createStore({
  state() {
    return {};
  },
  mutations: {},
  actions: {},
});

const app = createApp({
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `,
});

app.use(store);
app.use(router);

describe('LoginPage.vue', () => {
  it('calls login method on form submit', async () => {
    const loginWrapper = shallowMount(LoginPage);
    loginWrapper.setData({ email: 'test@example.com', password: 'password' });
    const loginMethod = jest.spyOn(loginWrapper.vm, 'login');

    await loginWrapper.find('form').trigger('submit');

    expect(loginMethod).toHaveBeenCalled();
  });
});

describe('RegisterPage.vue', () => {
  it('calls register method on form submit', async () => {
    const registerWrapper = shallowMount(RegisterPage);
    registerWrapper.setData({ username: 'testuser', email: 'test@example.com', password: 'password' });
    const registerMethod = jest.spyOn(registerWrapper.vm, 'register');

    await registerWrapper.find('form').trigger('submit');

    expect(registerMethod).toHaveBeenCalled();
  });
});
