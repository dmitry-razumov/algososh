import { DELAY_IN_MS } from "../../src/constants/delays"
import { ElementStates } from "../../src/types/element-states"

describe('test string page', () => {
  beforeEach(() => {
    cy.visit('/recursion')
    cy.clock()
  })

  it('button should be disabled when input is empty', () => {
    cy.get('form').within(() => {
      cy.get('input').clear()
      cy.get('button').should('be.disabled')
    })
  })

  it('should be correct operation and styles on every step when string reverse', () => {
    cy.get('form').within(() => {
      cy.get('input').type('abcde')
      cy.get('button').should('not.be.disabled').click()
    })

    cy.tick(DELAY_IN_MS)
    cy.get('[class^=circle_content]').should('have.length', 5)
    cy.get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[0]).children().should('have.text', 'a')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[1]).children().should('have.text', 'b')
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[3]).children().should('have.text', 'd')
      cy.get(circle[4]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[4]).children().should('have.text', 'e')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[0]).children().should('have.text', 'a')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[1]).children().should('have.text', 'b')
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[3]).children().should('have.text', 'd')
      cy.get(circle[4]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[4]).children().should('have.text', 'e')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[0]).children().should('have.text', 'e')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[1]).children().should('have.text', 'b')
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[3]).children().should('have.text', 'd')
      cy.get(circle[4]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[4]).children().should('have.text', 'a')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[0]).children().should('have.text', 'e')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[1]).children().should('have.text', 'b')
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      cy.get(circle[3]).children().should('have.text', 'd')
      cy.get(circle[4]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[4]).children().should('have.text', 'a')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[0]).children().should('have.text', 'e')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[1]).children().should('have.text', 'd')
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[3]).children().should('have.text', 'b')
      cy.get(circle[4]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[4]).children().should('have.text', 'a')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('[class^=circle_circle]')
    .then((circle) => {
      cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[0]).children().should('have.text', 'e')
      cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[1]).children().should('have.text', 'd')
      cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[3]).children().should('have.text', 'b')
      cy.get(circle[4]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      cy.get(circle[4]).children().should('have.text', 'a')
    })
  })
})