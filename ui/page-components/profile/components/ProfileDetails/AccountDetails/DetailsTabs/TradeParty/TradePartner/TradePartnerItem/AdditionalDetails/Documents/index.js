import { Button } from '@cogoport/components';

import BankDetailsDocument from './BankDetailsDocument';
import useGetDocuments from './hooks/useGetDocuments';
import OtherDocuments from './OtherDocuments';
import styles from './styles.module.css';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {Object} 	[tradePartyData]
 * @property {string} 	[documentType]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 */
function Documents(props) {
	const { documentType, setShowModal } = props;

	const getDocumentProps = useGetDocuments(props);

	const COMPONENTS_DETAILS_MAPPING = {
		bankDetailsDocument: {
			title      : 'Bank Account',
			buttonText : 'Add Bank Account',
			component  : BankDetailsDocument,
		},
		otherDocuments: {
			title      : 'Documents',
			buttonText : 'Add Documents',
			component  : OtherDocuments,
		},
	};

	const {
		title,
		buttonText,
		component: Component,
	} = COMPONENTS_DETAILS_MAPPING[documentType];

	if (!Component) {
		return null;
	}

	return (
		<div className={`${styles.flex_container} ${styles.direction}`}>
			<div className={`${styles.flex_container} ${styles.flex_content}`}>
				<div className={styles.header_text}>{title}</div>

				<Button
					themeType="accent"
					type="button"
					size="sm"
					onClick={() => setShowModal(true)}
				>
					{buttonText}
				</Button>
			</div>

			<Component {...props} {...getDocumentProps} />
		</div>
	);
}

export default Documents;
