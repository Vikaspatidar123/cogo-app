import { useSelector } from '@/packages/store';

const useDownloadTradeParty = () => {
	const { organization = '', profile = '' } = useSelector(({ s }) => s);

	const downloadTradePartner = async (isArchive) => {
		// eslint-disable-next-line no-undef
		window.open(
			`${process.env.BUSINESS_FINANCE_BASE_URL}
			/saas/organization/export?organizationId=${organization?.id}
			&userId=${profile?.id}&isArchived=${isArchive}`,
			'_blank',
		);
	};

	return { downloadTradePartner };
};

export default useDownloadTradeParty;
