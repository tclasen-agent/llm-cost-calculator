// Editorial task shortlists, grounded in linked vendor evaluations, not a universal leaderboard.
export const taskModels={
 chat:['glm53flash','qwen38small','ds41','glm53'],
 research:['ds41','qwen38large','glm53','kimi3'],
 bizdev:['minimax27','glm53','qwen38large','glm53flash'],
 swe:['ds41','glm53','minimax27','qwen38large','qwen80'],
 'swe-factory':['ds41','glm53','minimax27','qwen38large'],
 support:['glm53flash','minimax27','qwen38small','glm53'],
 writing:['qwen38large','minimax27','glm53flash','qwen38small'],
 security:['ds41','glm53','kimi3','nemotron-ultra']
};
export const taskRationale={chat:'Instruction following and general reasoning inform this shortlist.',research:'Reasoning, tool-use and research evaluations inform this shortlist.',bizdev:'Office-work and tool-use evaluations are proxies for business development; validate against your own workflow.',swe:'Coding-agent and repository-level evaluations inform this shortlist.','swe-factory':'Coding and tool-use evaluations inform this shortlist; no benchmark guarantees unattended success.',support:'Instruction following and tool-use are proxies for support quality; validate your policies and knowledge base.',writing:'Instruction-following and office-work evaluations are proxies for writing quality; judge outputs against your brand and audience.',security:'Published security evaluations inform this shortlist where available; coding/reasoning capability alone is not a cyber benchmark.'};
export const modelSuggestion=task=>taskModels[task][0];
