const styles = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  follow_up: 'bg-purple-100 text-purple-700',
  converted: 'bg-green-100 text-green-700',
  closed: 'bg-slate-100 text-slate-600',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
  published: 'bg-green-100 text-green-700',
  draft: 'bg-amber-100 text-amber-700',
  archived: 'bg-slate-100 text-slate-600',
  open: 'bg-green-100 text-green-700',
  filling: 'bg-amber-100 text-amber-700',
  soldout: 'bg-red-100 text-red-700',
  cancelled: 'bg-slate-100 text-slate-600',
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-red-100 text-red-700',
}

const StatusBadge = ({ value }) => {
  const key = String(value || 'inactive')
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ${styles[key] || 'bg-slate-100 text-slate-600'}`}>{key.replace('_', ' ')}</span>
}

export default StatusBadge
