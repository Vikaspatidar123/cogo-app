import { Button, cl } from '@cogoport/components';
import React from 'react';

import getFilterControls from '../../../../configuration/filterControls';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import useFilterContent from '@/ui/page-components/air-ocean-tracking/hooks/useFilterContent';

function FilterContent({ filterData = {}, activeTab, globalFilter = {}, setGlobalFilter }) {
	const { shipping_lines, poc_details = [], booked_with_cogoport = [], air_lines } = filterData || {};

	const { clearHandler, submitHandler, formHook, shippersList = [], consigneesList = [] } = useFilterContent({
		poc_details,
		globalFilter,
		setGlobalFilter,
		activeTab,
	});

	const { control, handleSubmit } = formHook;

	const filterControls = getFilterControls({
		operatorHash: shipping_lines || air_lines,
		shippersList,
		consigneesList,
		booked_with_cogoport,
		activeTab,
	});

	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.header}`}>
				<h3>Filters</h3>
				<div className={styles.flex_box}>
					<Button type="button" themeType="linkUi" onClick={clearHandler}>Clear</Button>
					<Button
						type="button"
						themeType="accent"
						size="sm"
						onClick={handleSubmit(submitHandler)}
					>
						Apply
					</Button>
				</div>
			</div>
			<div className={styles.form_container}>
				{filterControls.map((config) => {
					const { name, label, show, type } = config || {};
					const Element = getField(type);
					if (!show) return <React.Fragment key={name} />;
					return (
						<div key={name} className={styles.filter_section}>
							<p className={styles.title}>{label}</p>
							<Element control={control} {...config} />
						</div>
					);
				})}
			</div>

		</div>
	);
}

export default FilterContent;
