import { request } from '@/packages/request';

const createSearch = (params) => request.get('/get_spot_search', { params });

export default createSearch;
