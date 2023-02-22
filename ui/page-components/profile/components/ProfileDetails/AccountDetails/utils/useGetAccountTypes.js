import { useSelector } from '@/packages/store';

const useGetAccountTypes = () => {
	const { org } = useSelector(({ profile }) => ({
		org: profile.organization,
	}));

	const isBoth = org.account_types;

	return {
		isServiceProvider: isBoth,
		isImporterExporter: isBoth,
		isBoth,
	};
};

export default useGetAccountTypes;
