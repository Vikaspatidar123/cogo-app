import { Popover } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useEditColsPopOver from '../../../../../hooks/useEditColsPopOver';

import RenderPopOver from './RenderPopOver';
import styles from './styles.module.css';

function Title(props) {
	const {
		serviceName = '', options = [], checkPoint = '', totalPoint = '',
		isEdit = false, fixedPoint = [],
	} = props || {};

	const { t } = useTranslation(['settings']);

	const {
		show = false,
		setShow = () => {},
		insideList = [],
		onSelect = () => {},
		setInsideList,
	} = useEditColsPopOver({
		colsList : options,
		serviceName,
		data     : props,
		fixedPoint,
	});

	const selectedShipmentColumns = (insideList || []).filter(
		(item) => item?.isChecked,
	).length;

	return (
		<div className={styles.container}>
			<div>
				{startCase(serviceName)}
				{' '}
				{t('settings:shipment_text')}
			</div>
			{!isEdit ? (
				<div>
					{checkPoint}
					{' '}
					{t('settings:of_text')}
					{' '}
					{totalPoint}
					{' '}
					{t('settings:data_point_text')}
				</div>
			)
				: (
					<div className={styles.container}>
						<div className={styles.edit}>{t('settings:shipment_alerts_text_12')}</div>
						<Popover
							visible={show}
							placement="bottom-end"
							interactive
							onClickOutside={() => setShow(false)}
							content={(
								<RenderPopOver
									insideList={insideList}
									onSelect={onSelect}
									setShow={setShow}
									setInsideList={setInsideList}
									serviceName={serviceName}
									fixedPoint={fixedPoint}
									{...props}
								/>
							)}
						>
							<div
								role="presentation"
								className={`${styles.select}`}
								onClick={() => setShow(!show)}
							>
								{!selectedShipmentColumns > 0 ? <div>{t('settings:shipment_alerts_text_13')}</div>
									: (
										<div className={styles.selected}>
											{selectedShipmentColumns}
											{' '}
											{t('settings:shipment_alerts_text_14')}
										</div>
									)}
								<IcMArrowRotateDown />
							</div>
						</Popover>
					</div>
				)}
		</div>
	);
}

export default Title;
