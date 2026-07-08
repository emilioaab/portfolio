import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except API routes, Next internals, Vercel internals,
  // root-level metadata file routes (icon.tsx has no extension in its
  // URL, so it isn't caught by the .*\..* exclusion below), and files
  // with an extension (e.g. favicon.ico, images).
  matcher: ["/((?!api|trpc|_next|_vercel|icon|.*\\..*).*)"],
};
