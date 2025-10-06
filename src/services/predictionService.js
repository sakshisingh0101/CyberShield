import axios from 'axios';

/**
 * Placeholder function to fetch predictions from backend
 * @param {Object} filters - Filter parameters
 * @param {string} filters.startDate - Start date
 * @param {string} filters.endDate - End date
 * @param {string} filters.region - Selected region
 * @param {number} filters.riskThreshold - Risk threshold value
 * @returns {Promise} API response with hotspots, atms, and alerts
 */
export const fetchPredictions = async (filters) => {
  try {
    const response = await axios.post('/api/v1/cybercrime/hotspotPrediction', filters, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("response in service page: ",response,"   ", "response.data: ",response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
};
