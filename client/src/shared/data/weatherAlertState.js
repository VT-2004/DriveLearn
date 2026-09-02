// Operational Weather & Road Waterlogging Alert State
// Real-world Pune/Mumbai monsoon delay management across Karve Rd, Warje track, and Deccan

export const INITIAL_WEATHER_ALERT = {
  isActive: true,
  severity: 'WARNING', // 'NORMAL' | 'WARNING' | 'CRITICAL'
  title: 'Monsoon Track Alert: Karve Road Waterlogging & Heavy Rain',
  message: 'Warje RTO 8-track ground and Karve Road stretches are experiencing temporary waterlogging. Today\'s 04:00 PM practical batches are granted an automatic +45 min delay or free 1-click rescheduling with zero attendance penalty.',
  delayMinutes: 45,
  rescheduleAllowed: true,
  alternativeGround: 'Deccan Indoor Simulator Track',
  issuedBy: 'Sai Motor Academy Dispatch & Pune Traffic Advisory',
  issuedAt: 'Today, 22 Aug 2026 (03:15 PM)',
};
