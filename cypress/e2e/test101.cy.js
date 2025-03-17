import { visitPage } from "../support/utils";

const urlQa = "https://qaplayground.dev/apps/tags-input-box/";

describe('functionality', () => {

  it('verify the default value of tag input', () => {
    cy.visit(urlQa);
    cy.get('ul > :nth-child(1)')
      .should("contain.text", "node");
    cy.get('ul > :nth-child(2)')
      .should("contain.text", "javascript");
  });

  it('Verify if the input box is displayed correctly and can be add the new tag', () => {
    cy.visit(urlQa);
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .should('be.visible')//ตรวจว่า input ox นี้มีอยู่
      .type('Wow') // พิมพ์ได้
      .type('{enter}'); //กด enter
  });

  it('Verify can be remove some tag one by one', () => {//ลบจากการกดกากบาทโดยที่ลบไม่หมด
    cy.visit(urlQa);
    cy.get('ul > :nth-child(2) > .uit').click();
    cy.get('p > span').should("contain.text", "9");
  })
  
  it('Verify can be remove all the tag one by one', () => {//ลบจากการกดกากบาททีละอันจนหมด
    cy.visit(urlQa);
  // พิมพ์ "Cypress Test1" ถึง "Cypress Test5" แล้วกด Enter
  for (let i = 1; i <= 5; i++) {
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type(`Cypress Test${i}{enter}`);
    }
  // คลิกปุ่มลบทุกตัวที่เจอ
    cy.get('ul > li > .uit').each(($el) => {
    cy.wrap($el).click(); 
    });
     cy.get('p > span').should("contain.text", "0");
  })

  it('Verify remove all button is worked', () => {//ลบจากการกด remove all
    cy.visit(urlQa);
    for (let i = 1; i <= 5; i++) {
      cy.get('body > main > div > div.content > ul > input[type=text]')
        .type(`Cypress Test${i}{enter}`);
    }
    cy.get('button').click();
    cy.get('p>span').should("contain.text", 0);
  });

  it('ตรวจสอบว่าผู้ใช้สามารถเพิ่มหลาย ๆ tag ได้จากการใส่ comma', () => {
    cy.visit(urlQa);
    // clear ค่า default
    cy.get('ul > li > .uit').each(($el) => {
      cy.wrap($el).click();
    });
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('Test1,Test2,Test3,Test4,Test5{enter}');
    cy.get('ul > li').should('have.length', 5);

  });

  it('ตรวจสอบจำนวน tag ที่ใส่ได้หลังจากเพิ่ม tag', () => {
    cy.visit(urlQa);
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('Test1,Test2{enter}');
    cy.get('p > span').should("contain.text", "6");

    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('Test3{enter}');
    cy.get('p > span').should("contain.text", "5");
  })

  it('ตรวจสอบจำนวน tag ที่ใส่ได้หลังจากลบ tag', () => {
    cy.visit(urlQa);
    for (let i = 1; i <= 8; i++) {
      cy.get('body > main > div > div.content > ul > input[type=text]')
        .type(`Test${i}{enter}`);
    }
    cy.get('p > span').should("contain.text", "0");

    cy.get('ul > :nth-child(8) > .uit').click();
    cy.get('p > span').should("contain.text", "1");

    for (let i = 0; i < 2; i++) {
      cy.get('ul > :nth-child(1) > .uit').click();
    }
  });


});