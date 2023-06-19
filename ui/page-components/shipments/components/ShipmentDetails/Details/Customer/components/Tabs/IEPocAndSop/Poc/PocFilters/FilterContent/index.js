import { Button } from '@cogoport/components';
import { forwardRef, useImperativeHandle } from 'react';

import Layout from '../../../../../Layout';

import styles from './styles.module.css';

import usePocFilters from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/usePocFilters';

function FilterContent(
	{
		setShowFilters = () => {},
		showFilter,
		filterCPServices,
		isOkam,
		showAll,
		tradePartiesHookSetters,
		tradeParties,
		not_added_final_stakeholders,
	},
	ref,
) {
	const {
		control,
		filter_control,
		onError,
		errors,
		handleFilters,
		handleSubmit,
		filterProps,
		setValue,
	} = usePocFilters({
		setShowFilters,
		showFilter,
		filterCPServices,
		isOkam,
		showAll,
		tradeParties,
		tradePartiesHookSetters,
		not_added_final_stakeholders,
	});

	useImperativeHandle(ref, () => ({
		setValue,
		filterProps,
	}));

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				controls={filter_control}
				errors={errors}
			/>
			<div className={styles.apply_btn}>
				<Button
					onClick={handleSubmit(() => handleFilters(), onError)}
					size="sm"
				>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default forwardRef(FilterContent);
