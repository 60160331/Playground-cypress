import { dragPersonTo } from "../support/utils";
import { checkRightOnly } from "../support/utils";
import '@4tw/cypress-drag-drop';

describe('Sortable List - Richest People', () => {
  beforeEach(() => {
    cy.visit('https://qaplayground.dev/apps/sortable-list/');
  });
  // const correctOrder = [
  //     'Jeff Bezos',
  //     'Bill Gates',
  //     'Warren Buffett',
  //     'Bernard Arnault',
  //     'Carlos Slim Helu',
  //     'Amancio Ortega',
  //     'Larry Ellison',
  //     'Mark Zuckerberg',
  //     'Michael Bloomberg',
  //     'Larry Page'
  // ];
    
  it('should not have any right/wrong classes before checking', () => {
    // ตรวจสอบว่าไม่มี element ใดมี class 'right' หรือ 'wrong'
    cy.get('#draggable-list li.right').should('not.exist');
    cy.get('#draggable-list li.wrong').should('not.exist');
    // โครงสร้าง Dom ตอนเปิดเว็บครั้งแรก
    // <ul id="draggable-list">
    // <li data-index="0">...</li>
    // <li data-index="1">...</li>
  });

  it('should show right/wrong classes after checking', () => {
    cy.contains('Check Order').click();
    // อย่างน้อยต้องมี class 'right' หรือ 'wrong' บ้างหลังจากกด check
    cy.get('#draggable-list li').then(($items) => {
      const hasResultClass = [...$items].some(el =>
        el.classList.contains('right') || el.classList.contains('wrong')
      );
      expect(hasResultClass).to.be.true;
    });
  });

  it('should gradually sort names correctly', () => {
    const steps = [
      ['Jeff Bezos', 0],        // ลำดับที่ 1
      ['Warren Buffett', 2],    // ลำดับที่ 3
      ['Carlos Slim Helu', 4],  // ลำดับที่ 5
    ];

    steps.forEach(([name, index]) => {
      dragPersonTo(name, index);
      cy.contains('Check Order').click();
      checkRightOnly(name);
    });
    cy.contains('Check Order').click();
    // ✅ Final check

    [0, 2, 4].forEach(index => {
      cy.get('#draggable-list li').eq(index).should('have.class', 'right');
    });

  });

});