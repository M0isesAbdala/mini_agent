import { serve, } from "bun";
import HANDLER from "./handlers";
import type { Product } from "wb";
import { agentMessage } from "../models/agentTools";

export function initWb(): void {
    serve({
        port: 3000,
        routes: {
            '/users': async (req) => {
                const method = req.method;

                if (method === "GET") {
                    const url: URL = new URL(req.url);
                    const page: string | null = url.searchParams.get("page");
                    let pagination: { page: number } | undefined = undefined;
                    if (page) {
                        pagination = { page: parseInt(page, 10) };
                    }
                    return Response.json(HANDLER.User.list(pagination), 200);
                } else if (method === "POST") {
                    const body: any = await req.json();
                    return Response.json(HANDLER.User.create(body), 201);
                } else if (method === "PUT") {
                    const body: any = await req.json();
                    const updated = HANDLER.User.edit(body);
                    return updated ? Response.json({ message: "Sucess" }, { status: 200 }) : Response.json({ message: "Not found" }, { status: 404 });
                }
                return Response.json({ message: "Not found" }, { status: 404 });
            },
            '/users/:id': async (req) => {
                const method = req.method;

                if (method === "GET") {
                    const user = HANDLER.User.get(parseInt(req.params.id, 10));
                    return user ? Response.json(user) : Response.json({ message: "Not found" }, { status: 404 });
                } else if (method === "DELETE") {
                    const ok = HANDLER.User.delete(parseInt(req.params.id, 10));
                    return ok ? Response.json({ message: "Sucess" }, { status: 200 }) : Response.json({ message: "Not found" }, { status: 404 });
                }

                return Response.json({ message: "Not found" }, { status: 404 });
            },
            '/products': async (req) => {
                const method = req.method;

                if (method === "GET") {
                    const url: URL = new URL(req.url);
                    const page: string | null = url.searchParams.get("page");
                    let pagination: { page: number } | undefined = undefined;
                    if (page) {
                        pagination = { page: parseInt(page, 10) };
                    }
                    return Response.json(HANDLER.Product.list(pagination), 200);
                } else if (method === "POST") {
                    const body: any = await req.json();
                    return Response.json(HANDLER.Product.create(body), 201);
                } else if (method === "PUT") {
                    const body: any = await req.json();
                    const updated = HANDLER.Product.edit(body);
                    return updated ? Response.json({ message: "Sucess" }, { status: 200 }) : Response.json({ message: "Not found" }, { status: 404 });
                }
                return Response.json({ message: "Not found" }, { status: 404 });
            },
            '/products/:id': async (req) => {
                const method = req.method;
                if (method === "GET") {
                    const url: URL = new URL(req.url);
                    const type: string | null = url.searchParams.get("type");

                    let param: { key: keyof Pick<Product, 'id' | 'barcode'>, param: Product[keyof Pick<Product, 'id' | 'barcode'>] } | null = null;

                    if (type) {
                        param = type === 'id' ? { key: 'id', param: parseInt(type, 10) } : { key: 'barcode', param: req.params.id };
                    } else {
                        param = { key: 'id', param: parseInt(req.params.id, 10) };
                    }

                    if (!param) {
                        return Response.json({ message: "Not found" }, { status: 404 });
                    }

                    const PRODUCT = HANDLER.Product.get(param);
                    return PRODUCT ? Response.json(PRODUCT) : Response.json({ message: "Not found" }, { status: 404 });
                } else if (method === "DELETE") {
                    const ok = HANDLER.Product.delete(parseInt(req.params.id, 10));
                    return ok ? Response.json({ message: "Sucess" }, { status: 200 }) : Response.json({ message: "Not found" }, { status: 404 });
                }

                return Response.json({ message: "Not found" }, { status: 404 });
            },
            '/agent': (req) => {
                return new Promise<Response>(async (resolve, reject) => {
                    const body: any = await req.text();
                    const RESPONSE: any[] | null = await agentMessage(body).then((r: any[]) => {
                        return r;
                    }).catch(() => {
                        return null;
                    });
                    return RESPONSE ? resolve(Response.json(RESPONSE, { status: 200 })) : reject(Response.json({ message: "Internal server error" }, { status: 500 }));
                });

            },
        }
    });
}
