import { Checkbox } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

function RenderPopOver({
	insideList = [],
	onSelect = () => {},
	setShow = () => {},
	setInsideList = () => {},
	serviceName = '',
	setColumns = () => {},
}) {
	const selectedShipmentColumns = (insideList || []).map(
		(item) => item?.isChecked,
	);

	const { t } = useTranslation(['settings']);

	const [checked, setChecked] = useState(false);

	const selectAll = async (value) => {
		const updateValue = insideList.map((x) => ({ ...x, isChecked: value }));

		const check = updateValue.filter((x) => x.isChecked).map((item) => item.value);

		await setChecked(value);

		await setInsideList(updateValue);

		setColumns((prev) => ({ ...prev, [serviceName]: check }));
	};

	useEffect(() => {
		if (selectedShipmentColumns.includes(false)) { setChecked(false); } else {
			setChecked(true);
		}
	}, [selectedShipmentColumns]);

	return (
		<div className={styles.popover}>
			<div
				role="presentation"
				className={styles.flex_row}
				onClick={() => { selectAll(false); setShow(false); }}
			>
				<IcMCross />
				<div className={styles.clear}>
					{t('settings:clear_all_text')}
				</div>
			</div>
			<div className={styles.box}>
				<Checkbox
					checked={checked}
					onChange={(value) => selectAll(value.target.checked)}
				/>
				<div className={styles.text}>
					{t('settings:select_all_text')}
					(
					{insideList?.length}
					)
				</div>
			</div>
			<div className={styles.card}>
				{(insideList || []).map((item, idx) => (
					<div className={styles.box} key={item?.label}>
						<Checkbox
							checked={item?.isChecked}
							onChange={() => onSelect(idx)}
						/>
						<div className={styles.text}>{item?.label}</div>
					</div>
				))}
			</div>

		</div>
	);
}

export default RenderPopOver;
