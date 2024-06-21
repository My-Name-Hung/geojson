import axios from 'axios';

const API_KEY = '65d9b772ef0bd62df906c16e';

export async function searchFlights(origin, destination, date) {
  try {
    const response = await axios.get(
      `https://api.flightapi.io/roundtrip/${origin}/${destination}/${date}`,
      {
        headers: {
          'Access-Key': API_KEY,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
}