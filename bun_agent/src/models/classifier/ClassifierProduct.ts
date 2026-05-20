import type { ClassifierModule } from "AgenteModule";

const MODULE_CLASSIFIER_PRODUCT: ClassifierModule = {
    key: "Product",
    description: "Create, search for, or edit products",
    rules: [],
    examples: [
        // CREATE
        {
            input: "create a new product called iPhone with price 5000",
            output: "create a new product called iPhone with price 5000"
        },
        {
            input: "add a product named notebook with price 20 and barcode 123412341234",
            output: "create a new product called notebook with price 20 and barcode 123412341234"
        },
        {
            input: "register a new product with name TV and price 3000 and barcode 111111111111",
            output: "create a new product called tv with price 3000 and barcode 111111111111"
        },
        {
            input: "create a product called test-1 with a price of 12.50",
            output: "create a new product called test-1 with price 12.50"
        },
        // EDIT
        {
            input: "update the price of product 123 to 50",
            output: "update the price of product with id 123 to 50"
        },
        {
            input: "change the name of product 456 to Laptop",
            output: "update the name of product with id 456 to Laptop"
        },
        {
            input: "edit product 789 and set price to 99",
            output: "update the price of product with id 789 to 99"
        },
        // GET
        {
            input: "get product 123",
            output: "show me the product with id 123"
        },
        {
            input: "show me the product with id 456",
            output: "show me the product with id 456"
        },
        {
            input: "find product with barcode 444444444444",
            output: "show me the product with barcode 444444444444"
        },
        {
            input: "Show me the product by id 55",
            output: "show me the product with id 55"
        },
        {
            input: "Show me the product by barcode 555555555555",
            output: "show me the product with barcode 555555555555"
        },
        {
            input: "search for the product by id 12",
            output: "show me the product with id 12"
        },
        // LIST
        {
            input: "list all products",
            output: "show me products"
        },
        {
            input: "show me available products on page 2",
            output: "show me available products on page 2"
        },
        {
            input: "display product list",
            output: "show me products"
        },
        // DELETE
        {
            input: "delete product 123",
            output: "delete product with id 123"
        },
        {
            input: "remove product 456",
            output: "delete product with id 456"
        },
        {
            input: "exclude product 789",
            output: "delete product with id 789"
        },
        // UNKNOWN
        {
            input: "hello",
            output: "<{UNKNOWN}>"
        },
        {
            input: "create a new user named John",
            output: "<{UNKNOWN}>"
        },
        {
            input: "what is the weather today?",
            output: "<{UNKNOWN}>"
        },
        {
            input: "how are you?",
            output: "<{UNKNOWN}>"
        }
    ]
};

export default MODULE_CLASSIFIER_PRODUCT;