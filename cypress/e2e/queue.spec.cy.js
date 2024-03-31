import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { ElementStates } from "../../src/types/element-states"

describe('test queue page', () => {
  beforeEach(() => {
    cy.visit('/queue')
    cy.clock()
  })

  it('button should be disabled when input is empty', () => {
    cy.get('form').within(() => {
      cy.get('input').clear()
      cy.get('button').contains('Добавить').parent().should('be.disabled')
    })
  })

  it('elements should be correct add to queue', () => {
    cy.get('[class^=circle_content]')
      .each((element, index) => {
        cy.get('[class^=circle_circle]').invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
        cy.get('[class^=circle_circle]').children().should('have.text', '')
        if (index === 0) cy.wrap(element).contains('head')
        if (index === 0) cy.wrap(element).contains('tail')
      })

    cy.get('form').within(() => {
      cy.get('input').type('1')
      cy.get('button').contains('Добавить').parent().click()
      .tick(SHORT_DELAY_IN_MS)
    })
    .get('[class^=circle_content]')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 0) cy.wrap(element).contains('tail')
    })
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[0]).children().should('have.text', '')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[0]).children().should('have.text', '1')
    })

    cy.get('form').within(() => {
      cy.get('input').type('2')
      cy.get('button').contains('Добавить').parent().click()
      .tick(SHORT_DELAY_IN_MS)
    })
    .get('[class^=circle_content]')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 0) cy.wrap(element).contains('tail')
    })
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[1]).children().should('have.text', '')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[1]).children().should('have.text', '2')
    })
    .get('[class^=circle_content]')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 1) cy.wrap(element).contains('tail')
    })

    cy.get('form').within(() => {
      cy.get('input').type('3')
      cy.get('button').contains('Добавить').parent().click()
      .tick(SHORT_DELAY_IN_MS)
    })
    .get('[class^=circle_content]')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 1) cy.wrap(element).contains('tail')
    })
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[2]).children().should('have.text', '')
    })
    .tick(SHORT_DELAY_IN_MS)
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[2]).children().should('have.text', '3')
    })
    .get('[class^=circle_content]')
    .each((element, index) => {
      if (index === 0) cy.wrap(element).contains('head')
      if (index === 2) cy.wrap(element).contains('tail')
    })
  })

  it('elements should be correct delete from queue', () => {
    cy.get('form').within(() => {
      cy.get('input').type('1')
      cy.get('button').contains('Добавить').parent().click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('input').type('2')
      cy.get('button').contains('Добавить').parent().click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('input').type('3')
      cy.get('button').contains('Добавить').parent().click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('button').contains('Удалить').parent().click()
      .tick(SHORT_DELAY_IN_MS*2)
    })
    .get('[class^=circle_content]')
    .each((element, index) => {
      if (index === 1) cy.wrap(element).contains('head')
      if (index === 2) cy.wrap(element).contains('tail')
    })
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[0]).children().should('have.text', '')
    })

    cy.get('form').within(() => {
      cy.get('button').contains('Удалить').parent().click()
      .tick(SHORT_DELAY_IN_MS*2)
    })
    .get('[class^=circle_content]')
    .each((element, index) => {
      if (index === 2) cy.wrap(element).contains('head')
      if (index === 2) cy.wrap(element).contains('tail')
    })
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[1]).children().should('have.text', '')
    })

    cy.get('form').within(() => {
      cy.get('button').contains('Удалить').parent().click()
      .tick(SHORT_DELAY_IN_MS*2)
    })
    .get('[class^=circle_content]')
    .each((element, index) => {
      if (index === 2) cy.wrap(element).contains('head')
      if (index === 2) cy.wrap(element).contains('tail')
    })
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[2]).children().should('have.text', '')
    })

    cy.get('form').within(() => {
      cy.get('button').contains('Добавить').parent().should('be.disabled')
      cy.get('button').contains('Удалить').parent().should('be.disabled')
      cy.get('button').contains('Очистить').parent().should('not.be.disabled')
    })
  })

  it('queue should be correct clear when click clear button', () => {
    cy.get('form').within(() => {
      cy.get('input').type('1')
      cy.get('button').contains('Добавить').parent().click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('input').type('2')
      cy.get('button').contains('Добавить').parent().click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('input').type('3')
      cy.get('button').contains('Добавить').parent().click()
      .tick(SHORT_DELAY_IN_MS*2)
    })

    cy.get('form').within(() => {
      cy.get('button').contains('Очистить').parent().click()
      .tick(SHORT_DELAY_IN_MS)
    })

    cy.get('[class^=circle_content]')
      .each((element, index) => {
        if (index === 0) cy.wrap(element).contains('head')
        if (index === 0) cy.wrap(element).contains('tail')
      })
    .get('[class^=circle_circle]')
    .then(circle => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[0]).children().should('have.text', '')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[1]).children().should('have.text', '')
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[2]).children().should('have.text', '')
    })

    cy.get('form').within(() => {
      cy.get('button').contains('Добавить').parent().should('be.disabled')
      cy.get('button').contains('Удалить').parent().should('be.disabled')
      cy.get('button').contains('Очистить').parent().should('not.be.disabled')
    })
  })
})