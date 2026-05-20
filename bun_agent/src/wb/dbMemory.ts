import type { Product, User } from "wb";

const dbMemory = {
    users: [] as User[],
    products: [] as Product[],
};

export default dbMemory;