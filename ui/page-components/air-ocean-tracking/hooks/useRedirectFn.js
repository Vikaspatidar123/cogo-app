import { useRouter } from '@/packages/next';

const PUBLIC_PAGE_BLOG = 'https://www.cogoport.com/knowledge-center/news-updates';

const useRedirectFn = () => {
	const { push } = useRouter();
	const redirectArchivedList = (activeTab) => {
		push(
			'/saas/tools/air-ocean-tracking/list/archive/[trackingType]?isArchived=true',
			`/saas/tools/air-ocean-tracking/list/archive/${activeTab}?isArchived=true`,
		);
	};

	const redirectToTracker = ({ type, id, isFirst = false, fromDashBoard = false }) => {
		push(
			`/saas/tools/air-ocean-tracking/list/[trackingType]/
			[trackingId]?isFirstVisit=${isFirst}&fromDashBoard=${fromDashBoard}`,
			`/saas/tools/air-ocean-tracking/list/${type}/${id}?isFirstVisit=${isFirst}&fromDashBoard=${fromDashBoard}`,
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
			'/saas/tools/air-ocean-tracking',
		);
	};

	const redirectToBlogs = () => {
		window.open(PUBLIC_PAGE_BLOG);
	};

	return {
		redirectArchivedList,
		redirectToTracker,
		redirectToList,
		redirectToDashboard,
		redirectToBlogs,
	};
};

export default useRedirectFn;
