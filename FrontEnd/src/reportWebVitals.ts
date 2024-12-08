// src/reportWebVitals.ts
import { getCLS, getFID, getLCP, getTTFB, getFCP } from 'web-vitals';

const reportWebVitals = (metric: any) => {
  console.log(metric);  // You can log or send these metrics to an analytics endpoint
};

// These are the functions that will collect performance metrics
getCLS(reportWebVitals);
getFID(reportWebVitals);
getLCP(reportWebVitals);
getTTFB(reportWebVitals);
getFCP(reportWebVitals);
