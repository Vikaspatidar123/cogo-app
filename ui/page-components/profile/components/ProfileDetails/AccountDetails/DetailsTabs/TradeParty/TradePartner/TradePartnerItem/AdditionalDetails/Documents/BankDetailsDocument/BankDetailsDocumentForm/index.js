import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import SearchResultsServiceItemFormElement from '../../../../../../../../../../../commons/FormElement';

import styles from './styles.module.css';
import useBankDetailsDocumentForm from './useBankDetailsDocumentForm';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {string} 	[documentType]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[data]
 * @property {function}	[onCloseModal]
 */
function BankDetailsDocumentForm(props) {
	const {
		loading, controls, formProps, errors, onSubmit,
	} =		useBankDetailsDocumentForm(props);
	const { control, handleSubmit } = formProps;

	const { t } = useTranslation(['profile']);

	const translationKey =		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.bankDetailsDocument.bankDetailsDocumentForm.';

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.title}>{t(`${translationKey}title`)}</div>

				<SearchResultsServiceItemFormElement
					controls={controls}
					control={control}
					errors={errors}
				/>

				<div className={styles.btn_align}>
					<Button type="submit" loading={loading}>
						{t(`${translationKey}buttons.submit`)}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default BankDetailsDocumentForm;
