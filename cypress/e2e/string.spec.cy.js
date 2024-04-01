import { DELAY_IN_MS } from "../../src/constants/delays"
import { ElementStates } from "../../src/types/element-states"
import { CY_CIRCLE_CIRCLE, CY_CIRCLE_CONTENT } from "../constants/cy-constants"

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

    cy.get(CY_CIRCLE_CONTENT).as('circle_content')
    cy.get(CY_CIRCLE_CIRCLE).as('circle_circle')

    cy.get('@circle_content').should('have.length', 5)
    cy.get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Default)
      cy.get(circle[0]).children().should('have.text', 'a')
      cy.get(circle[1]).containsClass(ElementStates.Default)
      cy.get(circle[1]).children().should('have.text', 'b')
      cy.get(circle[2]).containsClass(ElementStates.Default)
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).containsClass(ElementStates.Default)
      cy.get(circle[3]).children().should('have.text', 'd')
      cy.get(circle[4]).containsClass(ElementStates.Default)
      cy.get(circle[4]).children().should('have.text', 'e')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Changing)
      cy.get(circle[0]).children().should('have.text', 'a')
      cy.get(circle[1]).containsClass(ElementStates.Default)
      cy.get(circle[1]).children().should('have.text', 'b')
      cy.get(circle[2]).containsClass(ElementStates.Default)
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).containsClass(ElementStates.Default)
      cy.get(circle[3]).children().should('have.text', 'd')
      cy.get(circle[4]).containsClass(ElementStates.Changing)
      cy.get(circle[4]).children().should('have.text', 'e')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Modified)
      cy.get(circle[0]).children().should('have.text', 'e')
      cy.get(circle[1]).containsClass(ElementStates.Default)
      cy.get(circle[1]).children().should('have.text', 'b')
      cy.get(circle[2]).containsClass(ElementStates.Default)
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).containsClass(ElementStates.Default)
      cy.get(circle[3]).children().should('have.text', 'd')
      cy.get(circle[4]).containsClass(ElementStates.Modified)
      cy.get(circle[4]).children().should('have.text', 'a')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Modified)
      cy.get(circle[0]).children().should('have.text', 'e')
      cy.get(circle[1]).containsClass(ElementStates.Changing)
      cy.get(circle[1]).children().should('have.text', 'b')
      cy.get(circle[2]).containsClass(ElementStates.Default)
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).containsClass(ElementStates.Changing)
      cy.get(circle[3]).children().should('have.text', 'd')
      cy.get(circle[4]).containsClass(ElementStates.Modified)
      cy.get(circle[4]).children().should('have.text', 'a')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Modified)
      cy.get(circle[0]).children().should('have.text', 'e')
      cy.get(circle[1]).containsClass(ElementStates.Modified)
      cy.get(circle[1]).children().should('have.text', 'd')
      cy.get(circle[2]).containsClass(ElementStates.Default)
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).containsClass(ElementStates.Modified)
      cy.get(circle[3]).children().should('have.text', 'b')
      cy.get(circle[4]).containsClass(ElementStates.Modified)
      cy.get(circle[4]).children().should('have.text', 'a')
    })

    cy.tick(DELAY_IN_MS)
    cy.get('@circle_circle')
    .then((circle) => {
      cy.get(circle[0]).containsClass(ElementStates.Modified)
      cy.get(circle[0]).children().should('have.text', 'e')
      cy.get(circle[1]).containsClass(ElementStates.Modified)
      cy.get(circle[1]).children().should('have.text', 'd')
      cy.get(circle[2]).containsClass(ElementStates.Modified)
      cy.get(circle[2]).children().should('have.text', 'c')
      cy.get(circle[3]).containsClass(ElementStates.Modified)
      cy.get(circle[3]).children().should('have.text', 'b')
      cy.get(circle[4]).containsClass(ElementStates.Modified)
      cy.get(circle[4]).children().should('have.text', 'a')
    })
  })
})