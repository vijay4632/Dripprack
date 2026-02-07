import { Flame } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="relative overflow-hidden bg-neon-green py-2">
      <div className="flex items-center justify-center gap-2">
        <Flame className="h-4 w-4 text-accent-foreground" />
        <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-accent-foreground">
          New Drop Live — Limited Pieces Available
        </p>
        <Flame className="h-4 w-4 text-accent-foreground" />
      </div>
    </div>
  );
};

export default AnnouncementBar;
