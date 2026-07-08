import Image from "next/image";
import { useTranslations } from "next-intl";
import { WindowFrame } from "@/components/ui/WindowFrame";

export function HeroPortrait() {
  const t = useTranslations("Hero");

  return (
    <WindowFrame title="emil.jpg" className="w-64 sm:w-80">
      <div className="relative aspect-square">
        <Image
          src="/images/emil-profile.jpg"
          alt="Emil Abdumalikov"
          fill
          sizes="320px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 py-2.5">
          <span className="font-mono text-[10px] tracking-wide text-foreground">
            {t("location")}
          </span>
        </div>
      </div>
    </WindowFrame>
  );
}
