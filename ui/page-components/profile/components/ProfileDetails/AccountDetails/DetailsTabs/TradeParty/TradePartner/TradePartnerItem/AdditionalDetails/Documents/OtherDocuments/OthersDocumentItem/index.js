import { IcMEdit } from '@cogoport/icons-react';
import { get } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getConfig from '../config';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

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
function OthersDocumentItem(props) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const { data, onClickEditButton, marginBottom } = props;

	const { t } = useTranslation(['profile']);
	const translationKey =		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.otherDocuments.otherDocumentsItem';
	const config = getConfig({ t });

	const columnsData = {
		documentType: () => {
			const documentName = get(data, 'name');
			const identityNumber = get(data, 'data.identity_number');

			return `${documentName} ${
				identityNumber ? `- ${identityNumber}` : ''
			}`.trim();
		},
		// eslint-disable-next-line react/no-unstable-nested-components
		document: () => {
			const documentProof = get(data, 'image_url');

			if (!documentProof) {
				return null;
			}

			return (
				<div
					role="presentation"
					type="button"
					onClick={() => openDocument(documentProof)}
				>
					<div className={styles.button_text}>
						{t(`${translationKey}.buttonText`)}
					</div>
				</div>
			);
		},
	};

	return (
		<div className={styles.container} style={{ marginBottom }}>
			<div className={styles.row_container}>
				{config.list.map((item) => {
					const { key, label } = item;

					return (
						<div className={styles.col_container} key={key}>
							{label && <div className={styles.label_text}>{label}</div>}

							<div
								className={styles.value_text}
								style={{ marginBottom: isMobile && 8 }}
							>
								{columnsData[key]() || '---'}
							</div>
						</div>
					);
				})}

				<div
					className={styles.edit_icon_container}
					role="presentation"
					onClick={onClickEditButton}
				>
					<IcMEdit height={16} width={16} />
				</div>
			</div>
		</div>
	);
}

export default OthersDocumentItem;
