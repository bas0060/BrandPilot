

const OverviewCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default OverviewCard;