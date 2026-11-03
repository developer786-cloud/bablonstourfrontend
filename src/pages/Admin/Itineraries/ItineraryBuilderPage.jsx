import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import tripEnquiryService from '../../../services/tripEnquiryService';
import itineraryService from '../../../services/itineraryService';
import DayEditor from './sections/DayEditor';
import ItineraryPreview from './sections/ItineraryPreview';
import { ADMIN_ROUTES } from '../../../constants/routes';
import itineraryTemplateService from '../../../services/itineraryTemplateService';
import { inquiryService } from '../../../services/inquiryService';
import ImageUploader from '../../../components/admin/ImageUploader';
import PipeRowEditor from './sections/PipeRowEditor';

function blankDay(dayNumber) {
  return { dayNumber, title: '', shortTitle: '', overnight: '', description: '', activities: [''], hotel: '', meals: [], image: { url: '', publicId: '', alt: '' } };
}
function parseDestinationList(value = '') {
  return String(value).split(/[,>→]+/).map((city) => city.trim()).filter(Boolean);
}

const DEFAULT_POLICIES = {
  child: 'CNB (ages 4–6): no extra bed. CWB (ages 7–11): child rate applies. Ages 12 and above use the adult rate. Confirm supplier age rules and pricing.',
  payment: 'Payment milestones and due dates are listed in the customer-specific quotation.',
  cancellation: 'Cancellation terms depend on the selected suppliers and are shared before confirmation.',
  checkInOut: 'Hotel check-in and check-out follow the selected property policy. Early check-in and late check-out are subject to availability.',
  visa: '', travelDocuments: '', importantInformation: 'Services remain subject to availability until confirmed in writing.'
};
const mergePolicies = (policies = {}) => ({ ...DEFAULT_POLICIES, ...Object.fromEntries(Object.entries(policies).filter(([, value]) => String(value || '').trim())) });

const defaultPricing = () => ({
  perPersonCost: 0, totalCost: 0, basePrice: 0, childBasePrice: null, gstPercentage: 5,
  flightCost: 0, currency: 'INR', inclusions: ['Hotel stay', 'Daily breakfast', 'Airport transfers'],
  exclusions: ['Flights', 'Visa fees', 'Personal expenses']
});
const defaultDetails = () => ({
  customerContact: '', startDate: '', endDate: '', packageName: '', destinationRefs: [],
  destinationIntroduction: '', destinationHighlightsText: '', packageHighlightsText: '',
  destinationPhotosText: '', hotelsText: '', transferDetailsText: '', optionalActivitiesText: '',
  pendingServicesText: '', policies: { ...DEFAULT_POLICIES }, closingMessage: ''
});

function parseAmountRows(value) {
  return value.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => Number(line.split('|')[1]?.trim() || 0)).filter(Number.isFinite);
}

