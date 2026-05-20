import type { AgenteModule } from "AgenteModule";
import { createClassifierAgent, createExecutorAgent } from "./agentTools";

export async function createAgent(agents: AgenteModule[]): Promise<void> {

    await fetch(`${process.env.OLLAMA_HOST}/api/pull`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "model": "llama3"
        })
    }).then((response) => {
        console.log('SUCESS');
        createAgents(agents);
    }).catch((e) => console.error('error: ', e));

}

async function createAgents(agents: AgenteModule[]): Promise<void> {
    for (const agent of agents) {
        let system: string = '';
        if (agent.type === 'CLASSIFIER') {
            system = createClassifierAgent(agent);
        } else if (agent.type === 'EXECUTOR') {
            system = createExecutorAgent(agent);
        }
        console.log("Agents: ", agent.agentName);
        if (system) {
            await fetch(`${process.env.OLLAMA_HOST}/api/create`, {
                method: "POST",
                body: JSON.stringify({
                    from: "llama3",
                    model: agent.agentName,
                    system: system,
                    parameters: {
                        temperature: 0,
                        top_p: 0.9,
                        num_ctx: 4096
                    }
                }),
                headers: { "Content-Type": "application/json" },
            });
        }

    }
}