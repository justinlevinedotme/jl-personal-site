import { Badge } from "@/components/ui/badge";

export default function VersionBadge({
  version,
}: {
  version?: string | number;
}) {
  // hide when undefined/null/empty string; still show v0 if that ever matters
  if (version == null || String(version).trim() === "") return null;
  return (
    <Badge
      variant="secondary"
      className="v-badge"
      aria-label={`Version ${version}`}
    >
      v{version}
    </Badge>
  );
}
