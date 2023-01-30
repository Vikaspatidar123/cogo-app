import apis from '@/packages/navigation-configs/apis';

const getMicroServiceName = () => {
	let allApis = {};
	Object.keys(apis).forEach((featureKey) => {
		const newHash = {};
		(apis[featureKey] || []).forEach((api) => {
			newHash[api.api] = api.service_name || undefined;
		});
		allApis = { ...allApis, ...newHash };
	});
	return allApis;
};

export default getMicroServiceName;
