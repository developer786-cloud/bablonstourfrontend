const SearchFilterBar = ({ search, onSearch, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex flex-col gap-3 lg:flex-row">
      <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search..." className="h-11 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400" />
      {children}
    </div>
  </div>
)

export default SearchFilterBar
