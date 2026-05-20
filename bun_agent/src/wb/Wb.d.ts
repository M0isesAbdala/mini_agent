declare module 'wb' {
    export type Role = "ADMIN" | "USER";

    export type User = {
        id: number;
        name: string;
        roles: Role[];
    };

    export type Product = {
        id: number;
        productName: string;
        price: number;
        barcode: string;
    };

    export type WbAction = "CREATE" | "EDIT" | "GET" | "LIST" | "DELETE" | "UNKNOWN";

    export type WbHandler<T> = {
        create: (user: Omit<T, "id">) => T;
        edit: (data: Partial<T>) => T | null;
        get: (param: any) => T | null;
        list: (param?: { page: number }) => T[];
        delete: (id: number) => boolean;
    }

    export type Web = {
        "Product": WbHandler<Product>;
        "User": WbHandler<User>;
    };
}