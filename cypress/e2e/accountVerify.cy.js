const urlQa = "https://qaplayground.dev/apps/verify-account/"
const updatedCode = ["3", "2", "1", "4"];
const expectedCode = ["8", "8", "3", "2", "1", "4"];

 
describe("Funtionality", () => {
    it("Input the correct code", () => {
        cy.visit(urlQa);
        for (let i = 1; i < 7; i++) {
            cy.get(`.code-container > :nth-child(${i})`).type("9");
        }
        cy.get('body').should("contain.text", "Success")
    });
        it("Input the incorrect code", () => {
        cy.visit(urlQa);
        for (let i = 1; i < 7; i++) {
            cy.get(`.code-container > :nth-child(${i})`).type("8");
        }
        cy.get('body').should("not.contain.text", "Success")
        });
    it("เช็คว่าสามารถแก้ไข Code ได้จากตำแหน่งตรงกลาง", () => {
        cy.visit(urlQa);
        for (let i = 1; i < 7; i++) {
            cy.get(`.code-container > :nth-child(${i})`).type("8");
        }
        //แก้ไขตำแหน่ง 3-6 ให้เป็น 3214
        [3, 4, 5, 6].forEach((pos, index) => {
            cy.get(`.code-container > :nth-child(${pos})`)
                // .clear() //ไม่ต้องเคลียร์เพราะจะพิมพ์ค่าทับค่าเก่า
                .type(updatedCode[index]);
        });
        // ตรวจสอบว่ามี 883214
        expectedCode.forEach((digit, index) => {
            cy.get(`.code-container > :nth-child(${index + 1})`)//+1 เพราะ foreach นับจาก 0
                .should('have.value', digit);
        });

    });
    
});