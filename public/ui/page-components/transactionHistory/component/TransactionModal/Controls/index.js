import { Toggle } from '@cogoport/components';
import {
	IcCGreenCircle, IcCRedCircle, IcCYelloCircle, IcMAccountSettings,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const MAPPING = {
	N : <IcCGreenCircle height={12} width={12} />,
	Y : <IcCRedCircle height={12} width={12} />,
	M : <IcCYelloCircle height={12} width={12} />,
};
function Control({ controls }) {
	const { t } = useTranslation(['transactionHistory']);

	const [labeledValue, setLabeledValue] = useState('IMPORT');
	const doc = (controls || []).filter((x) => x.tradeType === labeledValue);
	const [mapDoc, setMapDoc] = useState(doc);

	useEffect(() => {
		if (doc) setMapDoc(doc);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [labeledValue]);

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<div className={styles.name}>
					<IcMAccountSettings width={20} height={20} />
					{t('transactionHistory:result_title_controls')}
				</div>
				<div className={styles.toggle}>
					<Toggle
						name="a1"
						size="sm"
						onLabel="Export"
						offLabel="Import"
						checked={labeledValue === 'IMPORT'}
						onChange={(e) => setLabeledValue(e.target.checked ? 'IMPORT' : 'EXPORT')}
					/>
				</div>
			</div>
			{controls?.length > 0 ? (
				<div className={styles.section2}>
					{(mapDoc || []).map(({ description, status }, index) => (
						<div className={styles.row} key={`${description}_${index + 1}`}>
							<div>{description}</div>
							<div>{MAPPING[status]}</div>
						</div>
					))}
				</div>
			) : (
				<div className={styles.section3}>
					<div className={styles.text_total}>{t('transactionHistory:result_quotation_not_sub')}</div>
				</div>
			)}
		</div>
	);
}
export default Control;
