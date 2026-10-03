export interface UnclaimedListing {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  category: string;
  claimStatus: 'Unclaimed' | 'Partially Claimed' | 'Vulnerable';
  opportunityScore: number; // 0 - 100
  potentialRevenueGain: string;
  vulnerabilityFactor: string;
  recommendedAction: string;
}

export interface SABListing {
  id: string;
  name: string;
  businessType: 'SAB (Hidden Address)' | 'Hybrid (Physical + SAB)' | 'Storefront Only';
  radiusMiles: number;
  coverageZones: string[];
  rankingEfficiency: number; // 0 - 100
  suspensionRisk: 'Low' | 'Medium' | 'High';
  tacticalVerdict: string;
}

export interface TopCompetitor {
  rank: 1 | 2 | 3;
  name: string;
  rating: number;
  reviewsCount: number;
  reviewVelocityPerMonth: number;
  primaryCategory: string;
  secondaryCategories: string[];
  photosCount: number;
  websiteAuthority: number; // Domain rating
  hasBookingButton: boolean;
  citationCount: number;
  biggestWeakness: string;
  takeoverStrategy: string;
}

export interface KeywordItem {
  rank: number;
  keyword: string;
  monthlyVolume: string;
  cpc: string;
  competition: 'Low' | 'Medium' | 'High';
  intent: 'Transactional' | 'Commercial' | 'Local Geo-Intent';
  prominenceScore: number; // 0 - 100
  recommendedPlacement: 'Title + Category' | 'Description' | 'Services' | 'Posts';
}

export interface CategoryGap {
  category: string;
  type: 'Primary' | 'Secondary';
  competitorAdoptionPct: number;
  trafficPotential: 'Extreme' | 'High' | 'Moderate';
  status: 'Critical Missing' | 'Recommended Addition' | 'Optional';
}

export interface ReviewGapMetric {
  metric: string;
  topCompetitorsAvg: string;
  marketDeficit: string;
  actionableFix: string;
}

export interface UniqueBusinessPower {
  id: string;
  businessName: string;
  conceptTag: string;
  advantageTwist30Pct: {
    headline: string;
    details: string;
    psychologicalHook: string;
    conversionAdvantage: string;
  };
  gmbDescription750: {
    text: string;
    charCount: number; // Must be ~750 (within 730 - 750)
    keywordDensity: string[];
    callToAction: string;
  };
  services10: Array<{
    name: string;
    priceGuide: string;
    benefit: string;
    gmbServiceCategory: string;
  }>;
  posts5: Array<{
    type: 'Exclusive Offer' | 'Case Study & Win' | 'Service Spotlight' | 'Local Tip / FAQ' | 'Social Proof & Trust';
    title: string;
    body: string;
    ctaButton: 'BOOK' | 'CALL_NOW' | 'LEARN_MORE' | 'GET_OFFER';
    callToActionUrlOrPhone: string;
  }>;
  photoPrompts3: Array<{
    angleTitle: string;
    prompt: string;
    lightingAndStaging: string;
    geoTagExifSimulation: string;
    gmbTabCategory: 'Exterior' | 'Interior' | 'At Work' | 'Team';
  }>;
}

export interface EmpireScanResult {
  location: string;
  category: string;
  scanTimestamp: string;
  overallOpportunityScore: number;
  
  // 18 Engines Execution Status
  enginesExecuted: {
    id: number;
    name: string;
    column: 'COL1' | 'COL2' | 'COL3';
    status: 'completed' | 'running' | 'idle';
  }[];

  // COL 1: SCANNER
  scanner: {
    unclaimedListings: UnclaimedListing[];
    sabListings: SABListing[];
    top3MapPack: TopCompetitor[];
    geoGridRadius: string;
    averageProximityDropoff: string;
    totalCompetitorsFound: number;
  };

  // COL 2: GAP DETECTOR
  gapDetector: {
    top10Keywords: KeywordItem[];
    categoryGaps: CategoryGap[];
    reviewGaps: ReviewGapMetric[];
    missingSchemaEntities: string[];
    citationAuthorityDeficit: string;
    localBacklinkGapSummary: string;
  };

  // COL 3: POWER MAKER
  powerMaker: {
    businesses: UniqueBusinessPower[];
    dominanceRoadmap: {
      day1To7: string;
      day8To14: string;
      day15To30: string;
    };
  };
}

export interface AssistantLanguageGreeting {
  code: string;
  langName: string;
  greetingText: string;
  speechText: string;
  flag: string;
  voiceLang: string;
}
