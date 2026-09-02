// Operational Weather & Road Waterlogging Alert State
// Managed by Instructors on the ground or School Owners at dispatch

export const DEFAULT_WEATHER_ALERT = {
  isActive: false, // Default is normal dry weather (hidden from learner)
  severity: 'WARNING', // 'WARNING' | 'CRITICAL'
  title: 'Monsoon Track Alert: Karve Road Waterlogging & Heavy Rain',
  message: 'Warje RTO 8-track ground and Karve Road stretches are experiencing temporary waterlogging. Practical batches are granted an automatic +45 min delay or free 1-click rescheduling with zero attendance penalty.',
  delayMinutes: 45,
  affectedArea: 'Warje 8-Track Ground & Karve Road',
  alternativeGround: 'Deccan Indoor Simulator Track',
  issuedBy: 'Sunita Deshmukh (Instructor) & Sai Motor Academy Dispatch',
  issuedAt: 'Today (Live Broadcast)',
};

// Simple singleton state with localStorage persistence
export const getWeatherAlert = () => {
  try {
    const saved = localStorage.getItem('drivelearn_weather_alert');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_WEATHER_ALERT;
};

export const setWeatherAlert = (alertData) => {
  try {
    localStorage.setItem('drivelearn_weather_alert', JSON.stringify(alertData));
    window.dispatchEvent(new Event('drivelearn_weather_change'));
  } catch (e) {
    console.error(e);
  }
};
