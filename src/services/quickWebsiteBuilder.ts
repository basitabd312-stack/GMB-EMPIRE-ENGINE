import { UniqueBusinessPower } from '../types/empire';

// Automatically builds a complete 100/100 UniqueBusinessPower profile from ANY business name
export function buildQuickWebsiteBusiness(rawName: string, fallbackLocation: string): { business: UniqueBusinessPower; location: string; category: string } {
  const name = rawName.trim() || 'London Plumber';
  
  // Extract location and trade heuristics
  let derivedCity = fallbackLocation.split(',')[0].trim() || 'London';
  let derivedCategory = 'Emergency Plumber';

  const lower = name.toLowerCase();

  if (lower.includes('london')) derivedCity = 'London, UK';
  else if (lower.includes('dallas')) derivedCity = 'Dallas, TX';
  else if (lower.includes('new york') || lower.includes('nyc')) derivedCity = 'New York, NY';
  else if (lower.includes('austin')) derivedCity = 'Austin, TX';
  else if (lower.includes('miami')) derivedCity = 'Miami, FL';
  else if (lower.includes('manchester')) derivedCity = 'Manchester, UK';
  else if (lower.includes('chicago')) derivedCity = 'Chicago, IL';
  else if (lower.includes('birmingham')) derivedCity = 'Birmingham, UK';

  if (lower.includes('plumb') || lower.includes('drain') || lower.includes('pipe') || lower.includes('boiler')) {
    derivedCategory = 'Plumbing & Heating Specialist';
  } else if (lower.includes('roof') || lower.includes('shingle') || lower.includes('gutter')) {
    derivedCategory = 'Roofing & Exterior Contractor';
  } else if (lower.includes('electric') || lower.includes('wire')) {
    derivedCategory = 'Certified Master Electrician';
  } else if (lower.includes('hvac') || lower.includes('ac') || lower.includes('cool') || lower.includes('heat')) {
    derivedCategory = 'HVAC & Climate Control Specialist';
  } else if (lower.includes('dent') || lower.includes('smile')) {
    derivedCategory = 'Cosmetic & Family Dentistry';
  } else if (lower.includes('auto') || lower.includes('detail') || lower.includes('car')) {
    derivedCategory = 'Luxury Automotive Detailing';
  } else if (lower.includes('law') || lower.includes('legal') || lower.includes('attorney')) {
    derivedCategory = 'Injury & Commercial Litigation';
  }

  const phone = derivedCity.includes('UK') || derivedCity.includes('London') ? '+44 20 7946 0991' : '(800) 555-0199';

  const descriptionText = `${name} is ${derivedCity}'s premier ${derivedCategory} service, providing 24/7 rapid emergency dispatch and turnkey installations. Backed by over a decade of commercial and residential excellence, our certified master technicians arrive fully equipped in mobile warehouse vans stocked with OEM parts to resolve 98% of disruptions on the first visit. We believe in total financial transparency: you receive a guaranteed, upfront written estimate before any wrench is turned—no diagnostic surprise fees, no hidden overtime surcharges. Serving all neighborhoods across ${derivedCity} with £5M/$5M full liability insurance, 100% satisfaction guarantee, and friendly, polite service that leaves your home spotless. Call ${phone} now for immediate priority dispatch or instant quote consultation.`;

  const business: UniqueBusinessPower = {
    id: `quick-gen-${Date.now()}`,
    businessName: name,
    conceptTag: `Astra Pro $5M Standard • ${derivedCategory}`,
    advantageTwist30Pct: {
      headline: `60-Minute Rapid Dispatch Guarantee + 10-Year Zero-Leak Warranty`,
      details: `Unlike traditional contractors who make you wait for 4-hour arrival windows, ${name} guarantees an on-site master technician within 60 minutes anywhere in ${derivedCity}. Includes upfront guaranteed fixed pricing and 100% written warranty.`,
      psychologicalHook: `Immediate relief from property disruption anxiety with zero waiting and written price security.`,
      conversionAdvantage: `Converts panic emergency calls at a 78% rate vs. industry average of 34%.`
    },
    gmbDescription750: {
      text: descriptionText,
      charCount: descriptionText.length,
      keywordDensity: ['24/7 rapid emergency dispatch', derivedCategory.toLowerCase(), derivedCity, 'guaranteed fixed pricing', 'satisfaction guarantee'],
      callToAction: `Call ${phone} for 24/7 Priority Emergency Dispatch.`
    },
    services10: [
      {
        name: `Emergency 24/7 Rapid Response & Dispatch`,
        priceGuide: derivedCity.includes('UK') ? '£95 Fixed Diagnostic' : '$149 Fixed Diagnostic',
        benefit: `Technician on site within 60 minutes with full mobile equipment.`,
        gmbServiceCategory: 'Emergency Services'
      },
      {
        name: `Complete System Inspection & Diagnostic Scan`,
        priceGuide: 'FREE with Repair',
        benefit: `High-resolution inspection identifying hidden leaks and wear before major failure.`,
        gmbServiceCategory: 'Inspection & Diagnostics'
      },
      {
        name: `High-Pressure Hydro-Jetting & Drain Clearance`,
        priceGuide: derivedCity.includes('UK') ? 'From £165' : 'From $240',
        benefit: `Restores pipe diameter to 100% flow capacity with zero chemical damage.`,
        gmbServiceCategory: 'Drain Cleaning'
      },
      {
        name: `High-Efficiency Boiler & Heating Installation`,
        priceGuide: derivedCity.includes('UK') ? 'From £1,850 Installed' : 'From $2,400 Installed',
        benefit: `A-Rated energy efficiency reducing monthly utility bills by up to 30%.`,
        gmbServiceCategory: 'Installation & Replacement'
      },
      {
        name: `Precision Pipe & Valve Replacement`,
        priceGuide: derivedCity.includes('UK') ? 'From £120' : 'From $180',
        benefit: `Commercial-grade copper and brass fittings with 15-year warranty.`,
        gmbServiceCategory: 'Repairs & Maintenance'
      },
      {
        name: `Water Heater & Cylinder Overhaul`,
        priceGuide: derivedCity.includes('UK') ? 'From £420' : 'From $650',
        benefit: `Continuous instant hot water and scale prevention filtration.`,
        gmbServiceCategory: 'Water Heating'
      },
      {
        name: `Bathroom & Fixture Modernization`,
        priceGuide: derivedCity.includes('UK') ? 'From £350' : 'From $550',
        benefit: `Designer taps, thermostatic rain showers, and leak-free seals.`,
        gmbServiceCategory: 'Fixture Upgrades'
      },
      {
        name: `Commercial Facilities Maintenance Contract`,
        priceGuide: 'Custom Tailored SLA',
        benefit: `Priority queue access, discounted parts, and quarterly compliance signoffs.`,
        gmbServiceCategory: 'Commercial SLA'
      },
      {
        name: `Leak Detection & Thermal Imaging Survey`,
        priceGuide: derivedCity.includes('UK') ? '£180 Complete Scan' : '$250 Complete Scan',
        benefit: `Non-invasive acoustic and thermal detection saving walls and floors.`,
        gmbServiceCategory: 'Non-Destructive Detection'
      },
      {
        name: `Preventative Annual Protection Plan`,
        priceGuide: derivedCity.includes('UK') ? '£19/month' : '$29/month',
        benefit: `Annual boiler/plumbing tune-up, priority booking, and zero call-out fees.`,
        gmbServiceCategory: 'Membership Plan'
      }
    ],
    posts5: [
      {
        type: 'Exclusive Offer',
        title: `🚨 60-Minute Emergency Guarantee in ${derivedCity}!`,
        body: `Suffering a surprise disruption? ${name} is on call 24 hours a day with guaranteed 60-minute dispatch across all boroughs. No hidden fees, upfront pricing!`,
        ctaButton: 'CALL_NOW',
        callToActionUrlOrPhone: phone
      },
      {
        type: 'Service Spotlight',
        title: `Spring Maintenance Checklist for ${derivedCity} Property Owners`,
        body: `Prevent costly repairs with our 21-point system audit. Our master technicians inspect pressure, valves, and flow to ensure your property runs smoothly.`,
        ctaButton: 'BOOK',
        callToActionUrlOrPhone: phone
      },
      {
        type: 'Exclusive Offer',
        title: `£100 / $150 Off High-Efficiency System Upgrades This Month`,
        body: `Upgrade your system to energy-star A-rated hardware and save on your energy bills. Free in-home consultation!`,
        ctaButton: 'GET_OFFER',
        callToActionUrlOrPhone: phone
      },
      {
        type: 'Local Tip / FAQ',
        title: `Community Safety & Winterization Walkthrough`,
        body: `Follow these 3 quick tips from our certified technicians to protect your pipes and heating from freezing temperatures.`,
        ctaButton: 'LEARN_MORE',
        callToActionUrlOrPhone: phone
      },
      {
        type: 'Social Proof & Trust',
        title: `Proud to Announce 100+ 5-Star Reviews on Google!`,
        body: `Thank you to our amazing local clients in ${derivedCity} for trusting ${name}. We remain committed to unbeatable quality and transparency.`,
        ctaButton: 'LEARN_MORE',
        callToActionUrlOrPhone: phone
      }
    ],
    photoPrompts3: [
      {
        angleTitle: 'Commercial Fleet & Mobile Warehouse',
        prompt: `Pristine commercial service van branded with "${name}" parked outside an elegant townhouse in ${derivedCity}, morning golden hour sunlight, 8K ultra realistic.`,
        lightingAndStaging: 'Crisp morning daylight reflecting off polished vehicle paint, showing professional tools neatly racked.',
        geoTagExifSimulation: `GPS Coordinates: ${derivedCity} Centroid • ISO 100, f/2.8, 1/500s`,
        gmbTabCategory: 'Exterior'
      },
      {
        angleTitle: 'Master Technician Precision Repair',
        prompt: `Smiling master technician wearing clean navy polo uniform with "${name}" embroidered crest holding copper pipe fittings and digital tablet, spotless luxury home interior, 8K hyper detailed.`,
        lightingAndStaging: 'Warm ambient residential lighting with sharp focus on diagnostic instruments.',
        geoTagExifSimulation: `GPS Coordinates: ${derivedCity} West Metro • ISO 200, f/1.8, 1/250s`,
        gmbTabCategory: 'At Work'
      },
      {
        angleTitle: 'Delighted Client Handshake & Warranty',
        prompt: `Friendly handshake between cheerful homeowner and lead technician in a bright modern kitchen, showing completed work and warranty certificate, authentic documentary style, 8K.`,
        lightingAndStaging: 'Natural soft window light, high emotional warmth and authentic customer trust.',
        geoTagExifSimulation: `GPS Coordinates: ${derivedCity} Central • ISO 160, f/2.0, 1/320s`,
        gmbTabCategory: 'Team'
      }
    ]
  };

  return {
    business,
    location: derivedCity,
    category: derivedCategory
  };
}
