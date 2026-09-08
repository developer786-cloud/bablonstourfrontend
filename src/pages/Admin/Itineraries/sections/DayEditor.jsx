const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner'];

export default function DayEditor({ day, index, setDayPlan }) {
  function updateField(field, value) {
    setDayPlan((prev) => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
  }
  function updateActivity(actIndex, value) {
    setDayPlan((prev) =>
      prev.map((d, i) =>
        i === index ? { ...d, activities: d.activities.map((a, ai) => (ai === actIndex ? value : a)) } : d
      )
    );
  }
  function addActivity() {
    setDayPlan((prev) => prev.map((d, i) => (i === index ? { ...d, activities: [...d.activities, ''] } : d)));
  }
  function removeActivity(actIndex) {
    setDayPlan((prev) =>
      prev.map((d, i) => (i === index ? { ...d, activities: d.activities.filter((_, ai) => ai !== actIndex) } : d))
    );
  }
  function toggleMeal(meal) {
    setDayPlan((prev) =>
      prev.map((d, i) => {
        if (i !== index) return d;
        const has = d.meals.includes(meal);
        return { ...d, meals: has ? d.meals.filter((m) => m !== meal) : [...d.meals, meal] };
      })
    );
  }

  return (
    <div className={`flex flex-col gap-2.5 ${index > 0 ? 'border-t border-dashed border-[#ECE4D0] pt-4 mt-1' : ''}`}>
      <span className="text-[11px] font-bold uppercase tracking-wide text-[#D4A24C]">Day {day.dayNumber}</span>

      <input
        className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"
        placeholder="Arrival in Dubai"
        value={day.title}
        onChange={(e) => updateField('title', e.target.value)}
      />
      <textarea
        rows="2"
        className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"
        placeholder="Short description of the day"
        value={day.description}
        onChange={(e) => updateField('description', e.target.value)}
      />

      <span className="text-xs font-semibold text-gray-500">Activities</span>
      {day.activities.map((a, ai) => (
        <div key={ai} className="flex items-center gap-2">
          <input
            className="flex-1 rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"
            placeholder="Desert safari with BBQ dinner"
            value={a}
            onChange={(e) => updateActivity(ai, e.target.value)}
          />
          <button className="text-red-500 text-lg" onClick={() => removeActivity(ai)}>
            ×
          </button>
        </div>
      ))}
      <button className="self-start text-xs font-bold text-[#1B2A4A] underline" onClick={addActivity}>
        + Add activity
      </button>

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
    </div>
  );
}
