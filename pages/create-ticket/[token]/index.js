import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CreateTicket from '@/ui/page-components/create-ticket';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'createTicketPublic'])),

		},
	};
}

export default CreateTicket;
