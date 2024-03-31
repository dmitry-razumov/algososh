import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { ElementStates } from "../../src/types/element-states"

describe('test linkedlist page', () => {
  beforeEach(() => {
    cy.visit('/list')
    cy.clock()
  })

  it('add buttons should be disabled when inputs is empty', () => {
    cy.get('input[placeholder="Введите значение"]').clear()
    cy.get('input[placeholder="Введите индекс"]').clear()
    cy.get('button').contains('Добавить в head').parent().should('be.disabled')
    cy.get('button').contains('Добавить в tail').parent().should('be.disabled')
    cy.get('button').contains('Добавить по индексу').parent().should('be.disabled')
  })

  it('should correct render default list', () => {
    cy.get('[class^=circle_content]')
      .each((element, index) => {
        cy.get('[class^=circle_circle]').invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
        cy.get('[class^=circle_circle]').children().should('not.be.empty')
        if (index === 0) cy.wrap(element).contains('head')
        if (index === 6) cy.wrap(element).contains('tail')
      })
  })

  it('should correct add item to head', () => {
    cy.get('input[placeholder="Введите значение"]').type('h123')
    cy.get('button').contains('Добавить в head').parent().click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('[class^=circle_content]')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).contains('circle_element'))
        if (index === 0) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        if (index === 0) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains('circle_small'))
        if (index === 0) cy.wrap(element).children().eq(1).children().should('have.text', 'h123')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
        if (index === 0) cy.wrap(element).children().eq(0).should('have.text', 'head')
      })
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
        cy.get(circle[0]).children().should('have.text', 'h123')
      })     
  })

  it('should correct add item to tail', () => {
    cy.get('input[placeholder="Введите значение"]').type('t987')
    cy.get('button').contains('Добавить в tail').parent().click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('[class^=circle_content]')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 5) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).contains('circle_element'))
        if (index === 5) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        if (index === 5) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains('circle_small'))
        if (index === 5) cy.wrap(element).children().eq(1).children().should('have.text', 't987')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .each((element, index) => {
        if (index === 6) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
        if (index === 6) cy.wrap(element).children().eq(3).should('have.text', 'tail')
      })
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[6]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
        cy.get(circle[6]).children().should('have.text', 't987')
      })     
  })

  it('should correct add item by index', () => {
    cy.get('input[placeholder="Введите значение"]').type('5468')
    cy.get('input[placeholder="Введите индекс"]').type(2)
    cy.get('button').contains('Добавить по индексу').parent().click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('[class^=circle_content]')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).contains('circle_element'))
        if (index === 0) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        if (index === 0) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains('circle_small'))
        if (index === 0) cy.wrap(element).children().eq(1).children().should('have.text', '5468')
      })
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      }) 
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
        if (index === 0) cy.wrap(element).children().eq(0).should('have.text', 'head')
        if (index === 1) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).contains('circle_element'))
        if (index === 1) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        if (index === 1) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains('circle_small'))
        if (index === 1) cy.wrap(element).children().eq(1).children().should('have.text', '5468')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .each((element, index) => {
        if (index === 1) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
        if (index === 2) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).contains('circle_element'))
        if (index === 2) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        if (index === 2) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains('circle_small'))
        if (index === 2) cy.wrap(element).children().eq(1).children().should('have.text', '5468')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .each((element, index) => {
        if (index === 2) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
        if (index === 3) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).contains('circle_element'))
        if (index === 3) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        if (index === 3) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains('circle_small'))
        if (index === 3) cy.wrap(element).children().eq(1).children().should('have.text', '5468')
      })
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
        cy.get(circle[2]).children().should('have.text', '5468')
      })
      .get('[class^=circle_content]')
      .each((element, index) => {
        if (index === 3) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
        cy.get('[class^=circle_circle]').invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      })
  })

  it('should correct delete item from head', () => {
    cy.get('button').contains('Удалить из head').parent().click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('[class^=circle_content]')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 0) cy.wrap(element).children().eq(3).invoke('attr', 'class').then(classes => expect(classes).contains('circle_element'))
        if (index === 0) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        if (index === 0) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains('circle_small'))
        
      })
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
        cy.get(circle[1]).children().should('have.text', '')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .each((element, index) => {
        cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
        if (index === 0) cy.wrap(element).children().eq(0).should('have.text', 'head')
      })
      .get('[class^=circle_content]')
      .should('have.length', 5)
  })

  it('should correct delete item from tail', () => {
    cy.get('button').contains('Удалить из tail').parent().click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('[class^=circle_content]')
      .should('have.length', 7)
      .each((element, index) => {
        if (index === 5) cy.wrap(element).children().eq(3).invoke('attr', 'class').then(classes => expect(classes).contains('circle_element'))
        if (index === 5) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        if (index === 5) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains('circle_small'))
        
      })
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[6]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
        cy.get(circle[6]).children().should('have.text', '')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .each((element, index) => {
        cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
        if (index === 4) cy.wrap(element).children().eq(3).should('have.text', 'tail')
      })
      .get('[class^=circle_content]')
      .should('have.length', 5)
  })

  it('should correct delete item by index', () => {
    cy.get('input[placeholder="Введите индекс"]').clear()
    cy.get('input[placeholder="Введите индекс"]').type(2)
    cy.get('button').contains('Удалить по индексу').parent().click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('[class^=circle_content]')
      .should('have.length', 6)
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[0]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      }) 
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      }) 
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[2]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
      }) 
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .each((element, index) => {
        if (index === 2) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).contains('circle_element'))
        if (index === 2) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        if (index === 2) cy.wrap(element).children().eq(1).invoke('attr', 'class').then(classes => expect(classes).contains('circle_small'))
      })
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[3]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Changing))
        cy.get(circle[3]).children().should('have.text', '')
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .each((element, index) => {
        if (index === 1) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
        if (index === 2) cy.wrap(element).children().eq(0).invoke('attr', 'class').then(classes => expect(classes).not.contains('circle_element'))
      })
      .get('[class^=circle_circle]')
      .then(circle => {
        cy.get(circle[1]).invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Modified))
      })
      .tick(SHORT_DELAY_IN_MS)
      .get('[class^=circle_content]')
      .should('have.length', 5)
      .each((element, index) => {
        cy.get('[class^=circle_circle]').invoke('attr', 'class').then(classes => expect(classes).contains(ElementStates.Default))
      })
  })
})