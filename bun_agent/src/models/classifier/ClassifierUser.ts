import type { ClassifierModule } from "AgenteModule";

const MODULE_CLASSIFIER_USER: ClassifierModule = {
    key: "User",
    description: "Create, search, delete, or edit users",
    rules: [],
    examples: [
        // CREATE
        {
            input: "create a new user named John",
            output: "create a new user named John"
        },
        {
            input: "register user Maria",
            output: "create a new user named Maria"
        },
        {
            input: "add a user called Pedro with role ADMIN",
            output: "create a new user named Pedro with role ADMIN "
        },
        {
            input: "I want to create a user Ana with roles ADMIN and USER",
            output: "create a new user named Pedro with roles ADMIN and USER"
        },
        {
            input: "new user Henrry",
            output: "create a new user named Henrry"
        },
        // EDIT
        {
            input: "update user 10 name to Maria",
            output: "update user with id 10 name to Maria"
        },
        {
            input: "edit user 22 set name Pedro",
            output: "update user with id 22 name to Pedro"
        },
        {
            input: "update user with id 22 roles to ADMIN",
            output: "update user with id 22 role to ADMIN"
        },
        {
            input: "modify user 10 with roles ADMIN and USER",
            output: "update user with id 22 roles to ADMIN and USER"
        },
        // GET
        {
            input: "get user with id 10",
            output: "show me user by id 10"
        },
        {
            input: "find user 33",
            output: "show me user by id 33"
        },
        {
            input: "fetch user id 12345",
            output: "show me user by id 12345"
        },
        {
            input: "show me user 65",
            output: "show me user by id 65"
        },
        {
            input: "retrieve user with id 9",
            output: "show me user by id 9"
        },
        // LIST
        {
            input: "list users",
            output: "show me users"
        },
        {
            input: "get users on page 2",
            output: "show me users on page 2"
        },
        {
            input: "show users on page 10",
            output: "show me users on page 10"
        },
        {
            input: "fetch users",
            output: "show me users"
        },
        // DELETE
        {
            input: "delete user 456",
            output: "delete product with id 456"
        },
        {
            input: "remove user 12312",
            output: "delete product with id 12312"
        },
        {
            input: "erase user with id 68786",
            output: "delete product with id 68786"
        },
        {
            input: "drop user 5",
            output: "delete product with id 5"
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
    ]
};

export default MODULE_CLASSIFIER_USER;