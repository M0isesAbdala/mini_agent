import AGENT_CLASSIFIER from "./models/classifier/AgentClassifier";
import AGENT_USER_EXECUTOR from "./models/executer/AgentUserExecutor";
import AGENT_PRODUCT_EXECUTOR from "./models/executer/AgentProductExecutor";
import { createAgent } from "./models/InitAgent";
import { createExecution, REGISTRED_EXECUTER, type Exec } from "./models/agentTools";
import { initWb } from "./wb/initWb";

initWb();

await createAgent([AGENT_CLASSIFIER, AGENT_PRODUCT_EXECUTOR, AGENT_USER_EXECUTOR]);