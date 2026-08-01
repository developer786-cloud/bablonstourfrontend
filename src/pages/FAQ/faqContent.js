import { ROUTES } from '../../constants/routes'

export const faqPageConfigs = {
  master: {
    key: 'master',
    path: ROUTES.FAQ,
    title: 'Travel FAQs',
    description:
      'Answers to common questions about Dubai, Thailand, Georgia, Uzbekistan, visas, booking and advance payments, family tours, honeymoon trips and international travel booking.',
    heroTitle: 'Answers before your journey begins.',
    heroDescription:
      'Find quick answers about Dubai, Thailand, Georgia, Uzbekistan, visas, payments, group tours, and everything you need before you book your next holiday.',
    searchPlaceholder: 'Search your question...',
    highlights: [
      'Clear booking guidance',
      'Quick travel support',
      'Personalized trip planning',
    ],
    faqs: [
      {
        category: 'Planning & Booking',
        question: 'How do I book an international holiday package with Bablons Travel?',
        answer:
          'You can book by sending an enquiry from our package page, calling us, emailing us, or WhatsApp. Our team will confirm availability, share a quotation, and guide you through the next steps.',
      },
      {
        category: 'Planning & Booking',
        question: 'How much advance payment is required to confirm a package?',
        answer:
          'Advance payment depends on the destination, travel dates, hotel availability, and airline requirements. We share the payment schedule upfront before you confirm the booking.',
      },
      {
        category: 'Planning & Booking',
        question: 'Can I customize my trip itinerary?',
        answer:
          'Yes. We tailor the itinerary to your destination, travel style, budget, group size, and preferred experiences. You can modify hotels, sightseeing, meals, transfers, and activities.',
      },
      {
        category: 'Visa & Documents',
        question: 'Do you help with visa assistance for international trips?',
        answer:
          'Yes. We provide visa guidance, document checklists, and practical support based on your destination and passport. Approval is always subject to immigration rules and embassy decisions.',
      },
      {
        category: 'Payment & EMI',
        question: 'Is no-cost EMI available on travel packages?',
        answer:
          'EMI is currently not available on any of our travel packages. To confirm a booking, a booking/advance amount is required, and the remaining balance can usually be paid in scheduled installments before departure. Our team will share the exact payment plan for your chosen trip.',
      },
      {
        category: 'Destinations',
        question: 'Which destinations do you currently offer?',
        answer:
          'Bablons focuses on Dubai, Thailand, Uzbekistan, Georgia, and curated packages for Bali, Europe, Singapore, Malaysia, Vietnam, Azerbaijan, and the Maldives.',
      },
      {
        category: 'Family & Honeymoon',
        question: 'Can you build a family or honeymoon package for us?',
        answer:
          'Yes. We create family-friendly, honeymoon-focused, luxury, budget, and group packages tailored to your travel style and budget.',
      },
      {
        category: 'Travel Support',
        question: 'Will someone support us during the trip?',
        answer:
          'Yes. Our team stays available before departure and during the trip for hotel, transfer, itinerary, or support-related assistance.',
      },
      {
        category: 'Travel Support',
        question: 'Is travel insurance recommended for international trips?',
        answer:
          'Travel insurance is strongly recommended and may be required for certain destinations. We can guide you toward suitable coverage based on your itinerary.',
      },
    ],
    relatedFaqs: [
      { label: 'Dubai FAQ', path: ROUTES.FAQ_DUBAI, description: 'Visa, cost and trip planning questions for Dubai.' },
      { label: 'Thailand FAQ', path: ROUTES.FAQ_THAI, description: 'Thailand family, honeymoon and budget trip answers.' },
      { label: 'Visa FAQ', path: ROUTES.FAQ_VISA, description: 'Visa timelines, document requirements and rejections.' },
      { label: 'Payment FAQ', path: ROUTES.FAQ_PAYMENT, description: 'Advance payment, installment plans and cancellation terms.' },
    ],
    relatedLinks: [
      { label: 'Best Dubai Tour Packages', path: '/packages' },
      { label: 'Thailand Family Packages', path: '/packages' },
      { label: 'International Travel Guides', path: '/blogs' },
      { label: 'Contact our travel experts', path: '/contact' },
    ],
  },
  dubai: {
    key: 'dubai',
    path: ROUTES.FAQ_DUBAI,
    title: 'Dubai FAQ',
    description: 'Dubai travel FAQ for Indian travelers covering visa, cost, weather, honeymoon tips, safety and package inclusions.',
    heroTitle: 'Dubai travel questions answered.',
    heroDescription: 'From Dubai visa rules to costs, sightseeing and honeymoon ideas, this FAQ page helps you plan your UAE trip with confidence.',
    searchPlaceholder: 'Search Dubai questions...',
    highlights: ['Dubai visa guidance', 'Trip cost clarity', 'Honeymoon and family planning'],
    faqs: [
      {
        category: 'Visa & Entry',
        question: 'How much does a Dubai trip cost from India?',
        answer:
          'The total cost depends on your flight class, hotel choice, and number of days. A mid-range Dubai trip from India usually starts from a comfortable budget range and can go much higher for luxury upgrades.',
      },
      {
        category: 'Visa & Entry',
        question: 'Is Dubai visa on arrival for Indians?',
        answer:
          'Visa-on-arrival facilities can change, so it is safer to confirm your entry requirements before travel. We can guide you on the most current process for your passport type.',
      },
      {
        category: 'Planning',
        question: 'How many days are enough for Dubai?',
        answer:
          'A 4 to 6 day trip is usually enough for the main highlights such as Burj Khalifa, desert safari, Dubai Marina, Old Dubai and a day trip to Abu Dhabi.',
      },
      {
        category: 'Best Time',
        question: 'What is the best time to visit Dubai from India?',
        answer:
          'The most comfortable months are from November to March, when the weather is cooler and more suitable for sightseeing and outdoor activities.',
      },
      {
        category: 'Travel Style',
        question: 'Is Dubai good for a honeymoon trip?',
        answer:
          'Yes. Dubai is popular for couples because it combines luxury hotels, desert experiences, rooftop dining, beaches and iconic sightseeing in one short trip.',
      },
      {
        category: 'Budget',
        question: 'Can I visit Dubai on a budget?',
        answer:
          'Yes. Budget-friendly Dubai trips are possible with smart hotel choices, fewer paid activities, and off-peak travel periods. We can build a value-based plan around your budget.',
      },
      {
        category: 'Safety',
        question: 'Is Dubai safe for solo women travelers?',
        answer:
          'Dubai is generally considered safe for solo travelers and women, but it is still wise to follow standard precautions after dark and while using public transport.',
      },
      {
        category: 'Essentials',
        question: 'Do I need travel insurance for Dubai?',
        answer:
          'Travel insurance is recommended for medical assistance, baggage issues, and trip disruption. It is a good idea for any international holiday.',
      },
    ],
    relatedFaqs: [
      { label: 'Visa FAQ', path: ROUTES.FAQ_VISA, description: 'General visa guidance and document requirements.' },
      { label: 'Payment FAQ', path: ROUTES.FAQ_PAYMENT, description: 'Advance payment and payment plan answers.' },
      { label: 'Honeymoon FAQ', path: ROUTES.FAQ_HONEYM, description: 'Best destinations and honeymoon package ideas.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Browse the broader travel FAQ ecosystem.' },
    ],
    relatedLinks: [
      { label: 'Dubai packages', path: '/packages' },
      { label: 'Dubai travel cost guide', path: '/blogs' },
      { label: 'Contact us for a Dubai quote', path: '/contact' },
    ],
  },
  thailand: {
    key: 'thailand',
    path: ROUTES.FAQ_THAI,
    title: 'Thailand FAQ',
    description: 'Thailand travel FAQ for Indian travelers covering visa, budget, family packages, weather and honeymoon planning.',
    heroTitle: 'Thailand trip answers for Indian travelers.',
    heroDescription: 'Get quick answers about Thailand visa requirements, the best time to visit, budget planning and which package suits your trip.',
    searchPlaceholder: 'Search Thailand questions...',
    highlights: ['Family and honeymoon ideas', 'Budget-friendly planning', 'Visa and route guidance'],
    faqs: [
      {
        category: 'Family & Couples',
        question: 'Which Thailand package is best for families?',
        answer:
          'A Bangkok and Pattaya package is usually ideal for families because it balances city sightseeing, beach time, shopping, and kid-friendly activities.',
      },
      {
        category: 'Visa',
        question: 'Is Thailand visa-free for Indians?',
        answer:
          'Visa rules can change, so the safest approach is to confirm the latest requirement before booking. We can help you understand the current eligibility and processing route.',
      },
      {
        category: 'Destinations',
        question: 'Which is better, Phuket or Krabi?',
        answer:
          'Phuket is more developed and convenient for first-time travelers, while Krabi often feels more scenic and relaxed. The better choice depends on your travel style and budget.',
      },
      {
        category: 'Budget',
        question: 'Can Thailand be done on a budget from India?',
        answer:
          'Yes. Thailand is often one of the more budget-friendly international options when you choose reasonable hotels, fewer premium add-ons, and travel in shoulder seasons.',
      },
      {
        category: 'Planning',
        question: 'How many days are ideal for a Thailand trip?',
        answer:
          'A 5 to 7 day plan is ideal for a classic Thailand holiday covering Bangkok, Pattaya or Phuket, and a few core experiences without rushing.',
      },
      {
        category: 'Honeymoon',
        question: 'What is included in a Thailand honeymoon package?',
        answer:
          'Typical honeymoon inclusions include romantic stays, airport transfers, sightseeing, couple activities, and special dinner experiences depending on the package.',
      },
      {
        category: 'Best Time',
        question: 'What is the best time to visit Thailand from India?',
        answer:
          'November to February is the most comfortable time for sightseeing, while shoulder months may offer better value and fewer crowds.',
      },
      {
        category: 'Budget',
        question: 'How much does a 5-day Thailand package cost?',
        answer:
          'The cost depends on the hotel category, flight class, and inclusions. We can help you compare budget, family, and premium routes for your preferred dates.',
      },
    ],
    relatedFaqs: [
      { label: 'Dubai FAQ', path: ROUTES.FAQ_DUBAI, description: 'Compare Dubai with Thailand for short-haul holidays.' },
      { label: 'Family Tour FAQ', path: ROUTES.FAQ_FAMILY, description: 'How to plan family tours to Asia and beyond.' },
      { label: 'Budget Tour FAQ', path: ROUTES.FAQ_BUDGET, description: 'Low-cost international trip planning tips.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Return to the main FAQ hub.' },
    ],
    relatedLinks: [
      { label: 'Thailand packages', path: '/packages' },
      { label: 'Thailand travel blog', path: '/blogs' },
      { label: 'Book a Thailand trip', path: '/contact' },
    ],
  },
  uzbekistan: {
    key: 'uzbekistan',
    path: ROUTES.FAQ_UZB,
    title: 'Uzbekistan Tour Package FAQ | Tashkent, Samarkand & Bukhara Trip Questions',
    description: 'Uzbekistan tour package FAQ for Indian travelers covering Uzbekistan visa for Indians, currency, safety, booking and advance payment options, and the best time to visit Tashkent, Samarkand, Bukhara and Khiva on a Silk Road trip.',
    heroTitle: 'Uzbekistan Silk Road trip questions answered.',
    heroDescription: 'Everything Indian travelers ask before booking an Uzbekistan tour package — visa rules, budget, payment plans, currency, cities to cover and the best time to visit Samarkand, Bukhara, Khiva and Tashkent.',
    searchPlaceholder: 'Search Uzbekistan trip questions...',
    highlights: ['Silk Road itinerary planning', 'Budget-friendly Uzbekistan packages', 'Visa, currency and payment help'],
    faqs: [
      {
        category: 'Safety & Entry',
        question: 'Is Uzbekistan safe for Indian tourists?',
        answer:
          'Yes. Uzbekistan is considered a safe and welcoming destination for Indian travelers, with growing tourism infrastructure across Tashkent, Samarkand, Bukhara and Khiva and friendly local hospitality.',
      },
      {
        category: 'Visa',
        question: 'Do Indians need a visa for Uzbekistan?',
        answer:
          'Indian passport holders should confirm the latest Uzbekistan visa rules before booking, as e-visa and visa-free arrangements can change. Our team guides you through the current online application process, documents and timelines for your Uzbekistan trip.',
      },
      {
        category: 'Cities to Visit',
        question: 'Which Uzbekistan cities should I cover — Tashkent, Samarkand, Bukhara or Khiva?',
        answer:
          'Most Uzbekistan tour packages combine Tashkent as the entry city, Samarkand for iconic Registan Square, and Bukhara for its old town charm. Khiva can be added for travelers who want a deeper Silk Road experience with a longer itinerary.',
      },
      {
        category: 'Currency',
        question: 'Can I use Indian Rupees in Tashkent, Samarkand or Bukhara?',
        answer:
          'Indian Rupees are not generally accepted locally in Uzbekistan. It is better to carry or exchange US Dollars, or use local currency (Uzbekistani Som) once you arrive.',
      },
      {
        category: 'Itinerary',
        question: 'How many days are enough for an Uzbekistan tour package?',
        answer:
          'A 5 to 6 night Uzbekistan itinerary is usually enough to cover Tashkent, Samarkand and Bukhara comfortably. Add 1 to 2 extra nights if you want to include Khiva or a slower, more relaxed pace.',
      },
      {
        category: 'Best Time',
        question: 'What is the best time to visit Uzbekistan — Samarkand and Tashkent?',
        answer:
          'Spring (March to May) and autumn (September to November) are the most comfortable seasons for sightseeing in Samarkand, Bukhara and Tashkent, with mild weather ideal for walking tours.',
      },
      {
        category: 'Budget',
        question: 'Is Uzbekistan a good budget international trip from India?',
        answer:
          'Yes. Uzbekistan tour packages are often more budget-friendly compared to Europe or many Middle Eastern destinations, while still offering rich culture, architecture and history.',
      },
      {
        category: 'Payment & EMI',
        question: 'Is no-cost EMI available on Uzbekistan tour packages?',
        answer:
          'EMI is currently not available on any package, including Uzbekistan. A booking/advance amount is required to confirm your trip, and we offer a flexible installment schedule for the balance so you can pay in stages before departure. Contact our Bablons Travel team on the number below or through the enquiry form for the payment plan that suits your Uzbekistan trip.',
      },
      {
        category: 'Payment & EMI',
        question: 'How much advance payment is needed to book an Uzbekistan package?',
        answer:
          'Advance payment for Uzbekistan trips depends on your travel dates, hotel category and flight availability across Tashkent, Samarkand and Bukhara. Speak to our team and we will share the exact payment schedule before you confirm.',
      },
      {
        category: 'Insurance',
        question: 'Do I need travel insurance for Uzbekistan?',
        answer:
          'Travel insurance is strongly recommended for an Uzbekistan trip to cover medical emergencies, trip delays and baggage issues. It is not always mandatory for the visa, but our team can help you choose a suitable plan before you travel.',
      },
      {
        category: 'Food',
        question: 'What is the food like for Indian travelers in Uzbekistan?',
        answer:
          'Uzbek food is rich in breads, rice dishes such as plov, meats and soups. Most Indian travelers find it simple and hearty, and vegetarian options are available in Tashkent, Samarkand and Bukhara with some planning.',
      },
      {
        category: 'Travel Style',
        question: 'Is Uzbekistan good for honeymoon, solo or family travel?',
        answer:
          'Yes. Uzbekistan works well for honeymoon couples, solo travelers and families because the cities are compact, the Silk Road route is easy to organize, and the pace can be tailored to your group.',
      },
    ],
    relatedFaqs: [
      { label: 'Georgia FAQ', path: ROUTES.FAQ_GEORGIA, description: 'Compare two of the best emerging Silk Road and Caucasus destinations.' },
      { label: 'Visa FAQ', path: ROUTES.FAQ_VISA, description: 'Entry permissions and document support for Uzbekistan and beyond.' },
      { label: 'Payment FAQ', path: ROUTES.FAQ_PAYMENT, description: 'Advance payment and installment options for your Uzbekistan booking.' },
      { label: 'EMI FAQ', path: ROUTES.FAQ_EMI, description: 'Understand why EMI is currently unavailable and how booking payments work.' },
      { label: 'Travel Insurance FAQ', path: ROUTES.FAQ_INSURANCE, description: 'Choose the right cover for your Uzbekistan trip.' },
      { label: 'Budget Tour FAQ', path: ROUTES.FAQ_BUDGET, description: 'More budget-focused holiday answers.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'See the larger FAQ ecosystem.' },
    ],
    relatedLinks: [
      { label: 'Uzbekistan tour packages from India', path: '/packages' },
      { label: 'Samarkand & Bukhara honeymoon packages', path: '/packages' },
      { label: 'Georgia tour packages', path: '/packages' },
      { label: 'Uzbekistan Silk Road travel guides', path: '/blogs' },
      { label: 'Plan your Uzbekistan trip with Bablons Travel', path: '/contact' },
    ],
  },
  georgia: {
    key: 'georgia',
    path: ROUTES.FAQ_GEORGIA,
    title: 'Georgia FAQ',
    description: 'Georgia travel FAQ for Indian travelers covering visa-free entry, honeymoon ideas, best time and scenic destinations.',
    heroTitle: 'Georgia travel questions answered.',
    heroDescription: 'Learn about Georgia’s visa options, attractions, honeymoon appeal, travel budget and ideal trip length.',
    searchPlaceholder: 'Search Georgia questions...',
    highlights: ['Visa-free travel', 'Honeymoon planning', 'Mountain and city breaks'],
    faqs: [
      {
        category: 'Entry',
        question: 'Can Indians visit Georgia without a visa?',
        answer:
          'Yes, Indian passport holders can often travel to Georgia without a visa for short stays. We recommend still checking the latest rules before booking.',
      },
      {
        category: 'Itinerary',
        question: 'How many days are enough for Georgia?',
        answer:
          'A 5 to 6 night trip is usually enough to experience the highlights of Tbilisi, Gudauri and Batumi at a comfortable pace.',
      },
      {
        category: 'Honeymoon',
        question: 'Is Georgia good for a honeymoon?',
        answer:
          'Yes. Georgia combines charming cities, mountain scenery, vineyards and relaxed resorts, making it an attractive offbeat honeymoon choice.',
      },
      {
        category: 'Best Time',
        question: 'What is the best time to visit Tbilisi and Gudauri?',
        answer:
          'Spring and autumn are ideal for city sightseeing, while winter is better for snow activities in Gudauri.',
      },
      {
        category: 'Budget',
        question: 'Is Georgia expensive for Indian tourists?',
        answer:
          'Georgia is often considered good value compared with other Europe-oriented trips, especially when you choose a mid-range hotel plan and shared transfers.',
      },
      {
        category: 'Packages',
        question: 'What is included in a Georgia holiday package?',
        answer:
          'A Georgia package usually includes hotels, airport transfers, sightseeing, and curated transport between cities, with options for private or group travel.',
      },
      {
        category: 'Safety',
        question: 'Is Georgia safe for Indian solo travelers?',
        answer:
          'Yes. Georgia is a popular choice for solo and couple travelers who want a supportive, scenic and relatively simple destination experience.',
      },
    ],
    relatedFaqs: [
      { label: 'Uzbekistan FAQ', path: ROUTES.FAQ_UZB, description: 'Compare two central Asian destinations.' },
      { label: 'Honeymoon FAQ', path: ROUTES.FAQ_HONEYM, description: 'Look for romantic trip ideas.' },
      { label: 'Visa FAQ', path: ROUTES.FAQ_VISA, description: 'Check entry and visa requirements.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Return to the central FAQ hub.' },
    ],
    relatedLinks: [
      { label: 'Georgia holiday packages', path: '/packages' },
      { label: 'Georgia travel guides', path: '/blogs' },
      { label: 'Request a Georgia itinerary', path: '/contact' },
    ],
  },
  visa: {
    key: 'visa',
    path: ROUTES.FAQ_VISA,
    title: 'Visa FAQ',
    description: 'Visa FAQ for Indian travelers covering Dubai, Schengen, passport rules, processing time and travel insurance questions.',
    heroTitle: 'Visa questions, answered clearly.',
    heroDescription: 'Get practical guidance for visa applications, document requirements, processing time and the often-overlooked reasons for rejections.',
    searchPlaceholder: 'Search visa questions...',
    highlights: ['Fast visa guidance', 'Document checklists', 'Rejection prevention'],
    faqs: [
      {
        category: 'General',
        question: 'Which countries offer visa-free entry for Indian passport holders?',
        answer:
          'Visa-free access varies by country and can change based on your passport status, travel purpose and duration of stay. We help you verify the latest entry rules before you travel.',
      },
      {
        category: 'Dubai',
        question: 'How long does Dubai visa processing take?',
        answer:
          'Processing time depends on the visa type and service channel. We recommend applying well in advance and sharing your itinerary early so our team can guide you correctly.',
      },
      {
        category: 'Schengen',
        question: 'What documents are required for a Schengen visa from India?',
        answer:
          'A Schengen visa application usually requires a valid passport, itinerary, financial proof, hotel bookings, return ticket, travel insurance and supporting documents specific to your trip.',
      },
      {
        category: 'Booking Risk',
        question: 'Can visa be rejected after booking flights?',
        answer:
          'Yes. Visa rejections can happen even after booking travel. That is why we recommend planning with flexibility and confirming your documents before paying for non-refundable flights or hotels.',
      },
      {
        category: 'Insurance',
        question: 'Is visa insurance mandatory?',
        answer:
          'For many destinations, travel insurance is strongly recommended and sometimes required for visa applications. We guide you on the right level of cover for your trip.',
      },
      {
        category: 'Fees',
        question: 'How much does a Dubai tourist visa cost from India?',
        answer:
          'Costs vary by visa type, processing speed and service provider. The total fee should be confirmed at the time of application because fees and service charges can change.',
      },
    ],
    relatedFaqs: [
      { label: 'Dubai FAQ', path: ROUTES.FAQ_DUBAI, description: 'Dubai entry and visa details.' },
      { label: 'Passport FAQ', path: ROUTES.FAQ_PASSPORT, description: 'Passport validity and document readiness.' },
      { label: 'Travel Insurance FAQ', path: ROUTES.FAQ_INSURANCE, description: 'Insurance guidance for visas and trips.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Browse the main travel FAQ hub.' },
    ],
    relatedLinks: [
      { label: 'Visa assistance', path: '/contact' },
      { label: 'Travel blogs', path: '/blogs' },
      { label: 'Holiday packages', path: '/packages' },
    ],
  },
  flight: {
    key: 'flight',
    path: ROUTES.FAQ_FLIGHT,
    title: 'Flight Booking FAQ',
    description: 'Flight booking FAQ covering included airfare, route flexibility, baggage questions and booking support for international holidays.',
    heroTitle: 'Flight booking questions answered.',
    heroDescription: 'Learn what is included in a package, how flight changes work, and what to check before you confirm your travel dates.',
    searchPlaceholder: 'Search flight questions...',
    highlights: ['Included flight clarity', 'Route planning', 'Booking flexibility'],
    faqs: [
      {
        category: 'Package Inclusions',
        question: 'Are flights included in the package?',
        answer:
          'Flights may be included or excluded depending on the package and departure city. We always clarify this before you confirm a booking.',
      },
      {
        category: 'Routes',
        question: 'Can I choose my preferred flight timings?',
        answer:
          'Yes, we can try to align the itinerary with your preferred departure and arrival timing where availability allows.',
      },
      {
        category: 'Changes',
        question: 'Can I change my flight after booking?',
        answer:
          'Changes depend on airline policies, fare conditions and timing. Our team will explain any fare difference or change fee before proceeding.',
      },
      {
        category: 'Baggage',
        question: 'Do I need to pay extra for baggage?',
        answer:
          'Baggage allowances vary by airline and fare class. We recommend checking the details before departure so you are not surprised at the airport.',
      },
      {
        category: 'Support',
        question: 'What if my flight gets delayed?',
        answer:
          'Contact us immediately so we can help coordinate airport transfers and any itinerary adjustments with the local support team.',
      },
    ],
    relatedFaqs: [
      { label: 'Visa FAQ', path: ROUTES.FAQ_VISA, description: 'Flight and visa planning questions.' },
      { label: 'Payment FAQ', path: ROUTES.FAQ_PAYMENT, description: 'Understand booking payments before confirming flights.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Visit the main FAQ gateway.' },
    ],
    relatedLinks: [
      { label: 'Flight-inclusive packages', path: '/packages' },
      { label: 'Travel support', path: '/contact' },
    ],
  },
  hotel: {
    key: 'hotel',
    path: ROUTES.FAQ_HOTEL,
    title: 'Hotel Booking FAQ',
    description: 'Hotel booking FAQ covering room types, transfers, hotel standards and how we choose accommodations for family and honeymoon trips.',
    heroTitle: 'Hotel booking questions answered.',
    heroDescription: 'Find out how hotel choices, room types and transfers are handled in your package and what to expect before you travel.',
    searchPlaceholder: 'Search hotel questions...',
    highlights: ['Stay options', 'Transfers', 'Family-friendly rooms'],
    faqs: [
      {
        category: 'Room Types',
        question: 'What type of hotels do you provide?',
        answer:
          'We offer standard, premium, luxury, and family-friendly hotel options based on your package and budget.',
      },
      {
        category: 'Transfers',
        question: 'Are airport transfers included?',
        answer:
          'Airport transfers are included when listed in the package. If not, we can still arrange them for you.',
      },
      {
        category: 'Transport',
        question: 'Will transport be private or shared?',
        answer:
          'It depends on your selected package. Group tours usually use shared transport, while private packages can include private vehicles.',
      },
      {
        category: 'Families',
        question: 'Do you offer family-friendly rooms?',
        answer:
          'Yes. We can plan around family rooms, adjacent rooms, or rooms with extra beds based on the destination and hotel availability.',
      },
      {
        category: 'Honeymoon',
        question: 'Can honeymoon rooms be upgraded?',
        answer:
          'Yes. Honeymoon upgrades such as room views, romantic arrangements and premium room categories can often be added upon request.',
      },
    ],
    relatedFaqs: [
      { label: 'Luxury Tour FAQ', path: ROUTES.FAQ_LUXURY, description: 'Premium stay and upscale travel questions.' },
      { label: 'Family Tour FAQ', path: ROUTES.FAQ_FAMILY, description: 'Family room and group accommodation planning.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Explore the broader FAQ ecosystem.' },
    ],
    relatedLinks: [
      { label: 'Hotel-inclusive packages', path: '/packages' },
      { label: 'Travel planning help', path: '/contact' },
    ],
  },
  payment: {
    key: 'payment',
    path: ROUTES.FAQ_PAYMENT,
    title: 'Payment FAQ',
    description: 'Payment FAQ covering advance payments, installments, cancellation charges and how package costs are confirmed.',
    heroTitle: 'Payment questions answered simply.',
    heroDescription: 'Understand how much you need to pay upfront, what installments are available, and what happens if you cancel after paying an advance.',
    searchPlaceholder: 'Search payment questions...',
    highlights: ['Advance payment clarity', 'Installment planning', 'Cancellation guidance'],
    faqs: [
      {
        category: 'Advance Payment',
        question: 'How much advance payment is needed to confirm a package?',
        answer:
          'The advance amount depends on the package, season and availability. We will explain the payment schedule clearly before you confirm the booking.',
      },
      {
        category: 'Installments',
        question: 'Can I pay in installments for an international trip?',
        answer:
          'Yes, many packages can be paid in planned installments. The exact structure will be shared in the quotation based on supplier and booking rules.',
      },
      {
        category: 'EMI',
        question: 'Is no-cost EMI available on international packages?',
        answer:
          'EMI is currently not available on any of our international packages, including Dubai, Thailand, Georgia and Uzbekistan. To confirm your trip, a booking/advance amount is required, and the remaining balance can be paid in a flexible installment schedule. Contact our team for the exact payment plan for your destination.',
      },
      {
        category: 'Cancellation',
        question: 'Is there a cancellation charge if I cancel after paying advance?',
        answer:
          'Cancellation terms depend on the booking stage and supplier rules. We explain the likely charges before you pay so there are no surprises later.',
      },
      {
        category: 'Confirmation',
        question: 'Will I receive a booking confirmation?',
        answer:
          'Yes. Once the booking is confirmed, you will receive payment details, itinerary updates and travel support contacts.',
      },
    ],
    relatedFaqs: [
      { label: 'EMI FAQ', path: ROUTES.FAQ_EMI, description: 'Booking amount and installment options since EMI is currently unavailable.' },
      { label: 'Visa FAQ', path: ROUTES.FAQ_VISA, description: 'Understand booking timing before visa approval.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Explore the wider FAQ ecosystem.' },
    ],
    relatedLinks: [
      { label: 'Booking and payment help', path: '/contact' },
      { label: 'Holiday packages', path: '/packages' },
    ],
  },
  emi: {
    key: 'emi',
    path: ROUTES.FAQ_EMI,
    title: 'EMI FAQ',
    description: 'EMI FAQ explaining why no-cost EMI is currently not available on any travel package, and how booking amount and installment payments work instead.',
    heroTitle: 'EMI and installment questions answered.',
    heroDescription: 'EMI is currently not available on any of our packages. Here is how booking amount and flexible installment payments work instead for your holiday.',
    searchPlaceholder: 'Search EMI and payment questions...',
    highlights: ['No EMI currently', 'Booking amount clarity', 'Flexible installment plans'],
    faqs: [
      {
        category: 'Availability',
        question: 'Is EMI available on any travel package?',
        answer:
          'No. EMI is currently not available on any of our travel packages, including Dubai, Thailand, Georgia and Uzbekistan. We instead offer a booking amount plus a flexible installment schedule to help you plan your payments.',
      },
      {
        category: 'Booking Amount',
        question: 'What is the booking amount and how much do I need to pay upfront?',
        answer:
          'The booking amount is the advance you pay to confirm your package. It varies by destination, travel dates, hotel category and airline requirements. Our team shares the exact booking amount before you confirm.',
      },
      {
        category: 'Installments',
        question: 'Can I pay the remaining balance in installments?',
        answer:
          'Yes. After the booking amount, the remaining balance can usually be paid in a planned installment schedule ahead of your departure date. The exact schedule is shared in your quotation.',
      },
      {
        category: 'Planning',
        question: 'What is the minimum payment required to start a package?',
        answer:
          'The initial booking amount varies by destination and package. We share the exact amount upfront so you can plan your budget with confidence.',
      },
      {
        category: 'Uzbekistan',
        question: 'Is EMI available for Uzbekistan tour packages?',
        answer:
          'No, EMI is not available for Uzbekistan tour packages, just like our other destinations. A booking amount is required to confirm your Tashkent, Samarkand or Bukhara trip, and the balance can be paid through a flexible installment schedule. Contact our Bablons Travel team directly for the most convenient plan.',
      },
    ],
    relatedFaqs: [
      { label: 'Payment FAQ', path: ROUTES.FAQ_PAYMENT, description: 'General payment, booking amount and cancellation questions.' },
      { label: 'Uzbekistan FAQ', path: ROUTES.FAQ_UZB, description: 'Uzbekistan-specific booking and payment answers.' },
      { label: 'Budget Tour FAQ', path: ROUTES.FAQ_BUDGET, description: 'Budget-friendly holiday planning.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'See the full FAQ hub.' },
    ],
    relatedLinks: [
      { label: 'Browse all packages', path: '/packages' },
      { label: 'Book a consultation', path: '/contact' },
    ],
  },
  passport: {
    key: 'passport',
    path: ROUTES.FAQ_PASSPORT,
    title: 'Passport FAQ',
    description: 'Passport FAQ covering validity, blank pages, renewals and the documents needed before you book a holiday.',
    heroTitle: 'Passport questions answered.',
    heroDescription: 'Prepare your travel documents with answers about passport validity, renewals and what to check before your departure date.',
    searchPlaceholder: 'Search passport questions...',
    highlights: ['Passport validity', 'Document readiness', 'Booking confidence'],
    faqs: [
      {
        category: 'Validity',
        question: 'How long should my passport be valid for international travel?',
        answer:
          'Many destinations require passport validity beyond the length of your stay. We recommend checking the exact requirement before finalizing your booking.',
      },
      {
        category: 'Blank Pages',
        question: 'Do I need blank passport pages for visas?',
        answer:
          'Yes. Some visa applications require available blank pages in your passport. It is best to confirm this at the time of booking.',
      },
      {
        category: 'Renewal',
        question: 'What if my passport is expiring soon?',
        answer:
          'If your passport is close to expiry, we recommend renewing it before planning international travel. This is especially important for visa-based destinations.',
      },
      {
        category: 'Documents',
        question: 'What documents should I keep ready before booking?',
        answer:
          'Keep your passport, address proof, travel dates, and any prior visa information ready so the trip planning process stays smooth.',
      },
    ],
    relatedFaqs: [
      { label: 'Visa FAQ', path: ROUTES.FAQ_VISA, description: 'Visa application documentation and timing.' },
      { label: 'Travel Insurance FAQ', path: ROUTES.FAQ_INSURANCE, description: 'Document and insurance planning support.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Return to the larger FAQ universe.' },
    ],
    relatedLinks: [
      { label: 'Travel document support', path: '/contact' },
      { label: 'Holiday packages', path: '/packages' },
    ],
  },
  insurance: {
    key: 'insurance',
    path: ROUTES.FAQ_INSURANCE,
    title: 'Travel Insurance FAQ',
    description: 'Travel insurance FAQ covering medical cover, baggage and whether insurance is necessary for visa applications and international trips.',
    heroTitle: 'Travel insurance questions answered.',
    heroDescription: 'Learn why travel insurance matters, what it usually covers, and whether it is required for your destination.',
    searchPlaceholder: 'Search insurance questions...',
    highlights: ['Medical protection', 'Visa readiness', 'Trip disruption support'],
    faqs: [
      {
        category: 'Need',
        question: 'Do I need travel insurance for international travel?',
        answer:
          'Travel insurance is strongly recommended for medical emergencies, baggage loss, and trip interruptions. Some destinations may require it as part of visa documentation.',
      },
      {
        category: 'Cover',
        question: 'What does travel insurance usually cover?',
        answer:
          'Standard travel insurance can include medical assistance, flight delays, cancelled plans, lost baggage, and emergency support depending on the policy.',
      },
      {
        category: 'Visa',
        question: 'Is travel insurance mandatory for a visa application?',
        answer:
          'It may be mandatory or strongly recommended depending on the country and visa type. We can guide you before you submit your application.',
      },
      {
        category: 'Planning',
        question: 'When should I buy travel insurance?',
        answer:
          'It is best to buy travel insurance as soon as you confirm your trip dates so you are covered from the day you book.',
      },
      {
        category: 'Uzbekistan',
        question: 'Do I need travel insurance for an Uzbekistan trip?',
        answer:
          'Yes, travel insurance is strongly recommended for Uzbekistan trips to cover medical emergencies, trip delays and baggage issues while you travel between Tashkent, Samarkand and Bukhara. Our team can help you pick a suitable plan alongside your Uzbekistan booking.',
      },
    ],
    relatedFaqs: [
      { label: 'Visa FAQ', path: ROUTES.FAQ_VISA, description: 'Visa-related insurance questions.' },
      { label: 'Uzbekistan FAQ', path: ROUTES.FAQ_UZB, description: 'Uzbekistan-specific visa, payment and insurance answers.' },
      { label: 'Travel Safety FAQ', path: ROUTES.FAQ_SAFETY, description: 'Safety and support questions for trips abroad.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Go back to the main FAQ page.' },
    ],
    relatedLinks: [
      { label: 'International trip planning', path: '/contact' },
      { label: 'Uzbekistan tour packages', path: '/packages' },
      { label: 'Holiday packages', path: '/packages' },
    ],
  },
  honeymoon: {
    key: 'honeymoon',
    path: ROUTES.FAQ_HONEYM,
    title: 'Honeymoon FAQ',
    description: 'Honeymoon FAQ for Indian couples covering destination choices, packages, budget and private experiences.',
    heroTitle: 'Honeymoon travel questions answered.',
    heroDescription: 'Explore the best honeymoon destinations, package inclusions, and how to create a romantic trip without overspending.',
    searchPlaceholder: 'Search honeymoon questions...',
    highlights: ['Romantic travel ideas', 'Budget-friendly options', 'Custom couple itineraries'],
    faqs: [
      {
        category: 'Destination Choice',
        question: 'Which international destination is best for honeymoon under ₹1.5 lakh?',
        answer:
          'This depends on your travel dates, hotel style and preferred activities. We often recommend destinations that balance romance, scenery and convenience for a budget-friendly honeymoon.',
      },
      {
        category: 'Comparison',
        question: 'Is Bali or Maldives better for honeymoon?',
        answer:
          'Bali is often better for a more varied itinerary and value, while Maldives is ideal if your priority is a luxury, beach-focused escape.',
      },
      {
        category: 'Packages',
        question: 'What is included in a couple\'s honeymoon package?',
        answer:
          'A honeymoon package may include premium stays, airport transfers, select sightseeing, couple activities and special meal arrangements.',
      },
      {
        category: 'Customization',
        question: 'Can honeymoon packages be customized for private experiences?',
        answer:
          'Yes. We can add private transfers, romantic dinners, couple activities, premium suites and other exclusive touches to make the plan feel more personal.',
      },
    ],
    relatedFaqs: [
      { label: 'Dubai FAQ', path: ROUTES.FAQ_DUBAI, description: 'Dubai honeymoon ideas for couples.' },
      { label: 'Thailand FAQ', path: ROUTES.FAQ_THAI, description: 'Thailand as a romantic getaway.' },
      { label: 'Luxury Tour FAQ', path: ROUTES.FAQ_LUXURY, description: 'Premium couple trip ideas.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'View the full FAQ library.' },
    ],
    relatedLinks: [
      { label: 'Honeymoon packages', path: '/packages' },
      { label: 'Romantic travel blogs', path: '/blogs' },
      { label: 'Talk to us about a honeymoon plan', path: '/contact' },
    ],
  },
  family: {
    key: 'family',
    path: ROUTES.FAQ_FAMILY,
    title: 'Family Tour FAQ',
    description: 'Family tour FAQ covering child-friendly destinations, elder-friendly travel and how to plan international holidays with kids.',
    heroTitle: 'Family tour questions answered.',
    heroDescription: 'Find answers on the best family destinations, travel pace, room setup and how to plan a smoother trip for children and elderly parents.',
    searchPlaceholder: 'Search family tour questions...',
    highlights: ['Kid-friendly itineraries', 'Multi-generational planning', 'Comfort-first travel'],
    faqs: [
      {
        category: 'Destination Choice',
        question: 'Which international trip is best for families with young kids?',
        answer:
          'Destinations such as Dubai and Thailand are often easy for families because they offer comfortable hotels, simple transport, and a mix of culture and leisure.',
      },
      {
        category: 'Customization',
        question: 'Are family packages customizable for elderly parents?',
        answer:
          'Yes. We can reduce transfers, choose accessible hotels, pace the schedule more gently and include rest time for the comfort of older travelers.',
      },
      {
        category: 'Budget',
        question: 'What is the best international destination for a family under ₹50,000 per person?',
        answer:
          'The ideal option depends on duration, hotel category and flight inclusion. We can help you find a family-friendly option that stays within the budget you have in mind.',
      },
      {
        category: 'Room Setup',
        question: 'Can family packages include connected rooms or extra beds?',
        answer:
          'Yes. We can request room configurations that suit children, siblings, seniors or multiple couples traveling together.',
      },
    ],
    relatedFaqs: [
      { label: 'Group Tour FAQ', path: ROUTES.FAQ_GROUP, description: 'Questions about group departures and shared itineraries.' },
      { label: 'Budget Tour FAQ', path: ROUTES.FAQ_BUDGET, description: 'Affordable family vacation planning.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Browse the main FAQ hub.' },
    ],
    relatedLinks: [
      { label: 'Family packages', path: '/packages' },
      { label: 'Talk to our travel advisors', path: '/contact' },
    ],
  },
  group: {
    key: 'group',
    path: ROUTES.FAQ_GROUP,
    title: 'Group Tour FAQ',
    description: 'Group tour FAQ covering group sizes, corporate trips, friend trips and coordination support for large travel parties.',
    heroTitle: 'Group tour questions answered.',
    heroDescription: 'Learn what to expect from group tours, minimum group sizes, shared transport and how we structure the itinerary for larger travel parties.',
    searchPlaceholder: 'Search group tour questions...',
    highlights: ['Group coordination', 'Shared transport', 'Friendly pacing'],
    faqs: [
      {
        category: 'Planning',
        question: 'Do you arrange group tours?',
        answer:
          'Yes. We plan group tours for family gatherings, friends groups, college trips, and corporate travel teams.',
      },
      {
        category: 'Group Size',
        question: 'What is the minimum group size for a group package?',
        answer:
          'The minimum size depends on the destination and package type. In many cases, a group size of 10 or more can be arranged smoothly.',
      },
      {
        category: 'Transport',
        question: 'Will transport be shared in a group package?',
        answer:
          'Yes, shared transport is common in group travel. We can also offer private vehicle upgrades where needed.',
      },
      {
        category: 'Support',
        question: 'Will a tour coordinator be available?',
        answer:
          'For many group departures, our support team or a local coordinator helps manage arrivals, transfers, and day-to-day coordination.',
      },
    ],
    relatedFaqs: [
      { label: 'Corporate Tour FAQ', path: ROUTES.FAQ_CORP, description: 'Questions about corporate offsite and incentive travel.' },
      { label: 'Family Tour FAQ', path: ROUTES.FAQ_FAMILY, description: 'Family-friendly group travel questions.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Visit the main FAQ hub.' },
    ],
    relatedLinks: [
      { label: 'Group packages', path: '/packages' },
      { label: 'Plan a group trip', path: '/contact' },
    ],
  },
  corporate: {
    key: 'corporate',
    path: ROUTES.FAQ_CORP,
    title: 'Corporate Tour FAQ',
    description: 'Corporate tour FAQ covering MICE, offsites, incentive travel and how we coordinate corporate holiday plans from India.',
    heroTitle: 'Corporate travel questions answered.',
    heroDescription: 'Learn how we structure corporate tours, team itineraries and offsite planning for companies and travel leaders.',
    searchPlaceholder: 'Search corporate tour questions...',
    highlights: ['Corporate offsites', 'Team travel planning', 'Seamless coordination'],
    faqs: [
      {
        category: 'Corporate Trips',
        question: 'Do you offer corporate group tour packages from Delhi?',
        answer:
          'Yes. We can plan corporate offsites and incentive trips with flights, hotels, activities, and a team coordinator.',
      },
      {
        category: 'Planning',
        question: 'What does a corporate itinerary usually include?',
        answer:
          'A corporate itinerary typically covers transfers, accommodation, meeting spaces, team activities and a structured travel schedule.',
      },
      {
        category: 'Customization',
        question: 'Can corporate packages be customized?',
        answer:
          'Yes. We tailor the package to your budget, travel dates, team size and preferred destination.',
      },
    ],
    relatedFaqs: [
      { label: 'Group Tour FAQ', path: ROUTES.FAQ_GROUP, description: 'Shared group travel planning.' },
      { label: 'Luxury Tour FAQ', path: ROUTES.FAQ_LUXURY, description: 'Premium corporate travel experiences.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Go back to the main FAQ hub.' },
    ],
    relatedLinks: [
      { label: 'Corporate package enquiries', path: '/contact' },
      { label: 'Holiday packages', path: '/packages' },
    ],
  },
  student: {
    key: 'student',
    path: ROUTES.FAQ_STUDENT,
    title: 'Student Tour FAQ',
    description: 'Student tour FAQ covering educational trips, group travel planning and budget-friendly student travel ideas.',
    heroTitle: 'Student tour questions answered.',
    heroDescription: 'Plan educational or student group travel with answers on budgeting, student-friendly destinations and trip support.',
    searchPlaceholder: 'Search student tour questions...',
    highlights: ['Student-friendly travel', 'Budget planning', 'Group organization'],
    faqs: [
      {
        category: 'Planning',
        question: 'Do you plan student tours?',
        answer:
          'Yes. We help structure student tours with budget awareness, group coordination and safe itinerary planning.',
      },
      {
        category: 'Budget',
        question: 'How can student tours stay affordable?',
        answer:
          'Budget-friendly student tours often focus on shared stays, simple transfers, and a more compact itinerary with fewer premium add-ons.',
      },
      {
        category: 'Support',
        question: 'Will student groups receive trip support?',
        answer:
          'Yes. We coordinate travel documentation, accommodation and overall itinerary support for the group.',
      },
    ],
    relatedFaqs: [
      { label: 'Group Tour FAQ', path: ROUTES.FAQ_GROUP, description: 'Group travel answers for larger communities.' },
      { label: 'Budget Tour FAQ', path: ROUTES.FAQ_BUDGET, description: 'Budget-conscious travel planning.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Open the main FAQ library.' },
    ],
    relatedLinks: [
      { label: 'Student travel planning', path: '/contact' },
      { label: 'Browse packages', path: '/packages' },
    ],
  },
  luxury: {
    key: 'luxury',
    path: ROUTES.FAQ_LUXURY,
    title: 'Luxury Tour FAQ',
    description: 'Luxury tour FAQ covering premium hotels, private transfers, room upgrades and what to expect from a high-end package.',
    heroTitle: 'Luxury travel questions answered.',
    heroDescription: 'Understand how premium packages work, what is usually included, and how we personalize luxury itineraries for couples and families.',
    searchPlaceholder: 'Search luxury tour questions...',
    highlights: ['Premium stays', 'Private experiences', 'Upscale service'],
    faqs: [
      {
        category: 'Premium Stays',
        question: 'What is included in a luxury package?',
        answer:
          'Luxury packages usually include premium hotels, private transfers, curated sightseeing, and more personalized service.',
      },
      {
        category: 'Private Travel',
        question: 'Can luxury packages include private guides and transfers?',
        answer:
          'Yes. Private guides, premium transfers and tailored experiences are common upgrades in luxury itineraries.',
      },
      {
        category: 'Couples',
        question: 'Is luxury travel good for honeymooners?',
        answer:
          'Yes. Luxury packages are a popular choice for honeymooners who want comfort, exclusivity and a slower pace.',
      },
    ],
    relatedFaqs: [
      { label: 'Honeymoon FAQ', path: ROUTES.FAQ_HONEYM, description: 'Romantic and luxury-focused couple travel.' },
      { label: 'Hotel Booking FAQ', path: ROUTES.FAQ_HOTEL, description: 'Stay categories and room upgrades.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Head back to the general FAQ hub.' },
    ],
    relatedLinks: [
      { label: 'Luxury packages', path: '/packages' },
      { label: 'Plan a luxury trip', path: '/contact' },
    ],
  },
  budget: {
    key: 'budget',
    path: ROUTES.FAQ_BUDGET,
    title: 'Budget Tour FAQ',
    description: 'Budget tour FAQ covering affordable destinations, package structure and how to reduce travel cost without sacrificing comfort.',
    heroTitle: 'Budget trip questions answered.',
    heroDescription: 'Learn how to plan a value-forward international holiday with the right destination, hotel choices and timing.',
    searchPlaceholder: 'Search budget tour questions...',
    highlights: ['Affordable destinations', 'Smart value planning', 'Cost control'],
    faqs: [
      {
        category: 'Value',
        question: 'Which destinations are best for a budget international trip?',
        answer:
          'Thailand, Uzbekistan and Georgia are often strong value choices for Indian travelers when paired with smart flight and hotel planning.',
      },
      {
        category: 'Planning',
        question: 'How can I reduce the cost of a package?',
        answer:
          'Reducing cost usually comes from booking earlier, traveling in shoulder seasons, choosing simpler hotels, and keeping the itinerary focused.',
      },
      {
        category: 'Families',
        question: 'Can a budget package still include comfort?',
        answer:
          'Yes. Budget packages can still offer good value with clean stays, essential sightseeing, and a comfortable pace.',
      },
    ],
    relatedFaqs: [
      { label: 'Payment FAQ', path: ROUTES.FAQ_PAYMENT, description: 'Questions about booking cost and installments.' },
      { label: 'Family Tour FAQ', path: ROUTES.FAQ_FAMILY, description: 'Value-friendly family vacation answers.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Browse all FAQ pages.' },
    ],
    relatedLinks: [
      { label: 'Budget packages', path: '/packages' },
      { label: 'Travel planning help', path: '/contact' },
    ],
  },
  packing: {
    key: 'packing',
    path: ROUTES.FAQ_PACKING,
    title: 'Packing FAQ',
    description: 'Packing FAQ covering the essentials for Dubai, Thailand, Georgia, Uzbekistan and other international trips.',
    heroTitle: 'Packing questions answered.',
    heroDescription: 'Make sure you are prepared with practical packing guidance for weather, culture, travel documents and airport essentials.',
    searchPlaceholder: 'Search packing questions...',
    highlights: ['Trip essentials', 'Season-specific packing', 'Document readiness'],
    faqs: [
      {
        category: 'Essentials',
        question: 'What should I pack for an international trip?',
        answer:
          'You should carry travel documents, medicines, a universal adapter, comfortable clothing, formal wear if needed, and a day bag for sightseeing.',
      },
      {
        category: 'Weather',
        question: 'How do I pack for Dubai and Thailand?',
        answer:
          'These destinations are warm for much of the year, so light clothing, sunscreen, sunglasses and breathable footwear are useful.',
      },
      {
        category: 'Winter',
        question: 'What should I pack for Georgia in winter?',
        answer:
          'Layers, a warm jacket, boots, and thermals are useful if you plan to visit mountain areas such as Gudauri.',
      },
      {
        category: 'Documents',
        question: 'Should I carry printed copies of my documents?',
        answer:
          'Yes. It is helpful to carry printed copies of your passport, visa, hotel details, and emergency contact information.',
      },
    ],
    relatedFaqs: [
      { label: 'Travel Safety FAQ', path: ROUTES.FAQ_SAFETY, description: 'Packing and safety preparation tips.' },
      { label: 'Travel Insurance FAQ', path: ROUTES.FAQ_INSURANCE, description: 'Cover documents and health plans.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'View the main FAQ hub.' },
    ],
    relatedLinks: [
      { label: 'Packing and travel blogs', path: '/blogs' },
      { label: 'Speak with our travel team', path: '/contact' },
    ],
  },
  safety: {
    key: 'safety',
    path: ROUTES.FAQ_SAFETY,
    title: 'Travel Safety FAQ',
    description: 'Travel safety FAQ covering destination safety, solo travel, emergency support, and how we help during international holidays.',
    heroTitle: 'Travel safety questions answered.',
    heroDescription: 'Get practical advice on staying safe abroad, handling emergencies, and traveling with confidence on your next holiday.',
    searchPlaceholder: 'Search travel safety questions...',
    highlights: ['Safe destination guidance', 'Emergency support', 'Solo-travel confidence'],
    faqs: [
      {
        category: 'Destination Safety',
        question: 'Is Dubai safe for solo women travelers?',
        answer:
          'Dubai is generally considered safe for solo travelers and women, but standard precautions still matter, especially at night and when using unfamiliar transport.',
      },
      {
        category: 'Destination Safety',
        question: 'Is Uzbekistan safe for Indian tourists?',
        answer:
          'Yes. Uzbekistan is widely regarded as a welcoming and safe destination for Indian travelers when normal travel precautions are followed.',
      },
      {
        category: 'Emergency Support',
        question: 'Will someone support us during the trip?',
        answer:
          'Yes. We remain available before departure and during the trip for support and coordination if anything changes.',
      },
      {
        category: 'Planning',
        question: 'How can I travel safely with a group or family?',
        answer:
          'Good planning, hotel selection, transport coordination, and having local support contacts make group and family travel much smoother.',
      },
    ],
    relatedFaqs: [
      { label: 'Travel Insurance FAQ', path: ROUTES.FAQ_INSURANCE, description: 'Protective cover for emergency travel situations.' },
      { label: 'Packing FAQ', path: ROUTES.FAQ_PACKING, description: 'Prepare for weather and emergencies.' },
      { label: 'Master FAQ', path: ROUTES.FAQ, description: 'Browse the complete FAQ ecosystem.' },
    ],
    relatedLinks: [
      { label: 'Safety-focused travel tips', path: '/blogs' },
      { label: 'Contact our support team', path: '/contact' },
    ],
  },
}

export const faqPageOrder = [
  'master',
  'dubai',
  'thailand',
  'uzbekistan',
  'georgia',
  'visa',
  'flight',
  'hotel',
  'payment',
  'emi',
  'passport',
  'insurance',
  'honeymoon',
  'family',
  'group',
  'corporate',
  'student',
  'luxury',
  'budget',
  'packing',
  'safety',
]

export const getFaqPageConfig = (pageKey = 'master') => faqPageConfigs[pageKey] || faqPageConfigs.master