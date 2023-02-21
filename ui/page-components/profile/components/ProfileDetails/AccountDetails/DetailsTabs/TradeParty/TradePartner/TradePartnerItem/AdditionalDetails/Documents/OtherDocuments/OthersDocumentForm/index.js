import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import SearchResultsServiceItemFormElement from '../../../../../../../../../../../commons/FormElement';

import styles from './styles.module.css';
import useOthersDocumentForm from './useOthersDocumentForm';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {string} 	[documentType]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[data]
 * @property {function}	[onCloseModal]
 */
function OthersDocumentForm(props) {
	const {
		loading, controls, formProps, errors, showElements, onSubmit,
	} =		useOthersDocumentForm(props);
	const { control, handleSubmit } = formProps;

	const { t } = useTranslation(['profile']);
	const translationKey =		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.otherDocuments.otherDocumentsForm';

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.title}>{t(`${translationKey}.title`)}</div>

				<SearchResultsServiceItemFormElement
					controls={controls}
					control={control}
					errors={errors}
					showElements={showElements}
				/>

				<div className={styles.btn_align}>
					<Button type="submit" loading={loading}>
						{t(`${translationKey}.buttonText`)}
					</Button>
				</div>
			</form>
		</section>
	);
}

export default OthersDocumentForm;
