import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import tripEnquiryService from '../../../services/tripEnquiryService';
import itineraryService from '../../../services/itineraryService';
import DayEditor from './sections/DayEditor';
import ItineraryPreview from './sections/ItineraryPreview';
import { ADMIN_ROUTES } from '../../../constants/routes';

function blankDay(dayNumber) {
  return { dayNumber, title: '', description: '', activities: [''], hotel: '', meals: [] };
}

export default function ItineraryBuilderPage() {
  const [searchParams] = useSearchParams();
  const enquiryId = searchParams.get('enquiry') || searchParams.get('enquiryId');
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState(null);
  const [itineraryId, setItineraryId] = useState(null);
  const [title, setTitle] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [destinations, setDestinations] = useState('');
  const [days, setDays] = useState(5);
  const [nights, setNights] = useState(4);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [dayPlan, setDayPlan] = useState(Array.from({ length: 5 }, (_, i) => blankDay(i + 1)));
  const [pricing, setPricing] = useState({
    perPersonCost: 0,
    totalCost: 0,
    currency: 'INR',
    inclusions: ['Hotel stay', 'Daily breakfast', 'Airport transfers'],
    exclusions: ['Flights', 'Visa fees', 'Personal expenses']
  });
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [loadingEnquiry, setLoadingEnquiry] = useState(!!enquiryId);

  useEffect(() => {
    if (!enquiryId) return;
    (async () => {
      try {
        const lead = await tripEnquiryService.get(enquiryId);
        setEnquiry(lead);
        setTitle(`${lead.destinations.join(' + ')} Trip`);
        setCustomerName(lead.name);
        setDestinations(lead.destinations.join(', '));
        setDays(lead.days);
        setNights(lead.nights);
        setAdults(lead.travelers.adults);
        setChildren(lead.travelers.children?.length || 0);
        setDayPlan(Array.from({ length: lead.days }, (_, i) => blankDay(i + 1)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingEnquiry(false);
      }
    })();
  }, [enquiryId]);

  function syncDayCount(newDays) {
    setDays(newDays);
    setDayPlan((prev) => {
      const arr = [...prev];
      if (newDays > arr.length) {
        for (let i = arr.length; i < newDays; i++) arr.push(blankDay(i + 1));
      } else {
        arr.length = newDays;
      }
      return arr;
    });
  }

  function buildPayload() {
    return {
      enquiry: enquiry?._id || null,
      title,
      customerName,
      destinations: destinations.split(',').map((d) => d.trim()).filter(Boolean),
      days: Number(days),
      nights: Number(nights),
      travelers: { adults: Number(adults), children: Number(children) },
      days_plan: dayPlan.map((d) => ({ ...d, activities: d.activities.filter((a) => a.trim()) })),
      pricing: {
        ...pricing,
        perPersonCost: Number(pricing.perPersonCost),
        totalCost: Number(pricing.totalCost),
        inclusions: pricing.inclusions.filter((i) => i.trim()),
        exclusions: pricing.exclusions.filter((i) => i.trim())
      }
    };
  }

  async function handleSave() {
    setSaving(true);
    setSaveMessage('');
    try {
      const payload = buildPayload();
      let savedItinerary;
      if (itineraryId) {
        savedItinerary = await itineraryService.update(itineraryId, payload);
      } else {
        savedItinerary = await itineraryService.create(payload);
        setItineraryId(savedItinerary._id);
      }
      setTimeout(() => setSaveMessage(''), 2000);
      setSaveMessage('Saved');
      return savedItinerary._id;
    } catch (err) {
      setSaveMessage(err?.response?.data?.message || 'Could not save');
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerate(type) {
    const savedItineraryId = await handleSave();
    if (savedItineraryId) await itineraryService.downloadAsBlob(savedItineraryId, type);
  }

  if (loadingEnquiry) {
    return <p className="py-16 text-center text-gray-400">Loading enquiry…</p>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-7 items-start">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-[#1B2A4A]">
              {enquiry ? `Itinerary for ${enquiry.name}` : 'New itinerary'}
            </h1>
            <p className="text-sm text-gray-400 mt-1">Build the day-wise plan and pricing, then generate the document.</p>
          </div>
          <button
            className="rounded-lg border border-[#E4DCC8] px-4 py-2.5 text-sm font-semibold text-[#1B2A4A]"
            onClick={() => navigate(ADMIN_ROUTES.ENQUIRIES)}
          >
            Back to enquiries
          </button>
        </div>

        <Section title="Trip overview">
          <TextField label="Title" value={title} onChange={setTitle} />
          <TextField label="Customer name" value={customerName} onChange={setCustomerName} />
          <TextField label="Destinations (comma separated)" value={destinations} onChange={setDestinations} />
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Days" value={days} onChange={syncDayCount} min={1} />
            <NumberField label="Nights" value={nights} onChange={setNights} min={0} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Adults" value={adults} onChange={setAdults} min={1} />
            <NumberField label="Children" value={children} onChange={setChildren} min={0} />
          </div>
        </Section>

        <Section title="Day-wise plan">
          {dayPlan.map((day, index) => (
            <DayEditor key={index} day={day} index={index} setDayPlan={setDayPlan} />
          ))}
        </Section>

        <Section title="Pricing">
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Per person cost" value={pricing.perPersonCost} onChange={(v) => setPricing((p) => ({ ...p, perPersonCost: v }))} />
            <NumberField label="Total cost" value={pricing.totalCost} onChange={(v) => setPricing((p) => ({ ...p, totalCost: v }))} />
          </div>
          <ListField label="Inclusions" items={pricing.inclusions} field="inclusions" setPricing={setPricing} />
          <ListField label="Exclusions" items={pricing.exclusions} field="exclusions" setPricing={setPricing} />
        </Section>

        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-[#E4DCC8] px-4 py-2.5 text-sm font-semibold text-[#1B2A4A]" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save draft'}
          </button>
          <button className="rounded-lg bg-[#D4A24C] text-[#1B2A4A] font-bold text-sm px-4 py-2.5" onClick={() => handleGenerate('pdf')}>
            Generate PDF
          </button>
          <button className="rounded-lg bg-[#D4A24C] text-[#1B2A4A] font-bold text-sm px-4 py-2.5" onClick={() => handleGenerate('docx')}>
            Generate DOCX
          </button>
          {saveMessage && <span className="text-xs font-semibold text-green-700">{saveMessage}</span>}
        </div>
      </div>

      <div className="sticky top-6">
        <ItineraryPreview
          title={title}
          destinations={destinations}
          nights={nights}
          days={days}
          adults={adults}
          children={children}
          dayPlan={dayPlan}
          pricing={pricing}
        />
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="bg-white border border-[#ECE4D0] rounded-xl p-5 flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-[#1B2A4A]">{title}</h3>
      {children}
    </section>
  );
}

function TextField({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-500">
      {label}
      <input
        className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function NumberField({ label, value, onChange, min = 0 }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-500">
      {label}
      <input
        type="number"
        min={min}
        className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function ListField({ label, items, field, setPricing }) {
  function update(i, val) {
    setPricing((p) => ({ ...p, [field]: p[field].map((v, idx) => (idx === i ? val : v)) }));
  }
  function add() {
    setPricing((p) => ({ ...p, [field]: [...p[field], ''] }));
  }
  function remove(i) {
    setPricing((p) => ({ ...p, [field]: p[field].filter((_, idx) => idx !== i) }));
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold text-gray-500">{label}</span>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className="flex-1 rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]" value={item} onChange={(e) => update(i, e.target.value)} />
          <button className="text-red-500 text-lg" onClick={() => remove(i)}>
            ×
          </button>
        </div>
      ))}
      <button className="self-start text-xs font-bold text-[#1B2A4A] underline" onClick={add}>
        + Add {label.toLowerCase().slice(0, -1)}
      </button>
    </div>
  );
}
