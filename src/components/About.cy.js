import About from './About.vue'

describe('<About />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(About)
  })
})