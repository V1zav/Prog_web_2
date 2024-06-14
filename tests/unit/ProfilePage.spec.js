import { shallowMount } from '@vue/test-utils'
import ProfilePage from '@/components/Profile.vue'

describe('ProfilePage.vue', () => {
  it('renders the profile page content', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'TestUser', email: 'test@example.com' }));
    const wrapper = shallowMount(ProfilePage);
    expect(wrapper.find('h1').text()).toBe('Profile');
    expect(wrapper.find('p:nth-of-type(1)').text()).toBe('Username: TestUser');
    expect(wrapper.find('p:nth-of-type(2)').text()).toBe('Email: test@example.com');
  });

  it('logs out user and redirects to login page', async () => {
    localStorage.setItem('token', 'test-token');
    const $router = { push: jest.fn() };
    const wrapper = shallowMount(ProfilePage, {
      global: {
        mocks: {
          $router
        }
      }
    });
    await wrapper.find('button').trigger('click');
    expect(localStorage.getItem('token')).toBe(null);
    expect(localStorage.getItem('user')).toBe(null);
    expect($router.push).toHaveBeenCalledWith('/login');
  });
});
