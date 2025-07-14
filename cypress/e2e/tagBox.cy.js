describe('Sortable List - Richest People', () => {
  beforeEach(() => {
    cy.visit('https://qaplayground.dev/apps/tags-input-box/');
  });

describe('functionality', () => {

  it('verify the default value of tag input', () => {
    cy.get('ul > :nth-child(1)')
      .should("contain.text", "node");
    cy.get('ul > :nth-child(2)')
      .should("contain.text", "javascript");
  });

  it('Verify if the input box is displayed correctly and can be add the new tag', () => {
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .should('be.visible')//ตรวจว่า input ox นี้มีอยู่
      .type('Wow') // พิมพ์ได้
      .type('{enter}'); //กด enter
  });

  it('Verify can be remove some tag one by one', () => {//ลบจากการกดกากบาทโดยที่ลบไม่หมด
    cy.get('ul > :nth-child(2) > .uit').click();
    cy.get('ul > li').should('have.length', 1);
  })
  
  it('Verify can be remove all the tag one by one', () => {//ลบจากการกดกากบาททีละอันจนหมด
  // พิมพ์ "Cypress Test1" ถึง "Cypress Test5" แล้วกด Enter
  for (let i = 1; i <= 5; i++) {
    cy.get('body > main > div > div.content > ul > input[type=text]')

      .type(`Cypress Test${i}{enter}`);
    }
  // คลิกปุ่มลบทุกตัวที่เจอ
    cy.get('ul > li > .uit').each(($el) => {//.uit คือปุ่มลบ
    cy.wrap($el).click(); 
    });
     cy.get('ul > li').should('have.length', 0);
  })

  it('Verify remove all button is worked', () => {//ลบจากการกด remove all
    for (let i = 1; i <= 5; i++) {
      cy.get('body > main > div > div.content > ul > input[type=text]')
        .type(`Cypress Test${i}{enter}`);
    }
    cy.get('button').click();
    cy.get('ul > li').should('have.length', 0);
  });

  it('ตรวจสอบว่าผู้ใช้สามารถเพิ่มหลาย ๆ tag ได้จากการใส่ comma', () => {
    // clear ค่า default
    cy.get('ul > li > .uit').each(($el) => {
      cy.wrap($el).click();
    });
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('Test1,Test2,Test3,Test4,Test5{enter}');
    cy.get('ul > li').should('have.length', 5);

  });

  it('ตรวจสอบจำนวน tag ที่ใส่ได้หลังจากเพิ่ม tag', () => {
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('Test1,Test2{enter}');
    cy.get('p > span').should("contain.text", "6");

    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('Test3{enter}');
    cy.get('p > span').should("contain.text", "5");
  })

  it('ตรวจสอบจำนวน tag ที่ใส่ได้หลังจากลบ tag', () => {
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

  it('การตรวจสอบว่าไม่สามารถเพิ่มแท็กเกิน 10 อัน [กรณีใส่ทีละอัน]', () => {
    cy.get('button').click();
    cy.get('p>span').should("contain.text", 0);
    for (let i = 1; i <= 12; i++){
      cy.get('body > main > div > div.content > ul > input[type=text]')
        .type(`Test${i}{enter}`);
    }
    cy.get('ul > li').should('have.length', 10);
  });
    it('การตรวจสอบว่าไม่สามารถเพิ่มแท็กเกิน 10 อัน [กรณีใส่ทีเดียวเกิน 10 จากการใช้ comma]', () => {
    cy.get('button').click();// clear ค่า default
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,Test9,Test10,Test11,Test,12{enter}');
    cy.get('ul > li').should('have.length', 10);
  });

});

describe("Validation", () => {

  it("ตรวจสอบว่าผู้ใช้ไม่สามารถเพิ่ม tag ที่ว่างเปล่าได้", () => {
    cy.get('button').click();// clear ค่า default
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type(' {enter}');
    cy.get('ul > li').should('have.length', 0);
  });
  it("ตรวจสอบว่าผู้ใช้ไม่สามารถเพิ่ม tag ที่ว่างเปล่าได้ [กรณีใส่ช่องว่าง 2 อันโดยมี comma คั่น]", () => {
    cy.get('button').click();// clear ค่า default
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type(' , {enter}');
    cy.get('ul > li').should('have.length', 0);
  });
  it("ตรวจสอบว่าผู้ใช้ไม่สามารถเพิ่ม tag ซ้ำได้[กรณีใส่ทีละอัน]", () => {
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('javascript{enter}')
      .type('node{enter}');
    cy.get('ul > li').should('have.length', 2);
  });
  it("tag ซ้ำต่าง case: ไม่เพิ่มได้", () => {
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('jAVascript{enter}')
      .type('Node{enter}');
    cy.get('ul > li').should('not.have.length', 4)
    .and('have.length', 2);
  });
  it("ตรวจสอบว่าผู้ใช้ไม่สามารถเพิ่ม tag ซ้ำได้[กรณีใส่หลายอันโดยใช้ comma]", () => {
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('node,javascript{enter}')
    cy.get('ul > li').should('have.length', 2);
  });
  it("ตรวจสอบ white space ตรงกลาง", () => {
    //ถ้าผู้ใช้พิมพ์ " test " แล้วกด Enter → ระบบควรตัดช่องว่างออกให้เหลือ "test"
    cy.get('button').click();// clear ค่า default
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('Hello world{enter}');
    cy.get('ul > :nth-child(1)')
      .should("contain.text", "Hello world");
  })

  it("ตรวจสอบว่า tag ว่าสามารถเพิ่มอักขระพิเศษได้", () => {
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('!@#$%^&*()_+{}?><', { parseSpecialCharSequences: false }) // ✅ Cypress จะพิมพ์ข้อความตรงๆ
      .type('{enter}'); 
    cy.get('ul > :nth-child(3)')
      .should("contain.text", "!@#$%^&*()_+{}?><");
  });
    it("ตรวจสอบว่า tag ว่าเป็นตัวเลขได้", () => {
    cy.get('body > main > div > div.content > ul > input[type=text]')
      .type('12345678909876') 
      .type('{enter}'); 
    cy.get('ul > :nth-child(3)')
      .should("contain.text", "12345678909876");
    });

});
describe("Edge Cases", ()=>{
  it("ตรวจสอบว่าเมื่อ refresh หน้าเว็บ tag ที่เพิ่มเข้ามาจะหายไป", () => {
    for (let i = 1; i <= 8; i++) {
      cy.get('body > main > div > div.content > ul > input[type=text]')
        .type(`Test${i}{enter}`);
    }
    cy.reload();
    cy.get('ul > li').should('have.length', 2);//เหลือแต่ค่า default
  });
  it("ตรวจสอบว่าหากมี tag มากเกินไป input box จะขยายตาม", () => {
    cy.get('ul').invoke('width').then((widthBefore) => {
      cy.get('input[type="text"]').type('ThisIsAVeryLongTagThatShouldExpandTheContainer{enter}');

      cy.get('ul').invoke('width').should('be.greaterThan', widthBefore);
    });
  });
  
});
  });
