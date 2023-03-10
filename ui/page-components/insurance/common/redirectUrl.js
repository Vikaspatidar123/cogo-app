import { useRouter } from '@/packages/next';

const redirectUrl = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { push } = useRouter();
	const redirectHome = () => {
		push('/saas/insurance');
	};
	const redirectList = () => {
		push('/saas/insurance/list', '/saas/insurance/list');
	};
	const redirectBuy = (id, transitMode, policyType) => {
		let mode;
		if (transitMode === 'SEA') {
			mode = 'Ocean';
		}
		if (transitMode === 'ROAD') {
			mode = 'Road';
		}
		if (transitMode === 'AIR') {
			mode = 'Air';
		}
		push(`/saas/insurance/${mode}?policyId=${id}&&policyType=${policyType}`);
	};

	return {
		redirectHome,
		redirectList,
		redirectBuy,
	};
};
export default redirectUrl;
