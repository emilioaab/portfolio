// Section ids a command can jump to — the same vocabulary as the Nav
// component's links, so typing "work" and clicking ~/work in the header
// both resolve to the same place.
export const COMMAND_TARGETS: Record<string, string> = {
  work: "flagship-project",
  projects: "projects",
  about: "about",
  stack: "tech-stack",
  contact: "contact",
};

export const KNOWN_COMMANDS = Object.keys(COMMAND_TARGETS);
