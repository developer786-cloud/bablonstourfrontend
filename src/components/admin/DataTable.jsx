const DataTable = ({ columns, rows, loading, emptyText = 'No records found' }) => {
  if (loading) return <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">Loading data...</div>
  if (!rows?.length) return <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">{emptyText}</div>

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-3 p-3 md:hidden">
        {rows.map((row) => (
          <article key={row._id || row.id || JSON.stringify(row).slice(0, 30)} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <dl className="grid gap-3">
              {columns.map((column) => {
                const value = column.render ? column.render(row) : row[column.key]

                return (
                  <div key={column.key} className="grid gap-1 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                    <dt className="text-[0.68rem] font-black uppercase tracking-wide text-slate-400">{column.label}</dt>
                    <dd className="min-w-0 break-words text-sm font-semibold text-slate-800 [&_*]:max-w-full">
                      {value === undefined || value === null || value === '' ? '-' : value}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
            <tr>{columns.map((column) => <th key={column.key} className="px-4 py-3">{column.label}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row._id || row.id || JSON.stringify(row).slice(0, 30)} className="hover:bg-orange-50/40">
                {columns.map((column) => <td key={column.key} className="px-4 py-3 align-middle text-slate-700">{column.render ? column.render(row) : row[column.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
