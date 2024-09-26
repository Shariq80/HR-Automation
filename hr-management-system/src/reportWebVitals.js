import reportWebVitals from './reportWebVitals'; // Import the web vitals reporting file

const reportPerformance = (onPerfEntry) => { // Renamed function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportPerformance; // Renamed export