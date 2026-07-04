import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'

const GroupTourInfo = ({ package: travelPackage }) => {
  if (travelPackage.packageType !== 'group') return null
  const info = travelPackage.groupInfo || {}
  const settings = travelPackage.groupSettings || {}

  return (
    <SectionCard>
      <SectionHeading title="Group Tour Information" description={info.description} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-black uppercase text-slate-400">Min Group</p><p className="mt-2 font-black">{info.minTravelers || settings.minSize || '-'}</p></div>
        <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-black uppercase text-slate-400">Max Group</p><p className="mt-2 font-black">{info.maxTravelers || settings.maxSize || '-'}</p></div>
        <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-black uppercase text-slate-400">Tour Manager</p><p className="mt-2 font-black">{info.tourManagerIncluded || settings.tourManagerIncluded ? 'Included' : 'On request'}</p></div>
        <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-black uppercase text-slate-400">Departures/Month</p><p className="mt-2 font-black">{info.departuresPerMonth || '-'}</p></div>
      </div>
    </SectionCard>
  )
}

export default GroupTourInfo
