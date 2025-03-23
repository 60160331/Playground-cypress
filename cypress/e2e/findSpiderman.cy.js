const urlQa = "https://qaplayground.dev/apps/dynamic-table"

describe("ตรวจสอบว่าข้อมูลของ Spider-Man", () => {
    it("Check ว่า Spider man ชื่อ Peter Parker และมีข้อมูลถูกต้อง", () => {
        cy.visit(urlQa);
        // หาแถว (tr) ที่มี Spider-Man
        cy.get("table")
            .contains("td", "Spider-Man")
            .parents("tr") // กลับไปยังแถวของ Spider-Man
            .within(() => {
                // ตรวจสอบว่าในแถวนั้นมี Peter Parker อยู่ด้วย
                cy.contains("td", "Peter Parker").should("exist")
                cy.contains("td", "Active").should("exist")
                cy.contains("td", "spider-man@avengers.com").should("exist")

            });
    });
    
});