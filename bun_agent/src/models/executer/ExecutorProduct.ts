import type { ClassifierModule, ExecutorModule } from "AgenteModule";

const EXECUTOR_PRODUCT: ExecutorModule = {
    examples: [
        {
            input: "create a new product called iPhone with price 5000",
            output: JSON.stringify({ action: "CREATE", parameters: { productName: "iPhone", price: 5000 } })
        },
        {
            input: "add a product named notebook with price 20 and barcode 123412341234",
            output: JSON.stringify({ action: "CREATE", parameters: { productName: "notebook", price: 20, barcode: "123412341234" } })
        },
        {
            input: "register a new product with name TV and price 3000 and barcode 111111111111",
            output: JSON.stringify({ action: "CREATE", parameters: { productName: "TV", price: 3000, barcode: "111111111111" } })
        },
        {
            input: "create a product called test-1 with a price of 12.50",
            output: JSON.stringify({ action: "CREATE", parameters: { productName: "test-1", price: 12.50 } })
        },
        // EDIT
        {
            input: "update the price of product 123 to 50",
            output: JSON.stringify({ action: "EDIT", parameters: { id: 123, price: 50 } })
        },
        {
            input: "change the name of product 456 to Laptop",
            output: JSON.stringify({ action: "EDIT", parameters: { id: 456, productName: "Laptop" } })
        },
        {
            input: "edit product 789 and set price to 99 and barcode 555555555555",
            output: JSON.stringify({ action: "EDIT", parameters: { id: 789, price: 99, barcode: "555555555555" } })
        },
        // GET
        {
            input: "get product 123",
            output: JSON.stringify({ action: "GET", parameters: { id: 123 } })
        },
        {
            input: "show me the product with id 456",
            output: JSON.stringify({ action: "GET", parameters: { id: 456 } })
        },
        {
            input: "find product with barcode 444444444444",
            output: JSON.stringify({ action: "GET", parameters: { barcode: 444444444444 } })
        },
        {
            input: "Show me the product by id 55",
            output: JSON.stringify({ action: "GET", parameters: { id: 55 } })
        },
        {
            input: "Show me the product by barcode 555555555555",
            output: JSON.stringify({ action: "GET", parameters: { barcode: 555555555555 } })
        },
        {
            input: "search for the product by id 12",
            output: JSON.stringify({ action: "GET", parameters: { id: 12 } })
        },
        // LIST
        {
            input: "list all products",
            output: JSON.stringify({ action: "LIST", parameters: undefined })
        },
        {
            input: "show me available products on page 2",
            output: JSON.stringify({ action: "LIST", parameters: { "page": 2 } })
        },
        {
            input: "display product list",
            output: JSON.stringify({ action: "LIST", parameters: undefined })
        },
        // DELETE
        {
            input: "delete product 123",
            output: JSON.stringify({ action: "DELETE", parameters: 123 })
        },
        {
            input: "remove product 456",
            output: JSON.stringify({ action: "DELETE", parameters: 456 })
        },
        {
            input: "exclude product 789",
            output: JSON.stringify({ action: "DELETE", parameters: 789 })
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

export default EXECUTOR_PRODUCT;