import { FileText, Video, ExternalLink } from "lucide-react";

interface MaterialItemProps {
  material: {
    titulo: string;
    tipo: string;
    url: string;
  };
}

function getTypeIcon(tipo: string) {
  return tipo === "video" ? Video : FileText;
}

export function MaterialItem({ material }: MaterialItemProps) {
  const Icon = getTypeIcon(material.tipo);

  return (
    <a
      href={material.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Icon className="size-4 shrink-0 text-primary" />
      <span className="flex-1">{material.titulo}</span>
      <ExternalLink className="size-3 shrink-0 text-muted-foreground/60" />
    </a>
  );
}
