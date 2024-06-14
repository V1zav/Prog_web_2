// tests/unit/AboutPage.spec.js
import { shallowMount } from '@vue/test-utils'
import AboutPage from '@/components/About.vue'

describe('AboutPage.vue', () => {
  it('renders the about page content', () => {
    const wrapper = shallowMount(AboutPage)
    expect(wrapper.find('h1').text()).toBe('About Page')
    expect(wrapper.find('p').text()).toBe('This is the about page of our contact management application. Here you can find information about the purpose of the application, its features, and the team behind its development.')
  })
})
