
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { CY_CIRCLE_CONTENT } from "../constants/cy-constants"

describe('test fibonacci page', () => {
  beforeEach(() => {
    cy.visit('/fibonacci')
    cy.clock()
  })

  it('button should be disabled when input is empty', () => {
    cy.get('form').within(() => {
      cy.get('input').clear()
      cy.get('button').should('be.disabled')
    })
  })

  it('should be generate correct numbers', () => {
    const numbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377,
                      610, 987, 1597, 2584, 4181 , 6765]
    
    cy.get('form').within(() => {
      cy.get('input').type('19')
      cy.get('button').should('not.be.disabled').click()
    })              
    
    cy.tick(SHORT_DELAY_IN_MS*20)
    cy.get(CY_CIRCLE_CONTENT)
      .should('have.length', 20)
      .each((element, index) => {
        cy.wrap(element).contains(numbers[index])
      })
  })
})