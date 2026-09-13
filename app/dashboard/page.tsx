import OverviewCard from "@/components/dashboard/OverviewCard";


export default function DashboardOverviewPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This is a placeholder — a real build would surface generated
          content, brand voice analysis, and connected-account status here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <OverviewCard
          title="Brand Voice"
          description="Not generated yet. Once wired to a real analysis step, this would summarize tone, vocabulary, and style."
        />
        <OverviewCard
          title="Content Ideas"
          description="No suggestions yet. A real integration would list AI-generated post ideas here."
        />
        <OverviewCard
          title="Connected Accounts"
          description="No accounts connected. This is where website/Instagram sync status would live."
        />
      </div>
    </div>
  );
}
