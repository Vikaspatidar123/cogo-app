import { request } from '@/packages/request';

const getRecommendedSearches = () => request.get('/get_recommended_spot_searches', {});

export default getRecommendedSearches;
