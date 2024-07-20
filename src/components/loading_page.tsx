import { Progress } from "@/components/ui/progress"

export default function Loading_page({title,subtitle}:{title:string,subtitle:string}) {

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="flex items-center justify-center">
          <div className="w-32 h-32 text-primary">
            <Progress value={50} className="animate-spin" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}