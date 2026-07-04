const DashboardStatCard = ({ icon: Icon, label, value, tone = 'orange' }) => {
  const tones = {
    orange: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{value ?? 0}</p>
        </div>
        {Icon ? <span className={`grid h-12 w-12 place-items-center rounded-lg ${tones[tone]}`}><Icon /></span> : null}
      </div>
    </div>
  )
}

export default DashboardStatCard
