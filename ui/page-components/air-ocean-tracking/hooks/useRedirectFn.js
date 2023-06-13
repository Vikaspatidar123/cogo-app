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

	return {
		redirectArchivedList,
		redirectToTracker,
	};
};

export default useRedirectFn;
