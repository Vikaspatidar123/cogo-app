// import getField from '@cogo/business-modules/form/components';
// import { useRequest } from '@cogo/commons/hooks';
// import { useSelector } from '@cogo/store';
// import { useFormCogo } from '@cogoport/front/hooks';
// import { startCase } from '@cogoport/front/utils';
import { startCase } from '@cogoport/utils';
import { useEffect, useContext } from 'react';

import getControls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRequest } from '@/packages/request';
import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';

const Select = getField('select');
const Input = getField('text');

function Filters({ hookSetters, shipmentFilters, isShow = true, page = 1 }) {
	// const { scope } = useSelector(({ general }) => ({ scope: general.scope }));

	const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_organizations',
		method : 'get',
	}, { manual: true });

	// const { trigger, data } = useRequest(
	// 	'get',
	// 	false,
	// 	scope,
	// )('/list_shipment_organizations');

	const getShipmentOrganization = async () => {
		await trigger({ params: { shipment_id: shipment_data?.id } });
	};

	useEffect(() => {
		if (isShow) {
			getShipmentOrganization();
		}
	}, []);

	const organizationOptions = data?.list?.map((obj) => ({
		label : `${obj?.business_name}`,
		value : `${obj?.id}`,
	}));

	const ServiceOptions = shipment_data?.services?.map((service) => ({ label: startCase(service), value: service }));

	const controls = getControls(organizationOptions, ServiceOptions);

	const { control, watch } = useForm();
	const formValues = watch();

	useEffect(() => {
		hookSetters.setFilters({
			...shipmentFilters,
			...formValues,
			page,
		});
	}, [JSON.stringify(formValues)]);

	return (
		<div className={styles.container}>
			<div className={styles.flex_div}>
				{isShow ? <Select {...controls[1]} control={control} /> : null}

				<Select {...controls[2]} control={control} />
			</div>

			<Input {...controls[0]} control={control} />
		</div>
	);
}

export default Filters;
