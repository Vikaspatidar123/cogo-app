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

	const redirectToList = () => {
		push(
			'/saas/tools/air-ocean-tracking/list',
			'/saas/tools/air-ocean-tracking/list',
		);
	};

	return {
		redirectArchivedList,
		redirectToTracker,
		redirectToList,
	};
};

export default useRedirectFn;
