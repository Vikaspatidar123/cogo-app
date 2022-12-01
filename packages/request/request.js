import Axios from 'axios';

export const request = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});
