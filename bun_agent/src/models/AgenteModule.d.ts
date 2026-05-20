declare module 'AgenteModule' {

    export type Examples = {
        input: string;
        output: string;
    };

    export type ClassifierModule = {
        key: string;
        description: string;
        examples: Examples[];
        rules: string[];
    };

    export type AgenteClassifierModule = {
        type: "CLASSIFIER";
        description: string;
        agentName: string;
        rules: string[];
        modules: ClassifierModule[];
    };

    export type ExecutorModule = {
        examples: Examples[];
    };

    export type AgenteExecuteModule = {
        type: "EXECUTOR";
        key: string;
        description: string;
        agentName: string;
        rules: string[];
        parameters: string[];
        modules: ExecutorModule;
    };

    export type AgenteModule = AgenteClassifierModule | AgenteExecuteModule;

}