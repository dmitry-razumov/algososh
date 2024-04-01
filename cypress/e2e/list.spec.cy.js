import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { ElementStates } from "../../src/types/element-states"
import { CY_CIRCLE_CIRCLE, CY_CIRCLE_CONTENT } from "../constants/cy-constants"

describe('test linkedlist page', () => {
  beforeEach(() => {
    cy.visit('/list')
    cy.clock()
    cy.get(CY_CIRCLE_CONTENT).as('circle_content')
    cy.get(CY_CIRCLE_CIRCLE).as('circle_circle')
    cy.get('input[placeholder="Введите значение"]').as('inputValue')
    cy.get('input[placeholder="Введите индекс"]').as('inputIndex')
    cy.get('button').contains('Добавить в head').parent().as('buttonAddToHead')
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddToTail')
    cy.get('button').contains('Добавить по индексу').parent().as('buttonAddByIndex')
    cy.get('button').contains('Удалить из head').parent().as('buttonDeleteFromHead')
    cy.get('button').contains('Удалить из tail').parent().as('buttonDeleteFromTail')
    cy.get('button').contains('Удалить по индексу').parent().as('buttonDeleteByIndex')
  })

  it('add buttons should be disabled when inputs is empty', () => {
    cy.get('@inputValue').clear()
    cy.get('@inputIndex').clear()
    cy.get('@buttonAddToHead').should('be.disabled')
    cy.get('@buttonAddToTail').should('be.disabled')
    cy.get('@buttonAddByIndex').should('be.disabled')
  })

  it('should correct render default list', () => {
    cy.get('@circle_content')
      .each((element, index) => {
        cy.get('@circle_circle').containsClass(ElementStates.Default)
        cy.get('@circle_circle').children().should('not.be.empty')
        if (index === 0) cy.wrap(element).contains('head')
        if (index === 6) cy.wrap(element).contains('tail')
      })
  })

  it('should correct add item to head', () => {
    cy.get('@inputValue').type('h123')
    cy.get('@buttonAddToHead').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('@circle_content')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(0).containsClass('circle_element')
        if (index === 0) cy.wrap(element).children().eq(1).containsClass(ElementStates.Changing)
        if (index === 0) cy.wrap(element).children().eq(1).containsClass('circle_small')
        if (index === 0) cy.wrap(element).children().eq(1).children().should('have.text', 'h123')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(0).notContainsClass('circle_element')
        if (index === 0) cy.wrap(element).children().eq(0).should('have.text', 'head')
      })
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[0]).containsClass(ElementStates.Modified)
        cy.get(circle[0]).children().should('have.text', 'h123')
      })     
  })

  it('should correct add item to tail', () => {
    cy.get('@inputValue').type('t987')
    cy.get('@buttonAddToTail').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('@circle_content')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 5) cy.wrap(element).children().eq(0).containsClass('circle_element')
        if (index === 5) cy.wrap(element).children().eq(1).containsClass(ElementStates.Changing)
        if (index === 5) cy.wrap(element).children().eq(1).containsClass('circle_small')
        if (index === 5) cy.wrap(element).children().eq(1).children().should('have.text', 't987')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .each((element, index) => {
        if (index === 6) cy.wrap(element).children().eq(0).notContainsClass('circle_element')
        if (index === 6) cy.wrap(element).children().eq(3).should('have.text', 'tail')
      })
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[6]).containsClass(ElementStates.Modified)
        cy.get(circle[6]).children().should('have.text', 't987')
      })     
  })

  it('should correct add item by index', () => {
    cy.get('@inputValue').type('5468')
    cy.get('@inputIndex').type(2)
    cy.get('@buttonAddByIndex').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('@circle_content')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(0).containsClass('circle_element')
        if (index === 0) cy.wrap(element).children().eq(1).containsClass(ElementStates.Changing)
        if (index === 0) cy.wrap(element).children().eq(1).containsClass('circle_small')
        if (index === 0) cy.wrap(element).children().eq(1).children().should('have.text', '5468')
      })
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[1]).containsClass(ElementStates.Changing)
      }) 
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(0).notContainsClass('circle_element')
        if (index === 0) cy.wrap(element).children().eq(0).should('have.text', 'head')
        if (index === 1) cy.wrap(element).children().eq(0).containsClass('circle_element')
        if (index === 1) cy.wrap(element).children().eq(1).containsClass(ElementStates.Changing)
        if (index === 1) cy.wrap(element).children().eq(1).containsClass('circle_small')
        if (index === 1) cy.wrap(element).children().eq(1).children().should('have.text', '5468')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .each((element, index) => {
        if (index === 1) cy.wrap(element).children().eq(0).notContainsClass('circle_element')
        if (index === 2) cy.wrap(element).children().eq(0).containsClass('circle_element')
        if (index === 2) cy.wrap(element).children().eq(1).containsClass(ElementStates.Changing)
        if (index === 2) cy.wrap(element).children().eq(1).containsClass('circle_small')
        if (index === 2) cy.wrap(element).children().eq(1).children().should('have.text', '5468')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .each((element, index) => {
        if (index === 2) cy.wrap(element).children().eq(0).notContainsClass('circle_element')
        if (index === 3) cy.wrap(element).children().eq(0).containsClass('circle_element')
        if (index === 3) cy.wrap(element).children().eq(1).containsClass(ElementStates.Changing)
        if (index === 3) cy.wrap(element).children().eq(1).containsClass('circle_small')
        if (index === 3) cy.wrap(element).children().eq(1).children().should('have.text', '5468')
      })
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[2]).containsClass(ElementStates.Modified)
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[2]).containsClass(ElementStates.Default)
        cy.get(circle[2]).children().should('have.text', '5468')
      })
      .get('@circle_content')
      .each((element, index) => {
        if (index === 3) cy.wrap(element).children().eq(0).notContainsClass('circle_element')
        cy.get('@circle_circle').containsClass(ElementStates.Default)
      })
  })

  it('should correct delete item from head', () => {
    cy.get('@buttonDeleteFromHead').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('@circle_content')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(3).containsClass('circle_element')
        if (index === 0) cy.wrap(element).children().eq(1).containsClass(ElementStates.Changing)
        if (index === 0) cy.wrap(element).children().eq(1).containsClass('circle_small')
        
      })
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[1]).containsClass(ElementStates.Default)
        cy.get(circle[1]).children().should('have.text', '')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .each((element, index) => {
        cy.wrap(element).children().eq(0).notContainsClass('circle_element')
        if (index === 0) cy.wrap(element).children().eq(0).should('have.text', 'head')
      })
      .get('@circle_content')
      .should('have.length', 5)
  })

  it('should correct delete item from tail', () => {
    cy.get('@buttonDeleteFromTail').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('@circle_content')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 5) cy.wrap(element).children().eq(3).containsClass('circle_element')
        if (index === 5) cy.wrap(element).children().eq(1).containsClass(ElementStates.Changing)
        if (index === 5) cy.wrap(element).children().eq(1).containsClass('circle_small')
        
      })
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[6]).containsClass(ElementStates.Default)
        cy.get(circle[6]).children().should('have.text', '')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .each((element, index) => {
        cy.wrap(element).children().eq(0).notContainsClass('circle_element')
        if (index === 4) cy.wrap(element).children().eq(3).should('have.text', 'tail')
      })
      .get('@circle_content')
      .should('have.length', 5)
  })

  it('should correct delete item by index', () => {
    cy.get('@inputIndex').clear()
    cy.get('@inputIndex').type(2)
    cy.get('@buttonDeleteByIndex').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('@circle_content')
      .should('have.length', 6)
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[0]).containsClass(ElementStates.Changing)
      }) 
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[1]).containsClass(ElementStates.Changing)
      }) 
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[2]).containsClass(ElementStates.Changing)
      }) 
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .each((element, index) => {
        if (index === 2) cy.wrap(element).children().eq(0).containsClass('circle_element')
        if (index === 2) cy.wrap(element).children().eq(1).containsClass(ElementStates.Changing)
        if (index === 2) cy.wrap(element).children().eq(1).containsClass('circle_small')
      })
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[3]).containsClass(ElementStates.Changing)
        cy.get(circle[3]).children().should('have.text', '')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .each((element, index) => {
        if (index === 1) cy.wrap(element).children().eq(0).notContainsClass('circle_element')
        if (index === 2) cy.wrap(element).children().eq(0).notContainsClass('circle_element')
      })
      .get('@circle_circle')
      .then(circle => {
        cy.get(circle[1]).containsClass(ElementStates.Modified)
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('@circle_content')
      .should('have.length', 5)
      .each(() => {
        cy.get('@circle_circle').containsClass(ElementStates.Default)
      })
  })
})