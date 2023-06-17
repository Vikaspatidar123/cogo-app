import { useRouter } from '@/packages/next';

const useRedirectFn = () => {
	const { push } = useRouter();
	const redirectArchivedList = (activeTab) => {
		push(
			'/saas/tools/air-ocean-tracking/list/archive/[trackingType]?isArchived=true',
			`/saas/tools/air-ocean-tracking/list/archive/${activeTab}?isArchived=true`,
		);
	};

	const redirectToTracker = ({ type, id }) => {
		push(
			'/saas/tools/air-ocean-tracking/list/[trackingType]/[trackingId]',
			`/saas/tools/air-ocean-tracking/list/${type}/${id}`,
		);
	};

	const redirectToList = ({ type = 'ocean' }) => {
		push(
			`/saas/tools/air-ocean-tracking/list?trackingType=${type}`,
			`/saas/tools/air-ocean-tracking/list?trackingType=${type}`,
		);
	};

	const redirectToDashboard = () => {
		push(
			'saas/tools/air-ocean-tracking',
			'saas/tools/air-ocean-tracking',
		);
	};

	return {
		redirectArchivedList,
		redirectToTracker,
		redirectToList,
		redirectToDashboard,
	};
};

export default useRedirectFn;
