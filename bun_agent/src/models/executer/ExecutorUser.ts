import type { ClassifierModule, ExecutorModule } from "AgenteModule";

const EXECUTOR_USER: ExecutorModule = {
    examples: [
        // CREATE
        {
            input: "create a new user named John",
            output: JSON.stringify({ action: "CREATE", parameters: { name: "John", roles: ["ADMIN"] } })
        },
        {
            input: "register user Maria",
            output: JSON.stringify({ action: "CREATE", parameters: { name: "Maria" } })
        },
        {
            input: "add a user called Pedro with role ADMIN",
            output: JSON.stringify({ action: "CREATE", parameters: { name: "Pedro", roles: ["ADMIN"] } })
        },
        {
            input: "I want to create a user Ana with roles ADMIN and USER",
            output: JSON.stringify({ action: "CREATE", parameters: { name: "Ana", roles: ["ADMIN", "USER"] } })
        },
        {
            input: "new user Henrry",
            output: JSON.stringify({ action: "CREATE", parameters: { name: "Henrry" } })
        },
        // EDIT
        {
            input: "update user 10 name to Maria",
            output: JSON.stringify({ action: "CREATE", parameters: { "id": 10, name: "Maria" } })
        },
        {
            input: "edit user 22 set name Pedro",
            output: JSON.stringify({ action: "CREATE", parameters: { "id": 22, name: "Pedro" } })
        },
        {
            input: "update user with id 56 role to ADMIN",
            output: JSON.stringify({ action: "CREATE", parameters: { "id": 56, roles: ["ADMIN"] } })
        },
        {
            input: "modify user 70 with roles ADMIN and USER",
            output: JSON.stringify({ action: "CREATE", parameters: { "id": 70, roles: ["ADMIN", "USER"] } })
        },
        // GET
        {
            input: "get user with id 10",
            output: JSON.stringify({ action: "GET", parameters: 10 })
        },
        {
            input: "find user 33",
            output: JSON.stringify({ action: "GET", parameters: 33 })
        },
        {
            input: "fetch user id 12345",
            output: JSON.stringify({ action: "GET", parameters: 12345 })
        },
        {
            input: "show me user 65",
            output: JSON.stringify({ action: "GET", parameters: 65 })
        },
        {
            input: "retrieve user with id 9",
            output: JSON.stringify({ action: "GET", parameters: 9 })
        },
        // LIST
        {
            input: "list users",
            output: JSON.stringify({ action: "LIST", parameters: undefined })
        },
        {
            input: "get users on page 2",
            output: JSON.stringify({ action: "LIST", parameters: { "page": 2 } })
        },
        {
            input: "show users on page 10",
            output: JSON.stringify({ action: "LIST", parameters: { "page": 10 } })
        },
        {
            input: "fetch users",
            output: JSON.stringify({ action: "LIST", parameters: undefined })
        },
        // DELETE
        {
            input: "delete user 456",
            output: JSON.stringify({ action: "DELETE", parameters: 456 })
        },
        {
            input: "remove user 12312",
            output: JSON.stringify({ action: "DELETE", parameters: 12312 })
        },
        {
            input: "erase user with id 68786",
            output: JSON.stringify({ action: "DELETE", parameters: 68786 })
        },
        {
            input: "drop user 5",
            output: JSON.stringify({ action: "DELETE", parameters: 68786 })
        },
        // UNKWON
        {
            input: "what is the weather today?",
            output: "<{UNKNOWN}>"
        },
        {
            input: "tell me a joke",
            output: "<{UNKNOWN}"
        },
        {
            input: "exclude product 789",
            output: "<{UNKNOWN}>"
        },

        {
            input: "why sky is blue?",
            output: "<{UNKNOWN}>"
        },
        {
            input: "hi",
            output: "<{UNKNOWN}>"
        }
    ]
};

export default EXECUTOR_USER;