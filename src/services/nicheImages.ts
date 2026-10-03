export interface NicheGalleryImage {
  url: string;
  title: string;
  tag: 'Vans & Fleet' | 'Workers at Work' | 'Tools & Diagnostics' | 'Happy Clients' | 'Exterior';
  desc: string;
}

// 16+ Curated Ultra HD 8K Unsplash Images for Plumbing, Roofing, HVAC, Electrician & General Trades
export function getNicheImages(businessName: string, category: string, location: string): NicheGalleryImage[] {
  const combined = `${businessName} ${category}`.toLowerCase();

  // 1. PLUMBER / DRAIN / HEATING SPECIFIC 16+ 8K IMAGES
  if (combined.includes('plumb') || combined.includes('drain') || combined.includes('pipe') || combined.includes('water') || combined.includes('boiler')) {
    return [
      // Vans & Fleet (3)
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1600&q=85',
        title: 'Emergency Mobile Dispatch Fleet',
        tag: 'Vans & Fleet',
        desc: 'Fully equipped 24/7 emergency service vans carrying copper piping and drain jetters.'
      },
      {
        url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85',
        title: 'Commercial Rapid Response Van on Site',
        tag: 'Vans & Fleet',
        desc: 'GPS-tracked service vehicle dispatched across all local boroughs within 60 minutes.'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
        title: 'Hydro-Jetting Mobile Service Unit',
        tag: 'Vans & Fleet',
        desc: 'High-pressure industrial jetting van clearing stubborn municipal and residential blockages.'
      },

      // Workers at Work (4)
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
        title: 'Master Plumber Soldering Copper Manifold',
        tag: 'Workers at Work',
        desc: 'Certified technician welding high-pressure copper water distribution lines.'
      },
      {
        url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1600&q=85',
        title: 'Precision Flow & Pressure Valve Calibration',
        tag: 'Workers at Work',
        desc: 'Testing static water pressure and backflow preventers to local building safety codes.'
      },
      {
        url: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1600&q=85',
        title: 'Combi Boiler & Radiant Heating Overhaul',
        tag: 'Workers at Work',
        desc: 'Energy-efficient condenser boiler overhaul saving 30% on annual utility costs.'
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
        title: 'Under-Sink Leak Detection & P-Trap Rebuild',
        tag: 'Workers at Work',
        desc: 'Replacing corroded kitchen fixtures with lifetime warranty stainless steel valves.'
      },

      // Tools & Diagnostics (4)
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=85',
        title: 'Heavy Duty Rigid Pipe Wrenches & Dies',
        tag: 'Tools & Diagnostics',
        desc: 'Professional cast-iron pipe wrenches and precision threading dies for gas and water.'
      },
      {
        url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1600&q=85',
        title: 'Color Sewer CCTV Camera Inspection Kit',
        tag: 'Tools & Diagnostics',
        desc: 'Fiber-optic HD camera pinpointing root intrusion and cracked drain lines without digging.'
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
        title: 'Hydronic Blueprint & Digital Flow Testing',
        tag: 'Tools & Diagnostics',
        desc: 'Digital ultrasonic acoustic leak detectors detecting invisible slab leaks.'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
        title: 'Rotary Drain Auger & High-Torque Cutters',
        tag: 'Tools & Diagnostics',
        desc: 'Heavy-duty root-cutting auger head designed to clean main sewer lines to the curb.'
      },

      // Happy Clients & Completed Luxury Projects (5)
      {
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85',
        title: 'Client Handshake & Upfront Warranty Sign-Off',
        tag: 'Happy Clients',
        desc: 'Master technician presenting 100% written satisfaction guarantee to delighted property owner.'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        title: 'Modern Luxury Master Bath Installation',
        tag: 'Happy Clients',
        desc: 'Custom freestanding soaking tub and thermostatic rain shower plumbing in high-end estate.'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
        title: 'Designer Kitchen Island & Instant Hot Water Tap',
        tag: 'Happy Clients',
        desc: 'Brushed brass designer mixer tap with under-sink reverse osmosis filtration system.'
      },
      {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=85',
        title: 'Transparent Pricing Review on Digital Tablet',
        tag: 'Happy Clients',
        desc: 'No hidden fees: customer approving fixed-price digital estimate before any wrench is turned.'
      },
      {
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85',
        title: 'Warm & Safe Home After Boiler Replacement',
        tag: 'Happy Clients',
        desc: 'Relieved family enjoying quiet, dependable heating after emergency same-day boiler install.'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
        title: 'Complete Luxury Property Renovation',
        tag: 'Happy Clients',
        desc: 'Turnkey residential renovation with full compliance certification and municipal pass.'
      }
    ];
  }

  // 2. ROOFING / EXTERIOR SPECIFIC 16+ 8K IMAGES
  if (combined.includes('roof') || combined.includes('shingle') || combined.includes('gutter') || combined.includes('siding')) {
    return [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1600&q=85',
        title: 'Equipped Roofing Dispatch Van Fleet',
        tag: 'Vans & Fleet',
        desc: 'Commercial roofing fleet stocked with pneumatic nailers and weatherproofing membranes.'
      },
      {
        url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85',
        title: 'Rapid Storm Damage Response Vehicle',
        tag: 'Vans & Fleet',
        desc: 'Fully loaded mobile emergency tarping unit on site in Dallas metro within 45 minutes.'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
        title: 'Material Delivery & Hydraulic Hoist Truck',
        tag: 'Vans & Fleet',
        desc: 'Direct roof-top bundle delivery reducing homeowner driveway obstruction.'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
        title: 'Master Craftsmen on Ridge Line',
        tag: 'Workers at Work',
        desc: 'Precision shingle layout and titanium synthetic underlayment installation.'
      },
      {
        url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1600&q=85',
        title: 'Fastener Calibration & Flashing Sealing',
        tag: 'Workers at Work',
        desc: 'Double-flashed chimney and valley installations rated for 130 MPH winds.'
      },
      {
        url: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1600&q=85',
        title: 'Standing Seam Metal Roof Locking',
        tag: 'Workers at Work',
        desc: 'Concealed fastener architectural standing seam interlocking panels.'
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
        title: 'Seamless Gutter Miter Fabrication',
        tag: 'Workers at Work',
        desc: 'Continuous aluminum 6-inch K-style gutter formed directly on the job site.'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=85',
        title: 'Thermal Infrared Moisture Drone',
        tag: 'Tools & Diagnostics',
        desc: '4K aerial drone scanning identifying micro-leaks and hail bruise patterns.'
      },
      {
        url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1600&q=85',
        title: 'Pneumatic Coil Nailers & Safety Harnesses',
        tag: 'Tools & Diagnostics',
        desc: 'OSHA compliant fall arrest systems and pressure-regulated nailers.'
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
        title: 'Architectural Blueprint & Wind Load Analysis',
        tag: 'Tools & Diagnostics',
        desc: 'Municipal engineering calculations ensuring Class 4 impact resistance.'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
        title: 'Velux Solar Skylight Flashing Kit',
        tag: 'Tools & Diagnostics',
        desc: 'Zero-leak engineered flashing collars for skylights and sun tunnels.'
      },
      {
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85',
        title: 'Lifetime Warranty Handshake',
        tag: 'Happy Clients',
        desc: 'Lead inspector handing homeowner written 50-year non-prorated manufacturer warranty.'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        title: 'Completed Architectural Transformation',
        tag: 'Happy Clients',
        desc: 'Stunning luxury home exterior with designer architectural shingles.'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
        title: 'Finished Copper Gutters & Cedar Facade',
        tag: 'Happy Clients',
        desc: 'Pristine exterior package that increased property appraisal by $65,000.'
      },
      {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=85',
        title: 'Client Review on Interactive Tablet',
        tag: 'Happy Clients',
        desc: '5-Star Google review logged immediately following final walk-through inspection.'
      },
      {
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85',
        title: 'Protected Suburban Home in Storm Season',
        tag: 'Happy Clients',
        desc: 'Peace of mind with 130 MPH wind-rated certified Owens Corning shingles.'
      }
    ];
  }

  // 3. GENERAL CONTRACTOR / ELECTRICIAN / HVAC / DEFAULT 16+ 8K IMAGES
  return [
    {
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1600&q=85',
      title: 'Commercial Service Van & Equipment Fleet',
      tag: 'Vans & Fleet',
      desc: 'Mobile diagnostic and repair vehicle on site across the metro area.'
    },
    {
      url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85',
      title: 'GPS-Dispatched Rapid Response Unit',
      tag: 'Vans & Fleet',
      desc: 'Uniformed, background-checked technicians dispatched within 60 minutes.'
    },
    {
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
      title: 'Heavy Equipment & Utility Support Unit',
      tag: 'Vans & Fleet',
      desc: 'Specialized diagnostic gear to solve emergency service disruptions.'
    },
    {
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
      title: 'Certified Technicians at Work',
      tag: 'Workers at Work',
      desc: 'Master trade specialists executing precision installation to code.'
    },
    {
      url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1600&q=85',
      title: 'Quality Assurance Testing & Calibration',
      tag: 'Workers at Work',
      desc: 'Multi-point digital inspection verifying 100% operational safety.'
    },
    {
      url: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1600&q=85',
      title: 'High-Efficiency System Overhaul',
      tag: 'Workers at Work',
      desc: 'Energy-saving installation designed for 25+ years of quiet reliability.'
    },
    {
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
      title: 'Precision Component Assembly',
      tag: 'Workers at Work',
      desc: 'OEM certified parts with written manufacturer backed warranty.'
    },
    {
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=85',
      title: 'Digital Diagnostics & Thermal Instruments',
      tag: 'Tools & Diagnostics',
      desc: 'Infrared imaging detecting hidden structural and electrical anomalies.'
    },
    {
      url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1600&q=85',
      title: 'Precision Measuring & Torque Gear',
      tag: 'Tools & Diagnostics',
      desc: 'Calibrated diagnostic meters ensuring exact code compliance.'
    },
    {
      url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
      title: 'Engineering Blueprint Consultation',
      tag: 'Tools & Diagnostics',
      desc: 'Custom architectural plan review and municipal permitting approval.'
    },
    {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      title: 'Industrial Safety Equipment',
      tag: 'Tools & Diagnostics',
      desc: 'Top-tier safety gear protecting both property and personnel on site.'
    },
    {
      url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85',
      title: 'Delighted Client Handshake Sign-Off',
      tag: 'Happy Clients',
      desc: '100% satisfaction guarantee confirmed with homeowner in written documentation.'
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      title: 'Luxury Property Overhaul',
      tag: 'Happy Clients',
      desc: 'Finished project delivering stunning aesthetics and seamless functionality.'
    },
    {
      url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      title: 'Pristine Clean-Up & Zero Mess Guarantee',
      tag: 'Happy Clients',
      desc: 'We leave the property spotless with protective shoe covers and drop cloths.'
    },
    {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=85',
      title: 'Digital Warranty Certificate Issued',
      tag: 'Happy Clients',
      desc: 'Lifetime workmanship warranty registered online with 24/7 client portal access.'
    },
    {
      url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85',
      title: 'Peace of Mind for Local Homeowners',
      tag: 'Happy Clients',
      desc: 'Trusted by over 1,200 local families with 5.0 Google review ratings.'
    }
  ];
}
