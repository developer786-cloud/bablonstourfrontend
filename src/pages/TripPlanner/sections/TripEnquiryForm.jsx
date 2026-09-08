import { useState } from 'react';
import tripEnquiryService from '../../../services/tripEnquiryService';

const BUDGET_OPTIONS = ['Under 50,000', '50,000 - 1,00,000', '1,00,000 - 2,00,000', '2,00,000+'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  city: '',
  destinations: [],
  destinationInput: '',
  days: 5,
  nights: 4,
  adults: 2,
  children: [],
  budget: '',
  travelMonth: '',
  notes: ''
};

function inputClass(hasError) {
  return `w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#1B2A4A] outline-none transition-colors focus:border-[#D4A24C] ${
    hasError ? 'border-red-400' : 'border-[#E4DCC8]'
  }`;
}

export default function TripEnquiryForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const totalSteps = 3;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  }

  function addDestination() {
    const val = form.destinationInput.trim();
    if (!val || form.destinations.includes(val)) return update('destinationInput', '');
    setForm((f) => ({ ...f, destinations: [...f.destinations, val], destinationInput: '' }));
    if (errors.destinations) setErrors((e) => ({ ...e, destinations: null }));
  }
  function removeDestination(dest) {
    setForm((f) => ({ ...f, destinations: f.destinations.filter((d) => d !== dest) }));
  }
  function addChild() {
    setForm((f) => ({ ...f, children: [...f.children, { age: 5 }] }));
  }
  function updateChildAge(index, age) {
    setForm((f) => ({ ...f, children: f.children.map((c, i) => (i === index ? { ...c, age: Number(age) } : c)) }));
  }
  function removeChild(index) {
    setForm((f) => ({ ...f, children: f.children.filter((_, i) => i !== index) }));
  }

  function validateStep1() {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email';
    if (!form.city.trim()) e.city = 'Please enter your city';
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function validateStep2() {
    const e = {};
    if (form.destinations.length === 0) e.destinations = 'Add at least one destination';
    if (!form.days || form.days < 1) e.days = 'Enter number of days';
    if (!form.adults || form.adults < 1) e.adults = 'At least 1 adult is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => Math.min(s + 1, totalSteps));
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError('');
    try {
      await tripEnquiryService.create({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        destinations: form.destinations,
        days: Number(form.days),
        nights: Number(form.nights),
        travelers: { adults: Number(form.adults), children: form.children },
        budget: form.budget,
        travelMonth: form.travelMonth,
        notes: form.notes.trim()
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-[#ECE4D0] p-10 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4A24C] text-[#1B2A4A] flex items-center justify-center text-2xl font-bold">
          ✓
        </div>
        <h2 className="text-xl font-semibold text-[#1B2A4A]">Thanks, {form.name.split(' ')[0]}!</h2>
        <p className="mt-2 text-sm text-gray-500">
          Our travel expert is putting together your itinerary and will reach out on {form.phone} shortly.
        </p>
        <button
          className="mt-6 rounded-lg border border-[#E4DCC8] px-5 py-2.5 text-sm font-semibold text-[#1B2A4A]"
          onClick={() => {
            setForm(emptyForm);
            setStep(1);
            setSubmitted(false);
          }}
        >
          Plan another trip
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-[#ECE4D0] overflow-hidden">
      <div className="bg-[#1B2A4A] text-[#FAF7F0] px-7 pt-7 pb-6">
        <h2 className="text-xl font-semibold">Tell us about your trip</h2>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= n ? 'bg-[#D4A24C] text-[#1B2A4A] font-bold' : 'bg-white/10 text-white/50'
              }`}
            >
              {n}
            </div>
          ))}
        </div>
      </div>

      <div className="px-7 pt-7 pb-2 flex flex-col gap-5">
        {step === 1 && (
          <>
            <Field label="Full name" error={errors.name}>
              <input className={inputClass(errors.name)} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Rohit Mehra" />
            </Field>
            <Field label="Phone number" error={errors.phone}>
              <input className={inputClass(errors.phone)} value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="98765 43210" />
            </Field>
            <Field label="Email" error={errors.email}>
              <input className={inputClass(errors.email)} value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
            </Field>
            <Field label="Your city" error={errors.city}>
              <input className={inputClass(errors.city)} value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="New Delhi" />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Where do you want to go?" error={errors.destinations}>
              <div className="flex gap-2">
                <input
                  className={inputClass(errors.destinations)}
                  value={form.destinationInput}
                  onChange={(e) => update('destinationInput', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDestination())}
                  placeholder="Type a city or country, press Enter"
                />
                <button type="button" onClick={addDestination} className="shrink-0 rounded-lg bg-[#1B2A4A] text-white text-xs font-semibold px-4">
                  Add
                </button>
              </div>
              {form.destinations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.destinations.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1.5 bg-[#EFE6D3] text-[#8a6a2f] text-xs font-semibold px-3 py-1.5 rounded-full">
                      {d}
                      <button type="button" onClick={() => removeDestination(d)} aria-label={`Remove ${d}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Days" error={errors.days}>
                <input type="number" min="1" className={inputClass(errors.days)} value={form.days} onChange={(e) => update('days', e.target.value)} />
              </Field>
              <Field label="Nights">
                <input type="number" min="0" className={inputClass()} value={form.nights} onChange={(e) => update('nights', e.target.value)} />
              </Field>
            </div>

            <Field label="Adults" error={errors.adults}>
              <div className="flex items-center gap-4">
                <button type="button" className="w-8 h-8 rounded-md border border-[#E4DCC8]" onClick={() => update('adults', Math.max(1, form.adults - 1))}>
                  −
                </button>
                <span className="font-bold">{form.adults}</span>
                <button type="button" className="w-8 h-8 rounded-md border border-[#E4DCC8]" onClick={() => update('adults', form.adults + 1)}>
                  +
                </button>
              </div>
            </Field>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-gray-600 mb-2">
                <span>Children</span>
                <button type="button" onClick={addChild} className="text-[#1B2A4A] underline">
                  + Add child
                </button>
              </div>
              {form.children.map((c, i) => (
                <div key={i} className="flex items-center gap-3 mb-2 text-sm">
                  <span className="text-gray-500 min-w-[80px]">Child {i + 1} age</span>
                  <input type="number" min="0" max="17" className="w-20 rounded-lg border border-[#E4DCC8] px-2.5 py-1.5" value={c.age} onChange={(e) => updateChildAge(i, e.target.value)} />
                  <button type="button" className="text-red-500 text-lg" onClick={() => removeChild(i)}>
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Travel month (optional)">
                <select className={inputClass()} value={form.travelMonth} onChange={(e) => update('travelMonth', e.target.value)}>
                  <option value="">Any month</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Budget (optional)">
                <select className={inputClass()} value={form.budget} onChange={(e) => update('budget', e.target.value)}>
                  <option value="">Any budget</option>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </Field>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-sm font-semibold text-[#1B2A4A]">Review your details</h3>
            <div className="bg-[#FBF8F0] border border-[#ECE4D0] rounded-xl p-4 flex flex-col gap-2 text-sm">
              <SummaryRow label="Name" value={form.name} />
              <SummaryRow label="Contact" value={`${form.phone} · ${form.email}`} />
              <SummaryRow label="Destinations" value={form.destinations.join(', ')} />
              <SummaryRow label="Duration" value={`${form.nights}N / ${form.days}D`} />
              <SummaryRow label="Travelers" value={`${form.adults} Adults${form.children.length ? `, ${form.children.length} Children` : ''}`} />
              {form.budget && <SummaryRow label="Budget" value={form.budget} />}
              {form.travelMonth && <SummaryRow label="Month" value={form.travelMonth} />}
            </div>
            <Field label="Anything else we should know? (optional)">
              <textarea rows="3" className={inputClass()} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Honeymoon trip, vegetarian food, etc." />
            </Field>
            {submitError && <p className="text-red-500 text-xs font-semibold">{submitError}</p>}
          </>
        )}
      </div>

      <div className="flex justify-between gap-3 px-7 py-6">
        {step > 1 && (
          <button className="rounded-lg border border-[#E4DCC8] px-5 py-2.5 text-sm font-semibold text-[#1B2A4A]" onClick={goBack} disabled={submitting}>
            Back
          </button>
        )}
        {step < totalSteps && (
          <button className="ml-auto rounded-lg bg-[#D4A24C] px-5 py-2.5 text-sm font-bold text-[#1B2A4A]" onClick={goNext}>
            Continue
          </button>
        )}
        {step === totalSteps && (
          <button className="ml-auto rounded-lg bg-[#D4A24C] px-5 py-2.5 text-sm font-bold text-[#1B2A4A] disabled:opacity-60" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Get my free itinerary'}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-600">
      {label}
      {children}
      {error && <span className="text-red-500 font-medium">{error}</span>}
    </label>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-gray-400">{label}</span>
      <strong className="text-[#1B2A4A] text-right">{value}</strong>
    </div>
  );
}
