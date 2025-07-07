export const geocodeCity = async (city) => {
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  const res = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`
  );

  const data = await res.json();

  if (data.results && data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    return { lat, lng };
  } else {
    throw new Error("Location not found");
  }
};
