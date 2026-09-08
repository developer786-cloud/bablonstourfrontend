import TripEnquiryForm from './sections/TripEnquiryForm';

export default function TripPlannerPage() {
  return (
    <main className="bg-[#FAF7F0] py-16 px-4">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#D4A24C]">
          Free itinerary
        </span>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-[#1B2A4A]">
          Plan your next trip with us
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Tell us where you want to go and our travel expert will send you a custom itinerary.
        </p>
      </div>
      <TripEnquiryForm />
    </main>
  );
}
