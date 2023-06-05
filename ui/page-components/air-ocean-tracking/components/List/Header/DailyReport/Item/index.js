import { Toast } from '@cogoport/components';
import { useState } from 'react';

import dailyStatusConfig from '../../../../../configuration/dailyStatusConfig';
import itemFunction from '../../../../../utils/itemFunction';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';
import useUpdateDsrStatus from '@/ui/page-components/air-ocean-tracking/hooks/useUpdateDsrStatus';

const Item = ({ data = {} }) => {
	const [status, setStatus] = useState(data.status === 'active');
	const { id = '', schedule = '', shipments = 0 } = data || {};

	const { loading, updateDsrStatus } = useUpdateDsrStatus();

	const statusChangeHandler = async (val) => {
		if (schedule || shipments) {
			const currStatus = val.target.checked;
			const resp = await updateDsrStatus({ id, status: currStatus });
			if (resp) setStatus(val.target.checked);
		} else {
			Toast.error('Enter atleast one shipment and schedule to enable receiving status report for this user');
		}
	};
	const newFunction = itemFunction({ status, statusChangeHandler, loading });

	return (
		dailyStatusConfig.map((config) => (
			<div key={config.key} className={styles.col} style={{ width: config.width }}>
				{getValue(data, config, newFunction)}
			</div>
		))
	);
};

export default Item;
