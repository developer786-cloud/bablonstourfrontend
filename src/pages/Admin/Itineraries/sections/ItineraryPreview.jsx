export default function ItineraryPreview({ title, destinations, nights, days, adults, children, dayPlan, pricing }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2.5">Live preview</h3>
      <div className="bg-[#FAF7F0] border border-[#ECE4D0] rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="text-lg font-bold text-[#1B2A4A]">{title || 'Untitled itinerary'}</div>
        <div className="text-xs text-gray-400 mt-0.5">
          {destinations || 'Destinations'} · {nights}N/{days}D
        </div>
        <div className="text-xs text-gray-400">
          {adults} Adults{children > 0 ? `, ${children} Children` : ''}
        </div>

        {dayPlan.map((d, i) => (
          <div key={i} className="flex gap-3 mt-4 pt-3.5 border-t border-[#ECE4D0]">
            <div className="min-w-[52px] text-[11px] font-bold text-[#D4A24C]">Day {d.dayNumber}</div>
            <div>
              <strong className="text-sm text-[#1B2A4A]">{d.title || 'Untitled day'}</strong>
              {d.description && <p className="text-xs text-gray-500 mt-1">{d.description}</p>}
              {d.activities.filter((a) => a.trim()).length > 0 && (
                <ul className="text-xs text-gray-500 mt-1 pl-4 list-disc">
                  {d.activities.filter((a) => a.trim()).map((a, ai) => (
                    <li key={ai}>{a}</li>
                  ))}
                </ul>
              )}
              <div className="flex gap-3.5 text-[11px] text-gray-400 mt-1">
                {d.hotel && <span>{d.hotel}</span>}
                {d.meals.length > 0 && <span>{d.meals.join(', ')}</span>}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 pt-3.5 border-t-2 border-dashed border-[#D4A24C] flex justify-between text-sm">
          <div>
            Per person <strong>{pricing.currency} {Number(pricing.perPersonCost || 0).toLocaleString()}</strong>
          </div>
          <div>
            Total <strong>{pricing.currency} {Number(pricing.totalCost || 0).toLocaleString()}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
