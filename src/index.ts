import extract from "./extract";
export default extract;

export const NODE_ENV = extract({
	name: "NODE_ENV",
	optional: true,
	patterns: ["development", "production", "test", ""] as const,
});

//  Below, all shared extracted env variables
export const NX_TASK_TARGET_PROJECT = extract({
	name: "NX_TASK_TARGET_PROJECT",
	optional: true,
});

export const NX_WORKSPACE_ROOT = extract({
	name: "NX_WORKSPACE_ROOT",
	optional: true,
});
