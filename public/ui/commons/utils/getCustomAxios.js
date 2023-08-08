import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const legacyRequest = Axios.create({
	baseURL: process.env.REST_BASE_API_URL,
});

const useLegacyRequest = makeUseAxios({
	axios          : legacyRequest,
	cache          : false,
	defaultOptions : { ssr: true, manual: true, autoCancel: false },
});

export default useLegacyRequest;
