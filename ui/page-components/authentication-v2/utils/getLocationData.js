const BASE_URL = process.env.NEXT_PUBLIC_USER_LOCATION_API_URL;

export const getlocationData = async () => {
	const response = await fetch(BASE_URL);

	const data = await response.json();

	return {
		mobile_country_code: data?.country_calling_code,
	};
};
