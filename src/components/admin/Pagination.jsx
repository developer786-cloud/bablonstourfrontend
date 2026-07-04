const Pagination = ({ page = 1, totalPages = 1, onChange }) => (
  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
    <span className="font-semibold text-slate-500">Page {page} of {totalPages}</span>
    <div className="flex gap-2">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)} className="rounded-lg border border-slate-200 px-3 py-2 font-bold disabled:opacity-40">Prev</button>
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)} className="rounded-lg border border-slate-200 px-3 py-2 font-bold disabled:opacity-40">Next</button>
    </div>
  </div>
)

export default Pagination
