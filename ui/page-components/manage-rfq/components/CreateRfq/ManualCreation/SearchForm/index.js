import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import options from '../../../../configurations/segmented-options';

import FormLayout from './FormLayout';
import styles from './styles.module.css';

function SearchForm(props) {
	const {
		draftFormData,
		setDestinationDetails = () => {},
		setOriginDetails = () => {},
		formProps,
		fieldProps,
		controls,
		destinationDetails,
		originDetails,
		serviceItem,
		setDraftFormData = () => {},
		setShowForm = () => {},
		setServices = () => {},
		idx,
		services,
	} = props;

	const [serviceType, setServiceType] = useState(serviceItem);
	const { reset = () => {} } = formProps[serviceType] || {};

	const handleChangeTab = (val) => {
		if ((draftFormData?.formData?.[serviceType]?.data || []).length === 0) {
			setServiceType(val);
			setDraftFormData({
				...draftFormData,
				serviceType: [...Object.keys(draftFormData?.formData || []), val],
			});
			setShowForm(val);
			reset();
			setOriginDetails({
				...originDetails,
				[val]: undefined,
			});
			setDestinationDetails({
				...destinationDetails,
				[val]: undefined,
			});
			setServices({ ...services, [val]: undefined });
		}
	};

	const newOptions = (idxindex) => {
		const newControlOptions = [...options];
		if (idxindex === 1) {
			return newControlOptions.filter(
				(itm) => itm.value !== draftFormData.serviceType[0],
			);
		}
		if (idxindex === 2) {
			return newControlOptions.filter((itm) => itm.value === serviceType);
		}
		return newControlOptions;
	};

	return (
		<div className={styles.container}>
			<div className={styles.segmented_container}>
				<Tabs
					activeTab={serviceType}
					themeType="tertiary"
					onChange={(val) => {
						handleChangeTab(val);
					}}
				>
					{(newOptions(idx) || []).map((option) => (
						<TabPanel name={option.value} title={option.label} icon={option.icon} />
					))}
				</Tabs>
			</div>
			<FormLayout
				{...props}
				{...formProps[serviceType]}
				fields={fieldProps[serviceType]}
				serviceType={serviceType}
				controls={controls(serviceType)}
			/>
		</div>
	);
}

export default SearchForm;
