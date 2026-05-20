import type { Product, User, WbHandler, Web } from "wb";
import dbMemory from "./dbMemory";

const userService: WbHandler<User> = {
    create(user: Omit<User, "id">): User {
        const newUser = { ...user, id: Date.now() };
        dbMemory.users.push(newUser);
        return newUser;
    },
    edit(data: Partial<User>): User | null {
        const user = dbMemory.users.find(u => u.id === data.id);
        if (!user) return null;

        Object.assign(user, data);
        return user;
    },
    get(id: number): User | null {
        return dbMemory.users.find(u => u.id === id) || null;
    },
    list(param?: { page: number }): User[] {
        return dbMemory.users;
    },
    delete(id: number): boolean {
        const index = dbMemory.users.findIndex(u => u.id === id);
        if (index === -1) return false;

        dbMemory.users.splice(index, 1);
        return true;
    }
};

function getValue<K extends keyof Pick<Product, 'id' | 'barcode'>>(param: Product, key: K) {
    return param[key];
}

const productService: WbHandler<Product> = {
    create(product: Omit<Product, "id">): Product {
        const newProduct = { ...product, id: Date.now() };
        dbMemory.products.push(newProduct);
        return newProduct;
    },
    edit(data: Partial<Product>): Product | null {
        const product = dbMemory.products.find(p => p.id === data.id);
        if (!product) return null;

        Object.assign(product, data);
        return product;
    },
    get<K extends keyof Pick<Product, 'id' | 'barcode'>>(param: { key: K, param: Product[K] }): Product | null {
        return dbMemory.products.find(p => getValue(p, param.key) === param.param) || null;
    },
    list(param?: { page: number }): Product[] {
        return dbMemory.products;
    },
    delete(id: number): boolean {
        const index = dbMemory.products.findIndex(p => p.id === id);
        if (index === -1) return false;

        dbMemory.products.splice(index, 1);
        return true;
    }
};

const HANDLER: Web = {
    Product: productService,
    User: userService
};

export default HANDLER;