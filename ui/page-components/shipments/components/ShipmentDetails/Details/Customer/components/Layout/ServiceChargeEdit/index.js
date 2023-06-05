import { useEffect, useContext } from 'react';

import { ShipmentDetailContext } from '../../../../../common/Context';
import EditLineItems from '../EditLineItems';

import styles from './styles.module.css';
import useGetServiceCharges from './useGetServiceCharges';

function ServiceChargeEdit(props) {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const { service_name, controls: rawC, onOptionsChange, value } = props || {};
	const { data } = useGetServiceCharges({
		service_name,
		shipment_id: shipment_data?.id,
	});

	const chargeCodes = (data?.list || []).map((item) => item.code);

	const miscCharges = value
		.filter((charge) => !chargeCodes.includes(charge.code))
		.map((charge) => ({
			...charge,
			value : charge.code,
			label : `${charge.code} ${charge.name || ''}`,
			name  : charge.name || '',
		}));

	const options = (data?.list || []).map((item) => ({
		value : item.code,
		label : (
			<div
				style={{
					display        : 'flex',
					justifyContent : 'space-between',
					alignItems     : 'center',
				}}
			>
				<p className={styles.option}>
					{item.code}
					{' '}
					-
					{' '}
					{item.name || ''}
				</p>
				<p className={styles.sac_code}>
					{item?.sac_code}
				</p>
			</div>
		),
		...item,
	}));

	const allOptions = [...options, ...miscCharges];

	const controls = (rawC || []).map((item) => {
		if (item.name === 'code') {
			return {
				...item,
				options: allOptions,
			};
		}
		return item;
	});

	useEffect(() => {
		if (allOptions.length && onOptionsChange) {
			onOptionsChange({ [service_name]: allOptions });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allOptions.length]);

	return (
		<div>
			<EditLineItems
				{...props}
				controls={controls}
				incoTerm={shipment_data?.inco_term}
			/>
		</div>
	);
}

export default ServiceChargeEdit;