export default function ItineraryBuilderPage() {
  const [searchParams] = useSearchParams();
  const { id: routeItineraryId } = useParams();
  const enquiryId = searchParams.get('enquiry') || searchParams.get('enquiryId');
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState(null);
  const [itineraryId, setItineraryId] = useState(null);
  const [title, setTitle] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [destinations, setDestinations] = useState('');
  const [countries, setCountries] = useState('');
  const [routeStops, setRouteStops] = useState([]);
  const [days, setDays] = useState(5);
  const [nights, setNights] = useState(4);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [dayPlan, setDayPlan] = useState(Array.from({ length: 5 }, (_, i) => blankDay(i + 1)));
  const [pricing, setPricing] = useState(defaultPricing);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState(false);
  const [loadingEnquiry, setLoadingEnquiry] = useState(Boolean(routeItineraryId || enquiryId));
  const [enquiryType, setEnquiryType] = useState('trip');
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateCountry, setTemplateCountry] = useState('');
  const [templateDestination, setTemplateDestination] = useState('');
  const [templateDays, setTemplateDays] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [sourceTemplate, setSourceTemplate] = useState(null);
  const [designKey, setDesignKey] = useState('proposal');
  const [coverImage, setCoverImage] = useState({ url: '', publicId: '', alt: '' });
  const [showChildrenAges, setShowChildrenAges] = useState(false);
  const [pdfImageWarnings, setPdfImageWarnings] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [details, setDetails] = useState(defaultDetails);
  const [pricingExtras, setPricingExtras] = useState({ additionalChargesText: '', discountsText: '', paymentScheduleText: '', pricingNotes: '', priceStatus: 'estimate' });

  const travelerCount = Math.max(1, Number(adults) + Number(children));
  const perPersonBase = Number(pricing.basePrice ?? pricing.perPersonCost ?? 0);
  const gstPercentage = Number(pricing.gstPercentage ?? 5);
  const basePriceCents = Math.round(perPersonBase * 100);
  const gstCents = Math.round(basePriceCents * gstPercentage / 100);
  const perPersonGst = gstCents / 100;
  const perPersonFinal = (basePriceCents + gstCents) / 100;
  const childBasePrice = pricing.childBasePrice == null || pricing.childBasePrice === '' ? perPersonBase : Number(pricing.childBasePrice);
  const childBaseCents = Math.round(childBasePrice * 100);
  const childGstCents = Math.round(childBaseCents * gstPercentage / 100);
  const childPerPersonFinal = (childBaseCents + childGstCents) / 100;
  const charges = parseAmountRows(pricingExtras.additionalChargesText).reduce((sum, amount) => sum + amount, 0);
  const discounts = parseAmountRows(pricingExtras.discountsText).reduce((sum, amount) => sum + amount, 0);
  const calculatedTotal = Math.max(0, Math.round((perPersonFinal * Number(adults) + childPerPersonFinal * Number(children) + Number(pricing.flightCost || 0) + charges - discounts) * 100) / 100);
  const routeNightTotal = routeStops.reduce((total, stop) => total + (Number(stop.nights) || 0), 0);
  const hotelNightTotal = details.hotelsText.split('\n').map((line) => Number(line.split('|')[6]?.trim() || 0)).filter(Number.isFinite).reduce((sum, value) => sum + value, 0);
  const travelDayDiff = details.startDate && details.endDate ? Math.round((Date.parse(`${details.endDate}T00:00:00Z`) - Date.parse(`${details.startDate}T00:00:00Z`)) / 86400000) + 1 : null;
  const readinessChecks = [
    !title.trim() ? 'Add a trip title.' : '',
    !parseDestinationList(destinations).length ? 'Add at least one destination.' : '',
    nights >= days ? 'Nights should be fewer than days.' : '',
    routeStops.some((stop) => stop.city?.trim()) && routeNightTotal !== Number(nights) ? `Route nights total ${routeNightTotal}; trip duration is ${nights}.` : '',
    details.hotelsText.trim() && hotelNightTotal !== Number(nights) ? `Hotel nights total ${hotelNightTotal}; trip duration is ${nights}.` : '',
    travelDayDiff != null && travelDayDiff !== Number(days) ? `Travel dates span ${travelDayDiff} days; itinerary is set to ${days} days.` : '',
    dayPlan.length !== Number(days) ? `There are ${dayPlan.length} daily plans for a ${days}-day trip.` : '',
    dayPlan.some((day) => !day.title?.trim()) ? 'Add a title for each itinerary day.' : '',
    dayPlan.some((day) => (day.activities || []).filter((activity) => activity.trim()).length > 8) ? 'A day has more than eight activity bullets; split long sightseeing plans across the day or add a continuation day.' : '',
    details.hotelsText.split('\n').some((line) => { const fields = line.split('|').map((value) => value.trim()); return fields.some(Boolean) && !fields[1] && !fields[2]; }) ? 'Add a hotel name or alternative for each hotel row.' : '',
    Number(calculatedTotal) === 0 ? 'Package total is zero.' : '',
    !details.hotelsText.trim() ? 'No hotel details have been added.' : '',
    children > 0 && childrenAges.some((age) => age !== '' && age != null) && childrenAges.filter((age) => age !== '' && age != null).length !== children ? 'Complete every child age or leave all ages blank.' : '',
    ...pdfImageWarnings.map((warning) => `Image URL could not be used in the PDF: ${warning.url}`)
  ].filter(Boolean);

  function hydrateItinerary(saved) {
    setPdfImageWarnings(saved.pdfImageWarnings || []);
    setItineraryId(saved._id);
    setTitle(saved.title || '');
    setCustomerName(saved.customerName || '');
    setDestinations((saved.destinations || []).join(', '));
    setCountries((saved.countries || []).join(', '));
    setRouteStops((saved.route || []).map((stop) => typeof stop === 'string' ? { city: stop, nights: 0 } : stop));
    setDays(saved.days || 1);
    setNights(saved.nights || 0);
    setAdults(saved.travelers?.adults || 1);
    setChildren(saved.travelers?.children || 0);
    setChildrenAges(saved.travelers?.childrenAges || []);
    setDayPlan((saved.days_plan || []).map((day, index) => ({ ...blankDay(index + 1), ...day, dayNumber: index + 1, activities: day.activities || [], meals: day.meals || [] })));
    const savedPricing = saved.pricing || {};
    const legacyPricing = savedPricing.basePrice == null && savedPricing.gstPercentage == null;
    setPricing((prev) => ({ ...prev, ...savedPricing, ...(legacyPricing ? { basePrice: savedPricing.perPersonCost || 0, gstPercentage: 0 } : {}) }));
    setSourceTemplate(saved.sourceTemplate?.template ? saved.sourceTemplate : null);
    setDesignKey(saved.designKey || 'detailed');
    setCoverImage(saved.coverImage || { url: '', publicId: '', alt: '' });
    setDetails({ customerContact: saved.customerContact || '', startDate: saved.travelDates?.start ? String(saved.travelDates.start).slice(0, 10) : '', endDate: saved.travelDates?.end ? String(saved.travelDates.end).slice(0, 10) : '', packageName: saved.packageName || '', destinationRefs: (saved.destinationRefs || []).map((item) => typeof item === 'object' ? item._id : item), destinationIntroduction: saved.destinationIntroduction || '', destinationHighlightsText: (saved.destinationHighlights || []).join('\n'), packageHighlightsText: (saved.packageHighlights || []).join('\n'), destinationPhotosText: (saved.destinationPhotos || []).map((item) => `${item.url} | ${item.caption || ''} | ${item.alt || ''}`).join('\n'), hotelsText: (saved.hotels || []).map((item) => [item.destination, item.name, item.alternative, item.roomType, item.occupancy, item.mealPlan, item.nights, item.confirmation].join(' | ')).join('\n'), transferDetailsText: (saved.transferDetails || []).map((item) => [item.route, item.type, item.notes, item.confirmation].join(' | ')).join('\n'), optionalActivitiesText: (saved.optionalActivities || []).map((item) => [item.name, item.price ?? '', item.notes].join(' | ')).join('\n'), pendingServicesText: (saved.pendingServices || []).join('\n'), policies: mergePolicies(saved.policies), closingMessage: saved.closingMessage || '' });
    setPricingExtras({ additionalChargesText: (saved.pricing?.additionalCharges || []).map((item) => `${item.label} | ${item.amount}`).join('\n'), discountsText: (saved.pricing?.discounts || []).map((item) => `${item.label} | ${item.amount}`).join('\n'), paymentScheduleText: (saved.pricing?.paymentSchedule || []).map((item) => `${item.label} | ${item.amount}`).join('\n'), pricingNotes: saved.pricing?.pricingNotes || '', priceStatus: saved.pricing?.priceStatus || 'estimate' });
  }



  useEffect(() => {
    const warn = (event) => { if (unsavedChanges) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [unsavedChanges]);

  useEffect(() => {
    if (routeItineraryId) {
      itineraryService.get(routeItineraryId).then(hydrateItinerary).catch((error) => { setSaveError(true); setSaveMessage(error?.response?.data?.message || 'Could not load itinerary'); }).finally(() => setLoadingEnquiry(false));
      return;
    }
    if (!enquiryId) return;
    (async () => {
      try {
        let lead;
        let leadType = 'trip';
        try {
          lead = await tripEnquiryService.get(enquiryId);
        } catch {
          lead = await inquiryService.get(enquiryId);
          leadType = 'inquiry';
          setEnquiryType('inquiry');
        }
        setEnquiry(lead);
        const savedId = lead.assignedItinerary;
        const saved = savedId ? await itineraryService.get(savedId).catch(() => null) : leadType === 'inquiry' ? await itineraryService.findByInquiry(enquiryId).catch(() => null) : await itineraryService.findByEnquiry(enquiryId).catch(() => null);
        if (saved) {
          hydrateItinerary(saved);
        } else {
          const places = lead.destinations || (lead.destination ? [lead.destination] : []);
          const travelerCount = lead.travelers?.adults ? lead.travelers : { adults: Number(lead.travelers) || 1, children: 0 };
          const tripDays = Number(lead.days) || (Number(lead.nights) + 1) || 5;
          setTitle(`${places.join(' + ') || 'Custom'} Trip`);
          setCustomerName(lead.name || lead.fullName || '');
          setDetails((prev) => ({ ...prev, customerContact: lead.phone || lead.email || '', startDate: lead.travelDate ? String(lead.travelDate).slice(0, 10) : '', packageName: lead.packageTitle || '' }));
          setDestinations(places.join(', '));
          setDays(tripDays);
          setNights(Number(lead.nights) || Math.max(0, tripDays - 1));
          setAdults(Number(travelerCount.adults) || 1);
          setChildren(Array.isArray(travelerCount.children) ? travelerCount.children.length : Number(travelerCount.children) || 0);
          setChildrenAges(Array.isArray(travelerCount.children) ? travelerCount.children.map((child) => Number(child.age)).filter(Number.isFinite) : []);
          setDayPlan(Array.from({ length: tripDays }, (_, i) => blankDay(i + 1)));
        }
      } catch (err) {
        console.error(err);
        setSaveError(true);
        setSaveMessage(err?.response?.data?.message || 'Could not load the enquiry details.');
      } finally {
        setLoadingEnquiry(false);
      }
    })();
  }, [enquiryId, routeItineraryId]);

  function syncDayCount(newDays) {
    const safeDays = Math.max(1, Math.min(60, Number(newDays) || 1));
    setDays(safeDays);
    setNights((current) => Math.min(current, safeDays - 1));
    setDayPlan((prev) => {
      const arr = [...prev];
      if (safeDays > arr.length) {
        for (let i = arr.length; i < safeDays; i++) arr.push(blankDay(i + 1));
      } else {
        arr.length = safeDays;
      }
      return arr.map((day, index) => ({ ...day, dayNumber: index + 1 }));
    });
  }

  function updateRouteStops(update) {
    setUnsavedChanges(true);
    setRouteStops((current) => {
      const next = typeof update === 'function' ? update(current) : update;
      setDestinations(next.map((stop) => stop.city).filter(Boolean).join(', '));
      return next;
    });
  }

  function updateDestinationText(value) {
    setDestinations(value);
    const cities = parseDestinationList(value);
    setRouteStops((current) => cities.map((city) => current.find((stop) => stop.city.toLowerCase() === city.toLowerCase()) || { city, nights: 0 }));
  }

  function buildPayload() {
    const parseRows = (value, mapRow) => value.split('\n')
      .map((line) => line.split('|').map((part) => part.trim()))
      .filter((parts) => parts.some(Boolean))
      .map(mapRow);
    return {
      enquiry: enquiryType === 'trip' ? enquiry?._id || null : null,
      inquiry: enquiryType === 'inquiry' ? enquiry?._id || null : null,
      title,
      customerName,
      coverImage: coverImage.url ? coverImage : undefined,
      customerContact: details.customerContact,
      travelDates: { start: details.startDate || null, end: details.endDate || null },
      packageName: details.packageName,
      destinations: parseDestinationList(destinations),
      countries: countries.split(',').map((value) => value.trim()).filter(Boolean),
      route: (routeStops.length ? routeStops : parseDestinationList(destinations).map((city) => ({ city, nights: 0 }))).map((stop) => ({ city: stop.city, nights: Number(stop.nights || 0) })),
      destinationRefs: details.destinationRefs || [],
      destinationIntroduction: details.destinationIntroduction,
      destinationHighlights: details.destinationHighlightsText.split('\n').map((item) => item.trim()).filter(Boolean),
      packageHighlights: details.packageHighlightsText.split('\n').map((item) => item.trim()).filter(Boolean),
      destinationPhotos: parseRows(details.destinationPhotosText, ([url, caption, alt]) => ({ url, caption, alt })).filter((item) => item.url),
      days: Number(days),
      nights: Number(nights),
      travelers: {
        adults: Number(adults), children: Number(children),
        childrenAges: childrenAges.length === Number(children) && childrenAges.every((age) => age !== '' && age != null)
          ? childrenAges.map(Number)
          : []
      },
      days_plan: dayPlan.map((d) => ({ ...d, activities: (d.activities || []).filter((a) => a.trim()) })),
      hotels: parseRows(details.hotelsText, ([destination, name, alternative, roomType, occupancy, mealPlan, nightsValue, confirmation]) => ({ destination, name, alternative, roomType, occupancy, mealPlan, nights: Number(nightsValue || 0), confirmation: confirmation || 'provisional' })),
      transferDetails: parseRows(details.transferDetailsText, ([route, type, notes, confirmation]) => ({ route, type, notes, confirmation: confirmation || 'provisional' })),
      optionalActivities: parseRows(details.optionalActivitiesText, ([name, price, notes]) => ({ name, price: price ? Number(price) : null, notes })),
      pendingServices: details.pendingServicesText.split('\n').map((item) => item.trim()).filter(Boolean),
      policies: details.policies,
      closingMessage: details.closingMessage,
      sourceTemplate,
      designKey,
      pricing: {
        ...pricing,
        basePrice: perPersonBase,
        childBasePrice: pricing.childBasePrice === '' ? null : pricing.childBasePrice ?? null,
        gstPercentage,
        gstAmount: perPersonGst,
        childGstAmount: childGstCents / 100,
        childPerPersonCost: childPerPersonFinal,
        perPersonCost: perPersonFinal,
        totalCost: calculatedTotal,
        totalPrice: calculatedTotal,
        additionalCharges: parseRows(pricingExtras.additionalChargesText, ([label, amount]) => ({ label, amount: Number(amount || 0) })),
        discounts: parseRows(pricingExtras.discountsText, ([label, amount]) => ({ label, amount: Number(amount || 0) })),
        paymentSchedule: parseRows(pricingExtras.paymentScheduleText, ([label, amount]) => ({ label, amount: Number(amount || 0) })),
        pricingNotes: pricingExtras.pricingNotes,
        priceStatus: pricingExtras.priceStatus,
        inclusions: pricing.inclusions.filter((i) => i.trim()),
        exclusions: pricing.exclusions.filter((i) => i.trim())
      }
    };
  }

  async function handleSave() {
    setSaving(true);
    setSaveMessage('');
    setSaveError(false);
    try {
      const payload = buildPayload();
      let savedItinerary;
      if (itineraryId) {
        savedItinerary = await itineraryService.update(itineraryId, payload);
      } else {
        savedItinerary = await itineraryService.create(payload);
        setItineraryId(savedItinerary._id);
      }
      setPdfImageWarnings(savedItinerary.pdfImageWarnings || []);
      setUnsavedChanges(false);
      window.setTimeout(() => setSaveMessage(''), 2000);
      setSaveMessage('Saved');
      return savedItinerary._id;
    } catch (err) {
      const data = err?.response?.data;
      const issues = Array.isArray(data?.errors)
        ? data.errors.map((issue) => [issue.path, issue.message].filter(Boolean).join(': ')).filter(Boolean)
        : [];
      setSaveError(true);
      setSaveMessage([data?.message || err?.message || 'Could not save', ...issues].join(' · '));
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerate(type) {
    if (saving || generating) return;
    setGenerating(true);
    try {
      const savedItineraryId = await handleSave();
      if (!savedItineraryId) return;
      await itineraryService.downloadAsBlob(savedItineraryId, type);
    } catch (error) {
      setSaveError(true);
      setSaveMessage(error?.response?.data?.message || `Could not generate ${type.toUpperCase()}`);
    } finally {
      setGenerating(false);
    }
  }

  async function handlePreviewPdf() {
    if (saving || generating) return;
    const previewWindow = window.open('about:blank', '_blank');
    if (!previewWindow) {
      setSaveError(true);
      setSaveMessage('Allow pop-ups for this site to preview the itinerary.');
      return;
    }
    previewWindow.opener = null;
    previewWindow.document.body.textContent = 'Preparing itinerary preview…';
    setGenerating(true);
    try {
      const savedId = await handleSave();
      if (!savedId) { previewWindow.close(); return; }
      const pdf = await itineraryService.pdfBlob(savedId);
      const pdfUrl = URL.createObjectURL(pdf);
      previewWindow.location.replace(pdfUrl);
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 10 * 60 * 1000);
    } catch (error) {
      previewWindow.close();
      setSaveError(true);
      setSaveMessage(error?.response?.data?.message || 'Could not load the itinerary preview.');
    } finally {
      setGenerating(false);
    }
  }

  async function openTemplatePicker() {
    try {
      const result = await itineraryTemplateService.list({ status: 'active', search: templateSearch, country: templateCountry || undefined, destination: templateDestination || undefined, days: templateDays || undefined, limit: 100 });
      setTemplates(result.items || []);
      setTemplatePickerOpen(true);
      setSelectedTemplate(null);
    } catch (error) { setSaveError(true); setSaveMessage(error?.response?.data?.message || 'Could not load templates'); }
  }

  function useSelectedTemplate() {
    if (!selectedTemplate) return;
    const hasContent = title || destinations || dayPlan.some((day) => day.title || day.description || day.activities.some((item) => item.trim()));
    if (hasContent && !window.confirm('Replace the current itinerary content with this template?')) return;
    const template = selectedTemplate;
    setUnsavedChanges(true);
    setTitle((current) => current.trim() ? current : template.name);
    setDestinations((template.route?.length ? template.route.map((stop) => typeof stop === 'string' ? stop : stop.city) : template.destinations || []).join(', '));
    setCountries((template.countries || []).join(', '));
    setRouteStops((template.route?.length ? template.route.map((stop) => typeof stop === 'string' ? { city: stop, nights: 0 } : stop) : (template.destinations || []).map((city) => ({ city, nights: 0 }))));
    setDays(template.days);
    setNights(template.nights);
    setDayPlan(Array.from({ length: template.days }, (_, index) => {
      const source = template.days_plan?.[index] || blankDay(index + 1);
      return { ...blankDay(index + 1), ...source, dayNumber: index + 1, activities: [...(source.activities || [])], meals: [...(source.meals || [])] };
    }));
    setPricing((prev) => ({
      ...defaultPricing(),
      currency: prev.currency || 'INR',
      inclusions: [...(template.inclusions || defaultPricing().inclusions)],
      exclusions: [...(template.exclusions || defaultPricing().exclusions)]
    }));
    const linkedDestinations = template.destinationRefs || [];
    const destinationIntro = template.destinationIntroduction || linkedDestinations.map((item) => item.overview || item.shortDescription).filter(Boolean).join('\n\n');
    const destinationHighlights = template.highlights?.length ? template.highlights : linkedDestinations.flatMap((item) => (item.attractions || []).map((attraction) => attraction.title).filter(Boolean));
    const destinationPhotos = template.destinationPhotos?.length ? template.destinationPhotos : linkedDestinations.flatMap((item) => [item.heroImage, ...(item.gallery || [])].filter((image) => image?.url).map((image) => ({ url: image.url, caption: image.alt || item.name, alt: image.alt || item.name })));
    const packageHighlights = template.packageHighlights || [];
    setDetails((prev) => ({ ...prev, destinationRefs: linkedDestinations.map((item) => typeof item === 'object' ? item._id : item), packageName: template.name, destinationIntroduction: destinationIntro, destinationHighlightsText: destinationHighlights.join('\n'), packageHighlightsText: packageHighlights.join('\n'), destinationPhotosText: destinationPhotos.map((item) => `${item.url} | ${item.caption || ''} | ${item.alt || ''}`).join('\n'), hotelsText: (template.hotels || []).map((item) => [item.destination, item.name, item.alternative, item.roomType, item.occupancy, item.mealPlan, item.nights, item.confirmation].join(' | ')).join('\n'), transferDetailsText: (template.transfers || []).map((item) => typeof item === 'string' ? `${item} | | | provisional` : [item.route, item.type, item.notes, item.confirmation || 'provisional'].join(' | ')).join('\n'), optionalActivitiesText: (template.optionalActivities || []).map((item) => [item.name, item.price ?? '', item.notes].join(' | ')).join('\n'), pendingServicesText: (template.pendingServices || []).join('\n'), policies: mergePolicies(template.policies), closingMessage: template.closingMessage || '' }));
    setPricingExtras({ additionalChargesText: '', discountsText: '', paymentScheduleText: '', pricingNotes: template.pricingNotes || '', priceStatus: 'estimate' });
    setSourceTemplate({ template: template._id, name: template.name, version: template.version, snapshot: { ...template } });
    setCoverImage(template.coverImage || { url: '', publicId: '', alt: '' });
    setTemplatePickerOpen(false);
  }

  function startBlank() {
    const hasContent = title || destinations || dayPlan.some((day) => day.title || day.description || day.activities.some((item) => item.trim()));
    if (hasContent && !window.confirm('Clear the current trip plan and start blank?')) return;
    const places = enquiry?.destinations || [enquiry?.destination].filter(Boolean);
    const startFromEnquiry = Boolean(enquiry && !itineraryId);
    const enquiryChildren = Array.isArray(enquiry?.travelers?.children)
      ? enquiry.travelers.children.length
      : Number(enquiry?.travelers?.children) || 0;
    setUnsavedChanges(true);
    setItineraryId(null);
    setTitle(startFromEnquiry ? `${places.join(' + ') || 'Custom'} Trip` : '');
    setCustomerName(startFromEnquiry ? (enquiry.name || enquiry.fullName || '') : '');
    setDestinations(startFromEnquiry ? places.join(', ') : '');
    setCountries('');
    setRouteStops(startFromEnquiry ? places.map((city) => ({ city, nights: 0 })) : []);
    setDays(5);
    setNights(4);
    setAdults(startFromEnquiry ? (Number(enquiry.travelers?.adults) || Number(enquiry.travelers) || 2) : 2);
    setChildren(startFromEnquiry ? enquiryChildren : 0);
    setChildrenAges(startFromEnquiry && Array.isArray(enquiry?.travelers?.children)
      ? enquiry.travelers.children.map((child) => Number(child.age)).filter(Number.isFinite)
      : []);
    setShowChildrenAges(false);
    setDetails({ ...defaultDetails(), customerContact: startFromEnquiry ? (enquiry.phone || enquiry.email || '') : '' });
    setPricing(defaultPricing());
    setPricingExtras({ additionalChargesText: '', discountsText: '', paymentScheduleText: '', pricingNotes: '', priceStatus: 'estimate' });
    setCoverImage({ url: '', publicId: '', alt: '' });
    setDesignKey('proposal');
    setPdfImageWarnings([]);
    setSaveMessage('');
    setSaveError(false);
    setSourceTemplate(null);
    setDayPlan(Array.from({ length: 5 }, (_, i) => blankDay(i + 1)));
    if (!startFromEnquiry) setEnquiry(null);
    if (routeItineraryId) navigate(ADMIN_ROUTES.ITINERARY_BUILDER_NEW, { replace: true });
  }

  if (loadingEnquiry) {
    return <p className="py-16 text-center text-gray-400">Loading enquiry…</p>;
  }

  return (
    <div onChangeCapture={(event) => { if (event.target.closest('[data-itinerary-editor]')) setUnsavedChanges(true); }} className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)] xl:gap-8">
      <div data-itinerary-editor className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#1B2A4A]">
              {enquiry ? `Itinerary for ${enquiry.name || enquiry.fullName}` : itineraryId ? 'Edit itinerary' : 'New itinerary'}
            </h1>
            <p className="mt-1 text-sm text-slate-500">Create the trip, review the live summary, then save or export a polished customer document.</p>
          </div>
          <button
            className="rounded-lg border border-[#E4DCC8] px-4 py-2.5 text-sm font-semibold text-[#1B2A4A]"
            onClick={() => navigate(enquiry ? ADMIN_ROUTES.ENQUIRIES : ADMIN_ROUTES.ITINERARIES)}
          >
            Back to enquiries
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#ECE4D0] bg-[#FAF7F0] p-4">
          <span className="mr-auto text-sm font-semibold text-[#1B2A4A]">Start with reusable trip content or build manually.</span>
          <button type="button" onClick={openTemplatePicker} className="rounded-lg bg-[#1B2A4A] px-4 py-2.5 text-sm font-bold text-white">Use Template</button>
          <button type="button" onClick={startBlank} className="rounded-lg border border-[#E4DCC8] bg-white px-4 py-2.5 text-sm font-bold text-[#1B2A4A]">Start Blank</button>
          {sourceTemplate && <span className="w-full text-xs text-gray-500">Based on {sourceTemplate.name} · v{sourceTemplate.version} (saved as an independent copy)</span>}
        </div>

        <Section title="Trip overview">
          <TextField label="Title" value={title} onChange={setTitle} />
          <TextField label="Customer name" value={customerName} onChange={setCustomerName} />
          <TextField label="Customer contact (optional)" value={details.customerContact} onChange={(value) => setDetails((prev) => ({ ...prev, customerContact: value }))} />
          <TextField label="Package name (optional)" value={details.packageName} onChange={(value) => setDetails((prev) => ({ ...prev, packageName: value }))} />
          <div className="grid grid-cols-2 gap-3"><TextField label="Travel start date" type="date" value={details.startDate} onChange={(value) => setDetails((prev) => ({ ...prev, startDate: value }))} /><TextField label="Travel end date" type="date" value={details.endDate} onChange={(value) => setDetails((prev) => ({ ...prev, endDate: value }))} /></div>
          <TextField label="Countries (comma separated)" value={countries} onChange={setCountries} />
          <TextField label="Destinations (comma separated)" value={destinations} onChange={updateDestinationText} />
          <div className="rounded-lg border border-[#E4DCC8] p-3"><div className="mb-2 text-xs font-bold text-[#1B2A4A]">Route cities and nights</div>{routeStops.map((stop, index) => <div key={index} className="mb-2 grid grid-cols-[1fr_100px_auto] gap-2"><TextField label={`City ${index + 1}`} value={stop.city || ''} onChange={(value) => updateRouteStops((rows) => rows.map((row, i) => i === index ? { ...row, city: value } : row))} /><NumberField label="Nights" value={stop.nights || 0} onChange={(value) => updateRouteStops((rows) => rows.map((row, i) => i === index ? { ...row, nights: value } : row))} min={0} /><button type="button" className="rounded border px-2 text-xs" onClick={() => updateRouteStops((rows) => rows.filter((_, i) => i !== index))}>Remove</button></div>)}<button type="button" className="text-xs font-bold text-blue-700" onClick={() => updateRouteStops((rows) => [...rows, { city: '', nights: 0 }])}>+ Add route city</button><p className="mt-1 text-[11px] text-slate-500">Changing route does not replace day plans or hotel nights.</p></div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Days" value={days} onChange={syncDayCount} min={1} />
            <NumberField label="Nights" value={nights} onChange={setNights} min={0} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Adults" value={adults} onChange={setAdults} min={1} />
            <NumberField label="Children" value={children} onChange={setChildren} min={0} />
          </div>
          {children > 0 && <div><button type="button" className="text-xs font-bold text-[#1B2A4A] underline" onClick={() => setShowChildrenAges((value) => !value)}>{showChildrenAges ? 'Hide child ages' : 'Add child ages (optional)'}</button>{showChildrenAges && <div className="mt-2 grid grid-cols-2 gap-3">{Array.from({ length: Number(children) }, (_, index) => <label key={index} className="flex flex-col gap-1.5 text-xs font-semibold text-gray-500">Child {index + 1} age<input type="number" min="0" max="17" value={childrenAges[index] ?? ''} onChange={(event) => setChildrenAges((prev) => { const next = [...prev]; next[index] = event.target.value === '' ? '' : Number(event.target.value); return next; })} className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A] focus:border-[#C99A3B] focus:outline-none focus:ring-2 focus:ring-[#C99A3B]/20" /></label>)}</div>}</div>}
        </Section>

        <Section title="Destination overview and photos"><TextAreaField label="Destination introduction" value={details.destinationIntroduction} onChange={(value) => setDetails((prev) => ({ ...prev, destinationIntroduction: value }))} /><TextAreaField label="Destination experiences (one per line)" value={details.destinationHighlightsText} onChange={(value) => setDetails((prev) => ({ ...prev, destinationHighlightsText: value }))} /><TextAreaField label="Package highlights (one per line)" value={details.packageHighlightsText} onChange={(value) => setDetails((prev) => ({ ...prev, packageHighlightsText: value }))} /><PipeRowEditor label="Destination photos" rowsLabel="photos" value={details.destinationPhotosText} fields={[{ key: 'url', label: 'Image URL', placeholder: 'https://example.com/image.jpg' }, { key: 'caption', label: 'Caption' }, { key: 'alt', label: 'Alt text' }]} onChange={(value) => { setUnsavedChanges(true); setDetails((prev) => ({ ...prev, destinationPhotosText: value })); }} /><p className="text-[11px] text-gray-500">Add one image per row. Use a public HTTPS URL that opens directly to an image. Any host is supported.</p></Section>
        <Section title="Proposal cover"><TextField label="Cover image URL (optional)" value={coverImage.url} onChange={(value) => { setUnsavedChanges(true); setCoverImage((prev) => ({ ...prev, url: value, publicId: '' })); }} /><TextField label="Cover image alt text" value={coverImage.alt} onChange={(value) => { setUnsavedChanges(true); setCoverImage((prev) => ({ ...prev, alt: value })); }} /><p className="text-[11px] text-gray-500">Paste a public HTTPS image URL or upload an image. External images are checked by the server before PDF use.</p><ImageUploader buttonLabel="Upload cover image" defaultFolder="itineraries" allowedFolders={['itineraries']} onUploaded={(image) => { setUnsavedChanges(true); setCoverImage((prev) => ({ ...image, alt: prev.alt || image.alt })); }} />{pdfImageWarnings.map((warning) => <p key={warning.url} className="text-xs text-amber-800">PDF could not use image URL: {warning.url}</p>)}</Section>

        <Section title="Day-wise plan">
          {dayPlan.map((day, index) => (
            <DayEditor key={index} day={day} index={index} dayCount={dayPlan.length} setDayPlan={setDayPlan} ImageUploader={ImageUploader} onEdit={() => setUnsavedChanges(true)} onDuplicate={(addsNight) => { setDays((current) => Math.min(60, current + 1)); if (addsNight) setNights((current) => Math.min(59, current + 1)); }} />
          ))}
        </Section>

        <Section title="Pricing">
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Base price per person (before GST)" value={pricing.basePrice ?? pricing.perPersonCost} onChange={(v) => setPricing((p) => ({ ...p, basePrice: v, perPersonCost: v }))} />
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-500">Child base price (blank = adult rate)<input type="number" min="0" value={pricing.childBasePrice ?? ''} onChange={(event) => setPricing((p) => ({ ...p, childBasePrice: event.target.value === '' ? null : Number(event.target.value) }))} className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]" /></label>
            <NumberField label="GST %" value={pricing.gstPercentage ?? 5} onChange={(v) => setPricing((p) => ({ ...p, gstPercentage: v }))} min={0} />
            <NumberField label="Flight cost (per booking, optional)" value={pricing.flightCost ?? 0} onChange={(v) => setPricing((p) => ({ ...p, flightCost: v }))} />
          </div>
          <div className="rounded-lg bg-[#FAF7F0] p-3 text-sm text-[#1B2A4A]">
            <div className="flex justify-between"><span>GST per person ({gstPercentage}%)</span><strong>{pricing.currency} {perPersonGst.toLocaleString()}</strong></div>
            <div className="mt-1 flex justify-between"><span>Final price per person</span><strong>{pricing.currency} {perPersonFinal.toLocaleString()}</strong></div>
            <div className="mt-1 flex justify-between"><span>Total for {travelerCount} traveler(s){Number(pricing.flightCost || 0) ? ' + flight cost' : ''}</span><strong>{pricing.currency} {calculatedTotal.toLocaleString()}</strong></div>
            <p className="mt-2 text-xs text-gray-500">Formula: (base price + GST) × adults and children + optional flight cost. Child ages are saved for future pricing rules; no child discount is applied.</p>
          </div>
          <ListField label="Inclusions" items={pricing.inclusions} field="inclusions" setPricing={setPricing} onEdit={() => setUnsavedChanges(true)} />
          <ListField label="Exclusions" items={pricing.exclusions} field="exclusions" setPricing={setPricing} onEdit={() => setUnsavedChanges(true)} />
          <PipeRowEditor label="Additional booking charges" rowsLabel="charge" value={pricingExtras.additionalChargesText} fields={[{ key: 'label', label: 'Charge name' }, { key: 'amount', label: 'Amount', type: 'number' }]} onChange={(value) => { setUnsavedChanges(true); setPricingExtras((prev) => ({ ...prev, additionalChargesText: value })); }} />
          <PipeRowEditor label="Discounts" rowsLabel="discount" value={pricingExtras.discountsText} fields={[{ key: 'label', label: 'Discount name' }, { key: 'amount', label: 'Amount', type: 'number' }]} onChange={(value) => { setUnsavedChanges(true); setPricingExtras((prev) => ({ ...prev, discountsText: value })); }} />
          <PipeRowEditor label="Payment schedule" rowsLabel="payment milestone" value={pricingExtras.paymentScheduleText} fields={[{ key: 'label', label: 'Milestone' }, { key: 'amount', label: 'Amount', type: 'number' }]} onChange={(value) => { setUnsavedChanges(true); setPricingExtras((prev) => ({ ...prev, paymentScheduleText: value })); }} />
          <TextAreaField label="Pricing notes" value={pricingExtras.pricingNotes} onChange={(value) => setPricingExtras((prev) => ({ ...prev, pricingNotes: value }))} />
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-500">Price status<select value={pricingExtras.priceStatus} onChange={(event) => setPricingExtras((prev) => ({ ...prev, priceStatus: event.target.value }))} className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm"><option value="estimate">Estimate</option><option value="confirmed">Confirmed</option><option value="pending">Pending confirmation</option></select></label>
        </Section>

        <Section title="Hotel, transfers and service confirmation"><PipeRowEditor label="Hotels" rowsLabel="hotel" value={details.hotelsText} fields={[{ key: 'destination', label: 'City / area' }, { key: 'name', label: 'Hotel' }, { key: 'alternative', label: 'Alternative' }, { key: 'room', label: 'Room type' }, { key: 'occupancy', label: 'Occupancy' }, { key: 'meal', label: 'Meal plan' }, { key: 'nights', label: 'Nights', type: 'number' }, { key: 'status', label: 'Confirmation', options: 'status' }]} onChange={(value) => { setUnsavedChanges(true); setDetails((prev) => ({ ...prev, hotelsText: value })); }} /><PipeRowEditor label="Transfers and vehicles" rowsLabel="transfer" value={details.transferDetailsText} fields={[{ key: 'route', label: 'Route' }, { key: 'type', label: 'Transfer type', options: 'transferType' }, { key: 'notes', label: 'Notes' }, { key: 'status', label: 'Confirmation', options: 'status' }]} onChange={(value) => { setUnsavedChanges(true); setDetails((prev) => ({ ...prev, transferDetailsText: value })); }} /><PipeRowEditor label="Optional activities" rowsLabel="activity" value={details.optionalActivitiesText} fields={[{ key: 'name', label: 'Activity' }, { key: 'price', label: 'Extra price', type: 'number' }, { key: 'notes', label: 'Notes' }]} onChange={(value) => { setUnsavedChanges(true); setDetails((prev) => ({ ...prev, optionalActivitiesText: value })); }} /><PipeRowEditor label="Pending services" rowsLabel="service" value={details.pendingServicesText} fields={[{ key: 'service', label: 'Service' }]} onChange={(value) => { setUnsavedChanges(true); setDetails((prev) => ({ ...prev, pendingServicesText: value })); }} /></Section>

        <Section title="Policies and important information"><button type="button" className="self-start text-xs font-bold text-blue-700 underline" onClick={() => { setUnsavedChanges(true); setDetails((prev) => ({ ...prev, policies: { ...DEFAULT_POLICIES } })); }}>Reset standard policies</button>{[['child', 'Child policy'], ['payment', 'Payment policy'], ['cancellation', 'Cancellation policy'], ['checkInOut', 'Hotel check-in / check-out'], ['visa', 'Visa information'], ['travelDocuments', 'Travel documents'], ['importantInformation', 'Other important information']].map(([key, label]) => <TextAreaField key={key} label={label} value={details.policies[key]} onChange={(value) => setDetails((prev) => ({ ...prev, policies: { ...prev.policies, [key]: value } }))} />)}<TextAreaField label="Closing message" value={details.closingMessage} onChange={(value) => setDetails((prev) => ({ ...prev, closingMessage: value }))} /></Section>

        <Section title="Document design"><label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-500">PDF layout<select value={designKey} onChange={(event) => setDesignKey(event.target.value)} className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"><option value="proposal">Premium travel proposal</option><option value="detailed">Detailed itinerary</option></select></label><p className="text-[11px] text-slate-500">New itineraries use the premium page-designed proposal. Select Detailed itinerary for the existing table-based layout.</p></Section>

        <div className="sticky bottom-2 z-10 flex flex-wrap items-center gap-3 rounded-xl border border-[#ECE4D0] bg-white/95 p-3 shadow-lg backdrop-blur">
          {readinessChecks.length > 0 && <div className="w-full rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900"><b>Checks (warnings only)</b><ul className="mt-1 list-disc pl-5">{readinessChecks.map((warning) => <li key={warning}>{warning}</li>)}</ul></div>}
          <button className="rounded-lg border border-[#E4DCC8] px-4 py-2.5 text-sm font-semibold text-[#1B2A4A]" onClick={handleSave} disabled={saving || generating}>
            {saving ? 'Saving…' : 'Save draft'}
          </button>
          <button className="rounded-lg bg-[#D4A24C] text-[#1B2A4A] font-bold text-sm px-4 py-2.5 disabled:cursor-wait disabled:opacity-60" onClick={() => handleGenerate('pdf')} disabled={saving || generating}>
            {generating ? 'Preparing document…' : 'Generate PDF'}
          </button>
          <button type="button" className="rounded-lg border border-[#E4DCC8] px-4 py-2.5 text-sm font-semibold text-[#1B2A4A] disabled:cursor-wait disabled:opacity-60" onClick={handlePreviewPdf} disabled={saving || generating}>{generating ? 'Preparing document…' : 'Preview PDF'}</button>
          <button className="rounded-lg bg-[#D4A24C] text-[#1B2A4A] font-bold text-sm px-4 py-2.5 disabled:cursor-wait disabled:opacity-60" onClick={() => handleGenerate('docx')} disabled={saving || generating}>
            {generating ? 'Preparing document…' : 'Generate DOCX'}
          </button>
          {unsavedChanges && <span className="text-xs font-semibold text-amber-700">Unsaved changes</span>}{saveMessage && <span role={saveError ? 'alert' : 'status'} className={`w-full text-xs font-semibold ${saveError ? 'text-red-700' : 'text-green-700'}`}>{saveMessage}</span>}
        </div>
      </div>

      <div className="lg:sticky lg:top-6">
      <ItineraryPreview
          title={title}
          customerName={customerName}
          packageName={details.packageName}
          destinations={destinations}
          nights={nights}
          days={days}
          adults={adults}
          children={children}
          childrenAges={childrenAges.filter((age) => age !== '' && age != null)}
          routeStops={routeStops}
          startDate={details.startDate}
          endDate={details.endDate}
          coverImage={coverImage}
          dayPlan={dayPlan}
          pricing={{ ...pricing, basePrice: perPersonBase, gstPercentage, gstAmount: perPersonGst, perPersonCost: perPersonFinal, totalCost: calculatedTotal }}
        />
      </div>
      {templatePickerOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"><div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-black text-[#1B2A4A]">Choose an itinerary template</h2><p className="mt-1 text-sm text-slate-500">Review the route and daily plan. Your edits will not change the master template.</p></div><button type="button" onClick={() => setTemplatePickerOpen(false)} className="rounded border px-3 py-1">Close</button></div><input value={templateSearch} onChange={(event) => setTemplateSearch(event.target.value)} placeholder="Search templates" className="mt-4 w-full rounded-lg border px-3 py-2" /><div className="mt-2 grid gap-2 sm:grid-cols-3"><input value={templateCountry} onChange={(event) => setTemplateCountry(event.target.value)} placeholder="Country" className="rounded-lg border px-3 py-2" /><input value={templateDestination} onChange={(event) => setTemplateDestination(event.target.value)} placeholder="Destination" className="rounded-lg border px-3 py-2" /><input type="number" min="1" value={templateDays} onChange={(event) => setTemplateDays(event.target.value)} placeholder="Days" className="rounded-lg border px-3 py-2" /></div><button type="button" onClick={openTemplatePicker} className="mt-2 text-sm font-bold text-blue-700">Search</button><div className="mt-4 grid gap-3 md:grid-cols-2">{templates.map((template) => <button type="button" key={template._id} onClick={() => setSelectedTemplate(template)} className={`rounded-xl border p-4 text-left ${selectedTemplate?._id === template._id ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}><strong>{template.name}</strong><p className="mt-1 text-xs text-slate-500">{template.countries?.join(', ')} · {(template.route?.length ? template.route : template.destinations)?.map((stop) => typeof stop === 'string' ? stop : `${stop.city} (${stop.nights}N)`).join(' → ')}</p><p className="mt-1 text-xs text-slate-500">{template.days} days / {template.nights} nights · v{template.version}</p><p className="mt-2 text-xs">{template.days_plan?.slice(0, 3).map((day) => day.title).join(' · ')}</p></button>)}</div>{selectedTemplate && <div className="mt-4 rounded-xl bg-slate-50 p-4"><h3 className="font-bold">{selectedTemplate.name} — details</h3><ol className="mt-2 list-inside list-decimal text-sm text-slate-600">{selectedTemplate.days_plan?.map((day) => <li key={day.dayNumber}><b>{day.title}</b>{day.description ? `: ${day.description}` : ''}</li>)}</ol><button type="button" onClick={useSelectedTemplate} className="mt-4 rounded-lg bg-orange-500 px-4 py-2 font-black text-white">Use this template</button></div>}</div></div>}
    </div>
    </div>
  );
}

function Section({ title, children }) {
  const [isOpen, setIsOpen] = useState(title === 'Trip overview');
  return (
    <details open={isOpen} onToggle={(event) => setIsOpen(event.currentTarget.open)} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow open:shadow-md">
      <summary className="cursor-pointer list-none text-sm font-semibold text-[#1B2A4A]">{title}<span className="ml-2 text-xs font-normal text-slate-400 group-open:hidden"> · Select to customize</span></summary>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </details>
  );
}

function TextField({ label, value, onChange, type = 'text' }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-500">
      {label}
        <input
        type={type}
        className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange }) {
  return <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-500">{label}<textarea rows="3" value={value || ''} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm text-[#1B2A4A]" /></label>;
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

function ListField({ label, items = [], field, setPricing, onEdit = () => {} }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-500">{label}<span className="font-normal">Enter one item per line</span>
      <textarea rows={5} className="rounded-lg border border-[#E4DCC8] px-3 py-2 text-sm font-normal text-[#1B2A4A]" placeholder={'First item\nSecond item\nThird item'} value={items.join('\n')} onChange={(event) => {
        onEdit();
        const values = event.target.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        setPricing((previous) => ({ ...previous, [field]: values }));
      }} />
    </label>
  );
}
