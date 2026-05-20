import type { WbAction, Web } from "wb";
import HANDLER from "./handlers";

export function wbExecute(key: keyof Web, action: WbAction, payload: any): any {
    switch (action) {
        case "CREATE":
            return HANDLER[key].create(payload);

        case "EDIT":
            return HANDLER[key].edit(payload);

        case "GET":
            return HANDLER[key].get(payload);

        case "LIST":
            return HANDLER[key].list(payload);

        case "DELETE":
            return HANDLER[key].delete(payload.id);

        default:
            return { error: "UNKNOWN" };
    }
}