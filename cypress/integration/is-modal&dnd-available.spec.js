describe('service is available', function () {
    it('should be available on localhost:3000', function() {
        cy.visit('http://localhost:3000');
    });


    it("should drag and drop bun", function () {
        cy.get('[class^=BurgerIngredients_cards__]').as("burger-ingredients");
        cy.get('[class^=BurgerConstructorItems_ul__]').as("burger-constructor");

        cy.get("@burger-ingredients")
            .find("a")
            .contains("Флюоресцентная булка R2-D3")
            .as("ingredient-item");

        cy.get("@ingredient-item").trigger("dragstart");

        cy.get("@burger-constructor").trigger("drop");
    });

    it("should drag and drop filling", function () {
        cy.get('[class^=BurgerIngredients_cards__]').as("burger-ingredients");
        cy.get('[class^=BurgerConstructorItems_ul__]').as("burger-constructor");

        cy.get("@burger-ingredients")
            .find("a")
            .contains("Мини-салат Экзо-Плантаго")
            .as("ingredient-item");

        cy.get("@ingredient-item").trigger("dragstart");

        cy.get("@burger-constructor").trigger("drop");
    });


    it("should open and close ingredient modal", function () {
        cy.get('[class^=BurgerIngredients_cards__]').as("burger-ingredients");

        cy.get("@burger-ingredients")
            .find("a")
            .contains("Филе Люминесцентного тетраодонтимформа")
            .as("ingredient-item");

        cy.get('@ingredient-item').click();

        cy.get('#portal').as("modal");

        cy.get("@modal")
            .find("button")
            .as("close-button");

        cy.get('@close-button').click();
    });


    it("should submit an order", function () {
        cy.get('[class^=BurgerConstructor_totalWrapper__]').as("burger-constructor");

        cy.get('@burger-constructor')
            .find("button")
            .contains("Оформить заказ")
            .as("submit-button");

        cy.get('@submit-button').click();
    });

    it("should login", function () {
        cy.get('[class^=login_formContainer__]').as("login-form");
        cy.get('@login-form').find('[class^=text]').first().as('email-input');
        cy.get('@login-form').find('[class^=text]').last().as('password-input');

        cy.get('[class^=login_form__]').as("button");
        cy.get('@button').find('[class^=login_submitWrapper__]').as('submit-button');

        cy.get('@email-input').type('emper@gmail.com', { force: true });
        cy.get('@password-input').type('12345t', { force: true });

        cy.get('@submit-button').click();
    });

    it("should re-submit an order", function () {
        cy.get('[class^=BurgerConstructor_totalWrapper__]').as("burger-constructor");

        cy.get('@burger-constructor')
            .find("button")
            .contains("Оформить заказ")
            .as("submit-button");

        cy.get('@submit-button').click();
    });
});