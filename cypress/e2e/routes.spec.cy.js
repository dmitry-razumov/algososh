describe('test app routes', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open app page by default', () => {
    cy.contains('МБОУ АЛГОСОШ')
  })

  it('should open string page after click by string card', () => {
    cy.get('a[href="/recursion"]').click()
    cy.contains('Строка')
  })

  it('should open fibonacci page after click by fibonacci card', () => {
    cy.get('a[href="/fibonacci"]').click()
    cy.contains('Последовательность Фибоначчи')
  })

  it('should open sorting page after click by sorting card', () => {
    cy.get('a[href="/sorting"]').click()
    cy.contains('Сортировка массива')
  })

  it('should open stack page after click by stack card', () => {
    cy.get('a[href="/stack"]').click()
    cy.contains('Стек')
  })

  it('should open queue page after click by queue card', () => {
    cy.get('a[href="/queue"]').click()
    cy.contains('Очередь')
  })

  it('should open linkedlist page after click by linkedlist card', () => {
    cy.get('a[href="/list"]').click()
    cy.contains('Связный список')
  })  
})