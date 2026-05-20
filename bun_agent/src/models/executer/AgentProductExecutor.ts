import type { AgenteExecuteModule } from "AgenteModule";
import EXECUTOR_PRODUCT from "./ExecutorProduct";

const AGENT_PRODUCT_EXECUTOR: AgenteExecuteModule = {
    type: "EXECUTOR",
    key: "Product",
    description: "You are an AI agent that decides which action to take",
    agentName: "agent-product-executor",
    parameters: [
        "action: one of [CREATE, EDIT, GET, LIST, DELETE, UNKNOWN]",
        "parameters: object or object array"
    ],
    rules: [
        "Return ONLY the value",
        "Do NOT refuse",
        "Do NOT add explanations",
        "Do NOT add text",
        "Do NOT return anything outside this format",
        "Do NOT return text outside JSON",
        "If unsure, return UNKNOWN",
        "If the input does not match any action, return UNKNOWN"
    ],
    modules: EXECUTOR_PRODUCT
};

export default AGENT_PRODUCT_EXECUTOR;