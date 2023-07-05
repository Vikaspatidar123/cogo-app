import { useTranslation } from 'react-i18next';

const translationKey = 'common:components_header_tickets_timeline';

function useGetTimeLineText({ ticketType }) {
	const { t } = useTranslation(['common']);

	return {
		reviewer_assigned : t(`${translationKey}_reviewer_assigned`),
		rejected          : t(`${translationKey}_rejected`),
		mark_as_resolved  : t(`${translationKey}_mark_as_resolved`),
		reopened          : t(`${translationKey}_reopened`),
		ticket_updated    : `${t(`${translationKey}_ticket_updated`)} "${ticketType}".`,
	};
}

export default useGetTimeLineText;
