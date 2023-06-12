import { useRouter } from '@/packages/next';

const useRedirectFn = () => {
	const { push } = useRouter();
	const redirectArchivedList = (activeTab) => {
		push(
			'/saas/tools/air-ocean-tracking/list/archive/[type]?isArchived=true',
			`/saas/tools/air-ocean-tracking/list/archive/${activeTab}?isArchived=true`,
		);
	};

	return {
		redirectArchivedList,
	};
};

export default useRedirectFn;
