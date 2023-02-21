import { IcMDelete } from '@cogoport/icons-react';
import { get, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getConfig from '../config';

import styles from './styles.module.css';

const openDocument = (url = '') => {
	let modifiedUrl = `https://${url}`;
	if (url.includes('http://') || url.includes('https://')) {
		modifiedUrl = url;
	}

	window.open(modifiedUrl, '_blank');
};

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[data]
 * @property {function} [onClickEditButton]
 * @property {string} 	[marginBottom]
 */
function BankDetailsDocumentItem(props) {
	const { data, onClickEditButton, marginBottom } = props;

	const { t } = useTranslation(['profile']);
	const translationKey =		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.bankDetailsDocument.bankDetailsDocumentItem.';

	const config = getConfig();
	const columnsData = {
		accountHolderName : () => get(data, 'data.account_holder_name'),
		bankAccountNumber : () => get(data, 'data.bank_account_number'),
		bankName          : () => get(data, 'data.bank_name'),
		branchName        : () => get(data, 'data.branch_name'),
		ifsc              : () => get(data, 'data.ifsc_number'),

		// eslint-disable-next-line react/no-unstable-nested-components
		documentProof: () => {
			const documentProof = get(data, 'image_url');

			if (!documentProof) {
				return '';
			}

			return (
				<div
					className={styles.view_document}
					role="presentation"
					type="button"
					onClick={() => openDocument(documentProof)}
				>
					{t(`${translationKey}buttons.view`)}
				</div>
			);
		},
		status: () => startCase(get(data, 'status')),
	};

	return (
		<div className={styles.container} style={{ marginBottom }}>
			<div className={styles.row_container}>
				<div
					className={`${styles.verification_status} ${
						styles[data.verification_status]
					}`}
				>
					{startCase(data.verification_status)}
				</div>

				{config.list.map((item) => {
					const { key, label } = item;

					return (
						<div className={styles.col_container}>
							{label && <div className={styles.label_container}>{label}</div>}

							<div className={styles.value_container}>
								{columnsData[key]() || '---'}
							</div>
						</div>
					);
				})}

				{data.status === 'active' ? (
					<div
						className={styles.edit_icon_container}
						role="presentation"
						onClick={onClickEditButton}
					>
						<IcMDelete />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default BankDetailsDocumentItem;
