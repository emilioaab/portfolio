"use client";

import { type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { COMMAND_TARGETS } from "@/content/terminal";
import { Ltr } from "@/components/ui/Ltr";

const PRIMARY_COMMANDS = [
  { command: "work", labelKey: "commandWork", descriptionKey: "commandWorkDesc" },
  { command: "contact", labelKey: "commandContact", descriptionKey: "commandContactDesc" },
] as const;

function navigateTo(id: string) {
  window.location.hash = id;
}

export function TerminalPrompt() {
  const t = useTranslations("Hero");
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd in COMMAND_TARGETS) {
      navigateTo(COMMAND_TARGETS[cmd]);
      setFeedback(null);
      return;
    }

    if (cmd === "whoami") {
      setFeedback(t("name"));
      return;
    }
    if (cmd === "help") {
      setFeedback(t("helpHint"));
      return;
    }
    if (cmd === "sudo" || cmd.startsWith("sudo ")) {
      setFeedback(t("sudoEasterEgg"));
      return;
    }

    setFeedback(t("notFound", { input: raw }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(value);
    setValue("");
  }

  return (
    <div className="mt-10 flex w-full max-w-md flex-col items-start gap-3 text-start">
      <p className="font-mono text-xs text-muted">
        <Ltr>
          <span aria-hidden="true">$ </span>
          {t("commandsLabel")}
        </Ltr>
      </p>

      <div className="flex w-full flex-col">
        {PRIMARY_COMMANDS.map((entry, index) => (
          <button
            key={entry.command}
            type="button"
            onClick={() => navigateTo(COMMAND_TARGETS[entry.command])}
            className="group flex w-full rounded-md px-2 py-2 text-start font-mono text-sm transition-colors hover:bg-surface"
          >
            <span dir="ltr" className="flex items-center gap-3">
              <span className="text-accent">[{index + 1}]</span>
              <span className="text-foreground">{t(entry.labelKey)}</span>
              <span className="text-muted transition-transform group-hover:translate-x-0.5">
                → {t(entry.descriptionKey)}
              </span>
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} dir="ltr" className="flex w-full items-center gap-2 px-2">
        <span className="font-mono text-sm text-accent" aria-hidden="true">
          $
        </span>
        <input
          type="text"
          dir="auto"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label={t("promptAriaLabel")}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="w-full bg-transparent font-mono text-sm text-foreground caret-accent outline-none placeholder:text-muted/50"
        />
      </form>

      {feedback && (
        <p className="px-2 font-mono text-xs text-muted" role="status">
          {feedback}
        </p>
      )}
    </div>
  );
}
