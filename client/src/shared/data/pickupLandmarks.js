// Verified RTO Transit Landmark Pickup Points across Pune Hub
// Eliminates student/instructor phone tag at crowded junctions

export const VERIFIED_PICKUP_LANDMARKS = [
  {
    id: 'LND-01',
    name: 'Garware College Metro Gate 2',
    area: 'Karve Road / Deccan',
    metroPillar: 'Pillar No. 42 (Under Metro Station Staircase)',
    landmarkDirections: 'Wait near the Garware Metro entrance on Karve Road. Safe stopping bay with dual-control vehicle pull-over curb.',
    landmarkCode: 'PUN-KARVE-M42',
    isPrimaryHub: true,
  },
  {
    id: 'LND-02',
    name: 'Warje RTO 8-Track Ground Gate 1',
    area: 'Warje Malwadi',
    metroPillar: 'Warje Flyover Underpass (Near Highway Service Rd)',
    landmarkDirections: 'Directly opposite the Maharashtra RTO testing ground entrance. Designated 8-track & Figure-S practice area.',
    landmarkCode: 'PUN-WARJE-TRK1',
    isPrimaryHub: true,
  },
  {
    id: 'LND-03',
    name: 'Nal Stop Flyover Underpass',
    area: 'Erandwane / Kothrud',
    metroPillar: 'Near McDonald\'s & SNDT College Junction',
    landmarkDirections: 'Convenient meeting point for Law College and SNDT students. Service road pickup zone.',
    landmarkCode: 'PUN-NALSTOP-SNDT',
    isPrimaryHub: false,
  },
  {
    id: 'LND-04',
    name: 'Deccan Gymkhana Bus Terminal',
    area: 'FC Road / Alka Talkies',
    metroPillar: 'Near Sambhaji Park Main Gate',
    landmarkDirections: 'Central city meeting spot. Ideal for peak hour road observation and clutch crawling practice.',
    landmarkCode: 'PUN-DECCAN-FC',
    isPrimaryHub: false,
  }
];
