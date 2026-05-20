import type { AgenteClassifierModule } from "AgenteModule";
import MODULE_CLASSIFIER_PRODUCT from "./ClassifierProduct";
import MODULE_CLASSIFIER_USER from "./ClassifierUser";

const AGENT_CLASSIFIER: AgenteClassifierModule = {
    type: "CLASSIFIER",
    description: "You are an AI agent responsible for classifying user input into actions",
    agentName: "agent-classifier",
    rules: [
        "Return ONLY the result using this format: <{title}> text",
        "Do NOT add explanations",
        "Do NOT return anything outside this format",
        "If multiple actions are present, return multiple blocks",
        "If no action matches, return: <{UNKNOWN}>",
        "If input is unrelated, return UNKNOWN"
    ],
    modules: [MODULE_CLASSIFIER_PRODUCT, MODULE_CLASSIFIER_USER]
};

export default AGENT_CLASSIFIER;