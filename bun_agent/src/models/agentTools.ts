import type { AgenteClassifierModule, AgenteExecuteModule, ClassifierModule, Examples } from "AgenteModule";
import { wbExecute } from "../wb/wbExecute";
import type { WbAction, Web } from "wb";

export type ExecKey = string;
export type ExecAgentName = string;

export const REGISTRED_EXECUTER: Record<ExecKey, ExecAgentName> = {};

export const JOIN: string[] = ['and', ','];

export function randomIndex(length: number): number {
    return Math.floor(Math.random() * length)
}

export function createClassifierAgent(agent: AgenteClassifierModule): string {
    let avaliableActions: string = "Available actions:\n";
    let outputModuleRules: string = "Rules";
    let outputModuleExample: string = "Examples:\n";
    let outputRandomModuleExample: string = "";
    for (const module of agent.modules) {
        avaliableActions += `- ${module.key}: ${module.description}`;
        for (const rule of module.rules) {
            outputModuleRules += `- ${rule}\n`;
        }

        for (const example of module.examples) {
            outputModuleExample += `Input: "${example.input}"\n`;
            outputModuleExample += `Output:\n<{${module.key}}> ${example.output}\n`;

            const RANDOM_INDEX_AGENT: number = randomIndex(agent.modules.length);
            const RANDOM_MODULE: ClassifierModule | undefined = agent.modules[RANDOM_INDEX_AGENT];
            if (RANDOM_MODULE) {
                const RADOM_INDEX_EXAMPLE: number = randomIndex(RANDOM_MODULE.examples.length);
                const EXAMPLE: Examples | undefined = RANDOM_MODULE.examples[RADOM_INDEX_EXAMPLE];
                if (EXAMPLE) {
                    const RANDOM_INDEX_JOIN = randomIndex(JOIN.length);
                    const TEXT_JOIN: string = JOIN[RANDOM_INDEX_JOIN] === undefined ? 'and' : JOIN[RANDOM_INDEX_JOIN];
                    outputRandomModuleExample += `Input: "${example.input} ${TEXT_JOIN} ${EXAMPLE.input}"\n`;
                    outputRandomModuleExample += `Output:\n<{${module.key}}> ${example.output}\n<{${RANDOM_MODULE.key}}> ${EXAMPLE.output}\n`;
                }
            }

        }
    }

    let output_rules: string = "Output rules:\n";
    for (const rule of agent.rules) {
        output_rules += `- ${rule}\n`;
    }

    const SYSTEM_CONTEXT: string = `${agent.description}\n${avaliableActions}\n${output_rules}${outputModuleRules.length > 0 ? `\n${outputModuleRules}` : ""}\n${outputModuleExample}${outputRandomModuleExample}`;
    return SYSTEM_CONTEXT
}

export function createExecutorAgent(agent: AgenteExecuteModule): string {
    REGISTRED_EXECUTER[agent.key] = agent.agentName;
    let outputParameters: string = 'You MUST return a JSON object with:\n';
    for (const param of agent.parameters) {
        outputParameters += ` - ${param}`;
    }

    let outputRole: string = 'Rules:\n';
    for (const role of agent.rules) {
        outputRole += ` - ${role}`;
    }

    let outputModuleExample: string = "Examples:\n";
    let outputRandomModuleExample: string = "";
    for (const example of agent.modules.examples) {
        outputModuleExample += `Input: "${example.input}"\n`;
        outputModuleExample += `Output:\n${example.output}\n`;

        const RANDOM_INDEX_EXAMPLE: number = randomIndex(agent.modules.examples.length);
        const RANDOM_EXAMPLE: Examples | undefined = agent.modules.examples[RANDOM_INDEX_EXAMPLE];
        if (RANDOM_EXAMPLE) {
            const RANDOM_INDEX_JOIN = randomIndex(JOIN.length);
            const TEXT_JOIN: string = JOIN[RANDOM_INDEX_JOIN] === undefined ? 'and' : JOIN[RANDOM_INDEX_JOIN];
            outputRandomModuleExample += `Input: "${example.input} ${TEXT_JOIN} ${RANDOM_EXAMPLE.input}"\n`;
            outputRandomModuleExample += `Output:\n"[${example.output},${RANDOM_EXAMPLE.output}]"\n`;
        }
    }

    const SYSTEM_CONTEXT: string = `${agent.description}\n${outputParameters}\n${outputRole}\n${outputModuleExample}${outputRandomModuleExample}`;
    return SYSTEM_CONTEXT
}

const TYPE_EXEC: RegExp = new RegExp("^<\\{(.+?)\\}>\\s*(.*)$");

export type Exec = {
    key: string;
    exec: string;
}

export function createExecution(input: string): Exec[] {
    const EXECS: Exec[] = input.split('\n').map(line => {
        const MATCH: RegExpMatchArray | null = line.match(TYPE_EXEC);

        if (MATCH && MATCH[1] && MATCH[2]) {
            const E: Exec = {
                key: MATCH[1],
                exec: MATCH[2]
            }

            return E
        }

        return null;
    }).filter((e) => e !== null);

    return EXECS;
}

export async function agentMessage(message: string): Promise<any[]> {
    const RETURN_WEB_EXECUTE: any[] = [];
    try {
        const RESPONSE = await fetch(`${process.env.OLLAMA_HOST}/api/generate`, {
            method: "POST",
            body: JSON.stringify({
                model: "agent-classifier",
                prompt: message,
                stream: false,
            }),
            headers: { "Content-Type": "application/json" },
        });

        const BODY: any = await RESPONSE.json();
        const EXECS: Exec[] = createExecution(BODY.response);

        for (const E of EXECS) {

            if (REGISTRED_EXECUTER[E.key]) {
                
                const R: any = await fetch(`${process.env.OLLAMA_HOST}/api/generate`, {
                    method: "POST",
                    body: JSON.stringify({
                        model: REGISTRED_EXECUTER[E.key],
                        prompt: E.exec,
                        stream: false,
                    }),
                    headers: { "Content-Type": "application/json" },
                });


                const B: any = await R.json();
                const OBJECT: any = JSON.parse(B.response);
                const KEY: keyof Web = E.key as keyof Web;
                const ACTION: WbAction = OBJECT.action;
                const PAYLOAD: any = OBJECT.parameters;

                RETURN_WEB_EXECUTE.push(wbExecute(KEY, ACTION, PAYLOAD));
            }
        }
    } catch (error) {
        RETURN_WEB_EXECUTE.push({ error: "UNKNOWN" });
    }

    return RETURN_WEB_EXECUTE;
}