export function dragPersonTo(name, index) {
  cy.get('#draggable-list li').should('have.length', 10).then($items => {
    const from = [...$items].find(el => {
      const text = el.querySelector('.draggable')?.textContent.trim();
      return text === name;
    });

    const to = $items[index];

    if (!from) {
      throw new Error(`❌ Could not find "${name}" in the list`);
    }

    cy.wrap(from).drag(to);
  });
}

export function checkRightOnly(name) {
  cy.contains('.draggable', name)
    .parents('li')
    .should('have.class', 'right');
}


