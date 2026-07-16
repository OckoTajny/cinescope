type Props = {
  voteAverage: number;
  size?: "sm" | "md";
};

export function RatingBadge({ voteAverage, size = "md" }: Props) {
  const percent = Math.round(voteAverage * 10);
  const dimension = size === "sm" ? "h-8 w-8 text-xs" : "h-12 w-12 text-sm";
  const tone = percent >= 70 ? "text-accent" : percent >= 40 ? "text-foreground" : "text-muted";

  return (
    <div
      className={`flex ${dimension} items-center justify-center rounded-full border-2 border-current bg-background/80 font-semibold ${tone}`}
    >
      {percent}%
    </div>
  );
}
