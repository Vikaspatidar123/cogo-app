const BASE_URL = process.env.NEXT_PUBLIC_USER_LOCATION_API_URL;
// const API_KEY = process.env.NEXT_PUBLIC_IP_DATA_API_KEY;

export const getLocationData = async () => {
	const url = BASE_URL;

	// if (API_KEY) {
	// 	url = `${BASE_URL}?api-key=${API_KEY}`;
	// }

	const response = await fetch(url);

	const data = await response.json();

	return {
		mobile_country_code: data?.country_calling_code,
	};
};
