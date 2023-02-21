import { IcMEdit } from '@cogoport/icons-react';

import getValue from '../../utils/getValue';
import getConfig from '../config';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function PocItem({ data, onClickEditButton, marginBottom }) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const config = getConfig();

	const renderEditButton = () => (
		<div
			className={styles.edit_icon_container}
			role="presentation"
			onClick={onClickEditButton}
		>
			<IcMEdit height={16} width={16} />
		</div>
	);
	const pocColumns = {
		name         : () => getValue(data, 'name'),
		email        : () => getValue(data, 'email'),
		mobileNumber : () => {
			const mobileCountryCode = getValue(data, 'mobile_country_code', '');
			const mobileNumber = getValue(data, 'mobile_number', '');

			return `${mobileCountryCode} ${mobileNumber}`.trim();
		},
		edit: renderEditButton,
	};

	return (
		<div className={styles.container} style={{ marginBottom }}>
			<div className={styles.row_container}>
				{config.list.map((item) => {
					const { key, label } = item;

					return (
						<div className={styles.col_container} key={key}>
							{label && (
								<div
									className={styles.text_container}
									style={{ color: '#828282', marginBottom: '4px' }}
								>
									{label}
								</div>
							)}

							<div
								className={styles.text_container}
								style={{
									color        : '#000000',
									wordBreak    : 'break-word',
									marginBottom : isMobile && 8,
								}}
							>
								{pocColumns[key]?.() || '---'}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PocItem;
