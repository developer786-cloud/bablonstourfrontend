const LoadingSkeleton = ({ lines = 4 }) => (
  <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6">
    <div className="h-6 w-2/3 rounded bg-slate-200" />
    <div className="mt-5 space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 rounded bg-slate-100" />
      ))}
    </div>
  </div>
)

export default LoadingSkeleton
