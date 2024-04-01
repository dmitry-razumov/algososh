import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { ElementStates } from "../../src/types/element-states"
import { CY_CIRCLE_CIRCLE, CY_CIRCLE_CONTENT } from "../constants/cy-constants"

describe('test stack page', () => {
  beforeEach(() => {
    cy.visit('/stack')
    cy.clock()
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

  it('elements should be correct add to stack', () => {
    cy.get('form').within(() => {
      cy.get('input').type('1')
      cy.get('@buttonAdd').should('not.be.disabled').click()
    })
    .tick(SHORT_DELAY_IN_MS)

    cy.get(CY_CIRCLE_CIRCLE).as('circle_circle')
    cy.get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Changing)
      cy.get(circle[0]).children().should('have.text', '1')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Default)
      cy.get(circle[0]).children().should('have.text', '1')
    })

    cy.get('form').within(() => {
      cy.get('input').type('2')
      cy.get('@buttonAdd').should('not.be.disabled').click()
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Default)
      cy.get(circle[0]).children().should('have.text', '1')
      cy.get(circle[1]).containsClass(ElementStates.Changing)
      cy.get(circle[1]).children().should('have.text', '2')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Default)
      cy.get(circle[0]).children().should('have.text', '1')
      cy.get(circle[1]).containsClass(ElementStates.Default)
      cy.get(circle[1]).children().should('have.text', '2')
    })

    cy.get('form').within(() => {
      cy.get('input').type('3')
      cy.get('@buttonAdd').should('not.be.disabled').click()
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Default)
      cy.get(circle[0]).children().should('have.text', '1')
      cy.get(circle[1]).containsClass(ElementStates.Default)
      cy.get(circle[1]).children().should('have.text', '2')
      cy.get(circle[2]).containsClass(ElementStates.Changing)
      cy.get(circle[2]).children().should('have.text', '3')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Default)
      cy.get(circle[0]).children().should('have.text', '1')
      cy.get(circle[1]).containsClass(ElementStates.Default)
      cy.get(circle[1]).children().should('have.text', '2')
      cy.get(circle[2]).containsClass(ElementStates.Default)
      cy.get(circle[2]).children().should('have.text', '3')
    })
  })

  it('elements should be correct delete from stack', () => {
    cy.get('form').within(() => {
      cy.get('input').type('1')
      .get('@buttonAdd').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('input').type('2')
      .get('@buttonAdd').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('input').type('3')
      .get('@buttonAdd').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get(CY_CIRCLE_CONTENT).as('circle_content')
    cy.get(CY_CIRCLE_CIRCLE).as('circle_circle')

    cy.get('@buttonDelete').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_circle')
      .then((circle) => {
        cy.get(circle[0]).containsClass(ElementStates.Default)
        cy.get(circle[0]).children().should('have.text', '1')
        cy.get(circle[1]).containsClass(ElementStates.Default)
        cy.get(circle[1]).children().should('have.text', '2')
        cy.get(circle[2]).containsClass(ElementStates.Changing)
        cy.get(circle[2]).children().should('have.text', '3')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_circle')
      .then((circle) => {
        cy.get(circle[0]).containsClass(ElementStates.Default)
        cy.get(circle[0]).children().should('have.text', '1')
        cy.get(circle[1]).containsClass(ElementStates.Default)
        cy.get(circle[1]).children().should('have.text', '2')
      })
      .get('@circle_content')
      .should('have.length', 2)

      cy.get('@buttonDelete').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('@buttonDelete').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('@circle_content')
      .should('have.length', 0)

      cy.get('@buttonDelete').should('be.disabled')
      cy.get('@buttonClear').should('be.disabled')
  })

  it('Button clear should be clearing stack with length eq 0', () => {
    cy.get('form').within(() => {
      cy.get('input').type('1')
      .get('@buttonAdd').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('input').type('2')
      .get('@buttonAdd').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('input').type('3')
      .get('@buttonAdd').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get(CY_CIRCLE_CONTENT).as('circle_content')

    cy.get('@buttonClear').should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .should('have.length', 0)

      cy.get('@buttonDelete').should('be.disabled')
      cy.get('@buttonClear').should('be.disabled')
  })
})