import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { ElementStates } from "../../src/types/element-states"
import { CY_CIRCLE_CIRCLE, CY_CIRCLE_CONTENT } from "../constants/cy-constants"

describe('test queue page', () => {
  beforeEach(() => {
    cy.visit('/queue')
    cy.clock()
    cy.get(CY_CIRCLE_CONTENT).as('circle_content')
    cy.get(CY_CIRCLE_CIRCLE).as('circle_circle')
    cy.get('button').contains('Добавить').parent().as('buttonAdd')
    cy.get('button').contains('Удалить').parent().as('buttonDelete')
    cy.get('button').contains('Очистить').parent().as('buttonClear')
  })

  it('button should be disabled when input is empty', () => {
    cy.get('form').within(() => {
      cy.get('input').clear()
      cy.get('@buttonAdd').should('be.disabled')
    })
  })

  it('elements should be correct add to queue', () => {
    cy.get('@circle_content')
      .each((element, index) => {
        cy.get('@circle_circle').containsClass(ElementStates.Default)
        cy.get('@circle_circle').children().should('have.text', '')
        if (index === 0) cy.wrap(element).contains('head')
        if (index === 0) cy.wrap(element).contains('tail')
      })

    cy.get('form').within(() => {
      cy.get('input').type('1')
      cy.get('@buttonAdd').click()
      .tick(SHORT_DELAY_IN_MS)
    })
    .get('@circle_content')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 0) cy.wrap(element).contains('tail')
    })
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[0]).containsClass(ElementStates.Changing)
      cy.get(circle[0]).children().should('have.text', '')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[0]).containsClass(ElementStates.Default)
      cy.get(circle[0]).children().should('have.text', '1')
    })

    cy.get('form').within(() => {
      cy.get('input').type('2')
      cy.get('@buttonAdd').click()
      .tick(SHORT_DELAY_IN_MS)
    })
    .get('@circle_content')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 0) cy.wrap(element).contains('tail')
    })
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[1]).containsClass(ElementStates.Changing)
      cy.get(circle[1]).children().should('have.text', '')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[1]).containsClass(ElementStates.Default)
      cy.get(circle[1]).children().should('have.text', '2')
    })
    .get('@circle_content')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 1) cy.wrap(element).contains('tail')
    })

    cy.get('form').within(() => {
      cy.get('input').type('3')
      cy.get('@buttonAdd').click()
      .tick(SHORT_DELAY_IN_MS)
    })
    .get('@circle_content')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 1) cy.wrap(element).contains('tail')
    })
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[2]).containsClass(ElementStates.Changing)
      cy.get(circle[2]).children().should('have.text', '')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[2]).containsClass(ElementStates.Default)
      cy.get(circle[2]).children().should('have.text', '3')
    })
    .get('@circle_content')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 2) cy.wrap(element).contains('tail')
    })
  })

  it('elements should be correct delete from queue', () => {
    cy.get('form').within(() => {
      cy.get('input').type('1')
      cy.get('@buttonAdd').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('input').type('2')
      cy.get('@buttonAdd').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('input').type('3')
      cy.get('@buttonAdd').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('@buttonDelete').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })
    .get('@circle_content')
    .each((element, index) => {
      if (index === 1) cy.wrap(element).contains('head')
      if (index === 2) cy.wrap(element).contains('tail')
    })
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[0]).containsClass(ElementStates.Default)
      cy.get(circle[0]).children().should('have.text', '')
    })

    cy.get('form').within(() => {
      cy.get('@buttonDelete').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })
    .get('@circle_content')
    .each((element, index) => {
      if (index === 2) cy.wrap(element).contains('head')
      if (index === 2) cy.wrap(element).contains('tail')
    })
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[1]).containsClass(ElementStates.Default)
      cy.get(circle[1]).children().should('have.text', '')
    })

    cy.get('form').within(() => {
      cy.get('@buttonDelete').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })
    .get('@circle_content')
    .each((element, index) => {
      if (index === 2) cy.wrap(element).contains('head')
      if (index === 2) cy.wrap(element).contains('tail')
    })
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[2]).containsClass(ElementStates.Default)
      cy.get(circle[2]).children().should('have.text', '')
    })

    cy.get('form').within(() => {
      cy.get('@buttonAdd').should('be.disabled')
      cy.get('@buttonDelete').should('be.disabled')
      cy.get('@buttonClear').should('not.be.disabled')
    })
  })

  it('queue should be correct clear when click clear button', () => {
    cy.get('form').within(() => {
      cy.get('input').type('1')
      cy.get('@buttonAdd').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('input').type('2')
      cy.get('@buttonAdd').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('input').type('3')
      cy.get('@buttonAdd').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('@buttonClear').click()
      .tick(SHORT_DELAY_IN_MS)
    })

    cy.get('@circle_content')
      .each((element, index) => {
        if (index === 0) cy.wrap(element).contains('head')
        if (index === 0) cy.wrap(element).contains('tail')
      })
    .get('@circle_circle')
    .then(circle => {
      cy.get(circle[0]).containsClass(ElementStates.Default)
      cy.get(circle[0]).children().should('have.text', '')
      cy.get(circle[1]).containsClass(ElementStates.Default)
      cy.get(circle[1]).children().should('have.text', '')
      cy.get(circle[2]).containsClass(ElementStates.Default)
      cy.get(circle[2]).children().should('have.text', '')
    })

    cy.get('form').within(() => {
      cy.get('@buttonAdd').should('be.disabled')
      cy.get('@buttonDelete').should('be.disabled')
      cy.get('@buttonClear').should('not.be.disabled')
    })
  })
})