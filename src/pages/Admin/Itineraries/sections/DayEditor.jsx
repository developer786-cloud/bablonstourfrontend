const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner'];

import { useState } from 'react';

export default function DayEditor({ day, index, dayCount, setDayPlan, ImageUploader, onEdit = () => {}, onDuplicate = () => {} }) {
  const [expanded, setExpanded] = useState(true);
  function updateField(field, value) {
    onEdit();
    setDayPlan((prev) => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
  }
  function updateActivities(value) {
    onEdit();
    const activities = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    setDayPlan((prev) => prev.map((d, i) => (i === index ? { ...d, activities } : d)));
  }
  function toggleMeal(meal) {
    onEdit();
    setDayPlan((prev) =>
      prev.map((d, i) => {
        if (i !== index) return d;
        const has = d.meals.includes(meal);
        return { ...d, meals: has ? d.meals.filter((m) => m !== meal) : [...d.meals, meal] };
      })
    );
  }

  function move(offset) {
    onEdit();
    setDayPlan((prev) => {
      const target = index + offset;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((item, i) => ({ ...item, dayNumber: i + 1 }));
    });
  }
  function duplicate() {
    if (dayCount >= 60) return;
    onEdit();
    onDuplicate(Boolean(day.overnight));
    setDayPlan((prev) => [...prev.slice(0, index + 1), { ...day, activities: [...day.activities], meals: [...day.meals], image: { ...(day.image || {}) } }, ...prev.slice(index + 1)].map((item, i) => ({ ...item, dayNumber: i + 1 })));
  }

  return (
    <div className={`flex flex-col gap-2.5 ${index > 0 ? 'border-t border-dashed border-[#ECE4D0] pt-4 mt-1' : ''}`}>
      <div className="flex items-center gap-2"><button type="button" className="mr-auto text-left text-[11px] font-bold uppercase tracking-wide text-[#D4A24C]" onClick={() => setExpanded((value) => !value)}>Day {day.dayNumber}: {day.shortTitle || day.title || 'Untitled'} {expanded ? '−' : '+'}</button><button type="button" onClick={() => move(-1)} disabled={index === 0} className="rounded border px-2 py-1 text-xs disabled:opacity-40">↑</button><button type="button" onClick={() => move(1)} disabled={index === dayCount - 1} className="rounded border px-2 py-1 text-xs disabled:opacity-40">↓</button><button type="button" onClick={duplicate} disabled={dayCount >= 60} className="rounded border px-2 py-1 text-xs disabled:opacity-40">Duplicate</button></div>
      {expanded && <>

      <input
        className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"
        placeholder="e.g. Arrive in Almaty"
        value={day.title}
        onChange={(e) => updateField('title', e.target.value)}
      />
      <input className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]" placeholder="Short title for overview (optional)" maxLength={60} value={day.shortTitle || ''} onChange={(e) => updateField('shortTitle', e.target.value)} />
      <input className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]" placeholder="Overnight city (optional)" value={day.overnight || ''} onChange={(e) => updateField('overnight', e.target.value)} />
      <textarea
        rows="2"
        className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"
        placeholder="Short description of the day"
        value={day.description}
        onChange={(e) => updateField('description', e.target.value)}
      />
      <input className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]" placeholder="Transfer / intercity travel (optional)" value={day.transfer || ''} onChange={(e) => updateField('transfer', e.target.value)} />

      <label className="flex flex-col gap-1 text-xs font-semibold text-gray-500">Activities <span className="font-normal">Enter one activity per line</span>
        <textarea rows={5} className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm font-normal text-[#1B2A4A]" placeholder={'Guided city walk\nVisit the local market\nDinner at a local restaurant'} value={(day.activities || []).join('\n')} onChange={(e) => updateActivities(e.target.value)} />
      </label>

      <input
        className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"
        placeholder="Hotel name"
        value={day.hotel}
        onChange={(e) => updateField('hotel', e.target.value)}
      />

      <div className="flex gap-2">
        {MEAL_OPTIONS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => toggleMeal(m)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
              day.meals.includes(m) ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]' : 'border-[#E4DCC8] text-gray-600'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1 text-xs font-semibold text-gray-500">Day photo URL (optional)
        <input type="url" inputMode="url" placeholder="https://example.com/image.jpg" value={day.image?.url || ''} onChange={(event) => updateField('image', { ...(day.image || {}), url: event.target.value, publicId: '' })} className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]" />
      </label>
      <p className="text-[11px] text-gray-500">Paste a public HTTPS URL that opens directly to an image, or upload a photo. Any host is supported.</p>
      {day.image?.url && <img src={day.image.url} alt={day.image.alt || `Day ${day.dayNumber}`} className="max-h-48 w-full rounded-lg bg-slate-100 object-contain" />}
      {ImageUploader && <ImageUploader buttonLabel="Upload day photo" defaultFolder="itineraries" allowedFolders={['itineraries']} onUploaded={(image) => updateField('image', image)} />}
      </>}
    </div>
  );
}
