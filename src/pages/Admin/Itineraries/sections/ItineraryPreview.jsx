function formatDate(value) {
  if (!value) return '';
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) return '';
  return new Date(year, month - 1, day).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ItineraryPreview({
  title, customerName, packageName, destinations, nights, days, adults, children, childrenAges = [], routeStops = [],
  startDate, endDate, coverImage, dayPlan = [], pricing = {}
}) {
  const travelerCount = Math.max(0, Number(adults || 0) + Number(children || 0));
  const basePrice = Number(pricing.basePrice ?? pricing.perPersonCost ?? 0);
  const gst = Math.round(basePrice * Number(pricing.gstPercentage ?? 5)) / 100;
  const perPerson = Number(pricing.perPersonCost ?? basePrice + gst);
  const total = Number(pricing.totalPrice ?? pricing.totalCost ?? (perPerson * travelerCount + Number(pricing.flightCost || 0)));
  const dates = [formatDate(startDate), formatDate(endDate)].filter(Boolean).join(' – ');

  return (
    <aside aria-label="Live itinerary preview" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9B762F]">Live preview</p>
          <p className="mt-0.5 text-xs text-slate-500">Updates as you edit</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#F8F3E8] text-[#9B762F]" aria-hidden="true">✦</span>
      </div>

      <div className="max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#12264B] via-[#24556C] to-[#4D867D]">
          {coverImage?.url && <img src={coverImage.url} alt={coverImage.alt || `Cover for ${destinations || 'itinerary'}`} className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1832]/90 via-[#0B1832]/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#E7C77D]">{packageName || 'Travel proposal'}</p>
            <h2 className="mt-1 line-clamp-2 text-xl font-black leading-tight">{title || 'Your itinerary title'}</h2>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="grid grid-cols-2 gap-2.5">
            <Summary label="Route" value={routeStops.length ? routeStops.map((stop) => `${stop.city}${Number(stop.nights) ? ` (${stop.nights}N)` : ''}`).join(' → ') : destinations || 'Add destinations'} />
            <Summary label="Duration" value={`${days || 0} days / ${nights || 0} nights`} />
            <Summary label="Travelers" value={`${adults || 0} adults${children ? ` · ${children} children${childrenAges.length ? ` (ages ${childrenAges.join(', ')})` : ''}` : ''}`} />
            <Summary label="Travel dates" value={dates || 'To be confirmed'} />
          </div>

          {customerName && <div className="rounded-xl bg-slate-50 px-3.5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Prepared for</p>
            <p className="mt-1 text-sm font-bold text-[#1B2A4A]">{customerName}</p>
          </div>}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#1B2A4A]">Day-by-day</h3>
              <span className="rounded-full bg-[#F8F3E8] px-2.5 py-1 text-[10px] font-bold text-[#8A692A]">{dayPlan.length} days</span>
            </div>
            {dayPlan.length ? <ol className="space-y-0">
              {dayPlan.map((day, index) => (
                <li key={`${day.dayNumber || index}-${day.title}`} className="relative flex gap-3 border-l border-slate-200 pb-4 pl-4 last:border-l-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#C99A3B] ring-1 ring-[#C99A3B]/30" />
                  {day.image?.url && <img src={day.image.url} alt="" className="h-16 w-28 shrink-0 rounded-lg bg-slate-100 object-contain" />}
                  <div className="min-w-0">
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#A47D32]">Day {day.dayNumber || index + 1}{day.overnight ? ` · ${day.overnight}` : ''}</p>
                    <p className="mt-0.5 text-xs font-bold leading-snug text-[#1B2A4A]">{day.shortTitle || day.title || 'Add a day title'}</p>
                    {day.activities?.find((activity) => activity?.trim()) && <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500">{day.activities.find((activity) => activity?.trim())}</p>}
                    {(day.meals?.length > 0 || day.transfer) && <p className="mt-1 text-[10px] text-slate-400">{[day.meals?.length ? `Meals: ${day.meals.join(', ')}` : '', day.transfer].filter(Boolean).join(' · ')}</p>}
                  </div>
                </li>
              ))}
            </ol> : <p className="rounded-xl border border-dashed border-slate-200 p-4 text-xs text-slate-400">Add days to see the itinerary outline here.</p>}
          </div>

          <div className="rounded-xl bg-[#13224A] p-4 text-white">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#E7C77D]">Estimated investment</p>
                <p className="mt-1 text-[11px] text-white/65">{travelerCount} travelers · {pricing.currency || 'INR'}</p>
              </div>
              <p className="text-right text-xl font-black">{(pricing.currency || 'INR')} {total.toLocaleString('en-IN')}</p>
            </div>
            <div className="mt-3 flex justify-between border-t border-white/15 pt-3 text-[11px] text-white/75">
              <span>Per person incl. tax</span>
              <strong className="text-white">{(pricing.currency || 'INR')} {perPerson.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Summary({ label, value }) {
  return <div className="min-w-0 rounded-xl border border-slate-100 bg-white px-3 py-2.5">
    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
    <p className="mt-1 break-words text-xs font-bold leading-snug text-[#1B2A4A]">{value}</p>
  </div>;
}
