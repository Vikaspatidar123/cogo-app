// const BASE_URL = process.env.NEXT_PUBLIC_USER_LOCATION_API_URL;
const BASE_URL = 'http://ip-api.com/json/';
const KEY = process.env.NEXT_PUBLIC_USER_LOCATION_API_TOKEN;

const getUserLocationData = async ({ ip }) => {
	let apiUrl = BASE_URL;

	if (process.env.NODE_ENV !== 'development') {
		if (ip) {
			apiUrl += `/${ip}`;
		}

		apiUrl += `?key=${KEY}`;
	}

	let data = {};
	try {
		const response = await fetch(apiUrl);
		data = await response.json();
	} catch (err) {
		console.log(err);
	}
	return data;
};

export default getUserLocationData;
