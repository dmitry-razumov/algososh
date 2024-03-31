import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { ElementStates } from "../../src/types/element-states"

describe('test stack page', () => {
  beforeEach(() => {
    cy.visit('/stack')
    cy.clock()
  })

  it('button should be disabled when input is empty', () => {
    cy.get('form').within(() => {
      cy.get('input').clear()
      cy.get('button').contains('Добавить').parent().should('be.disabled')
    })
  })

  it('elements should be correct add to stack', () => {
    
    cy.get('form').within(() => {
      cy.get('input').type('1')
      cy.get('button').contains('Добавить').parent().should('not.be.disabled').click()
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[0]).children().should('have.text', '1')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[0]).children().should('have.text', '1')
    })

    cy.get('form').within(() => {
      cy.get('input').type('2')
      cy.get('button').contains('Добавить').parent().should('not.be.disabled').click()
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[0]).children().should('have.text', '1')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[1]).children().should('have.text', '2')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[0]).children().should('have.text', '1')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[1]).children().should('have.text', '2')
    })

    cy.get('form').within(() => {
      cy.get('input').type('3')
      cy.get('button').contains('Добавить').parent().should('not.be.disabled').click()
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[0]).children().should('have.text', '1')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[1]).children().should('have.text', '2')
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[2]).children().should('have.text', '3')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[0]).children().should('have.text', '1')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[1]).children().should('have.text', '2')
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[2]).children().should('have.text', '3')
    })
  })

  it('elements should be correct delete from stack', () => {
    cy.get('form').within(() => {
      cy.get('input').type('1')
      .get('button').contains('Добавить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('input').type('2')
      .get('button').contains('Добавить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('input').type('3')
      .get('button').contains('Добавить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('button').contains('Удалить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_circle]')
      .then((circle) => {
        cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
        cy.get(circle[0]).children().should('have.text', '1')
        cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
        cy.get(circle[1]).children().should('have.text', '2')
        cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        cy.get(circle[2]).children().should('have.text', '3')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_circle]')
      .then((circle) => {
        cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
        cy.get(circle[0]).children().should('have.text', '1')
        cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
        cy.get(circle[1]).children().should('have.text', '2')
      })
      .get('[class^=circle_content]')
      .should('have.length', 2)

      cy.get('button').contains('Удалить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('button').contains('Удалить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('[class^=circle_content]')
      .should('have.length', 0)

      cy.get('button').contains('Удалить').parent().should('be.disabled')
      cy.get('button').contains('Очистить').parent().should('be.disabled')
  })

  it('Button clear should be clearing stack with length eq 0', () => {
    cy.get('form').within(() => {
      cy.get('input').type('1')
      .get('button').contains('Добавить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('input').type('2')
      .get('button').contains('Добавить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
      .get('input').type('3')
      .get('button').contains('Добавить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('button').contains('Очистить').parent().should('not.be.disabled').click()
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .should('have.length', 0)

      cy.get('button').contains('Удалить').parent().should('be.disabled')
      cy.get('button').contains('Очистить').parent().should('be.disabled')
  })
})