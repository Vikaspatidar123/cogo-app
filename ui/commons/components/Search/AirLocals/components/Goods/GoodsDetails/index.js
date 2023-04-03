import React, { useState, useEffect } from 'react';

import COMMODITY_TYPE_MAPPING from '../../../utils/CommodityMappping';

import getControls from './controls';
import Load from './Load';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

const OPTIONS = [
	{ label: 'General Cargo', value: 'general' },
	{ label: 'Dangerous Goods', value: 'dangerous' },
	{ label: 'Temperature Controlled/Pharma', value: 'temp_controlled' },
	{ label: 'Other Special Commodity Type', value: 'other_special' },
];

const MAPPING = {
	dangerous       : 'Class 1.1',
	temp_controlled : 'active-general_pharma',
	other_special   : 'others',
};

function GoodsDetails({
	setShowPopover = () => {},
	tomorrow,
	airFreightLocalsData,
	selectedTradeType = '',
	formError = {},
	showFilledValues,
	setShowFilledValues,
}) {
	const { international_freight = {}, domestic_transport = {} } =		COMMODITY_TYPE_MAPPING || {};

	const [commoditySubtypeOptions, setCommoditySubTypeOptions] = useState([]);

	const controls = getControls({
		OPTIONS,
		commoditySubtypeOptions,
		tomorrow,
		showFilledValues,
	});
	const { formState, watch, setValue, control } = useForm();
	const { errors = {} } = formState || {};

	const watchCommodity = watch('commodity_type');
	const getCargoReadyDate = watch('cargo_date');
	const getCommodity = watch('commodity_type');
	const getCommoditySubtype = watch('commodity_subtype');

	const handleCommoditySubtype = () => {
		const serviceTypeGooods =			selectedTradeType === 'domestic'
			? domestic_transport
			: international_freight;

		if (
			['general', 'dangerous', 'temp_controlled', 'other_special'].includes(
				watchCommodity,
			)
		) {
			setCommoditySubTypeOptions(serviceTypeGooods[watchCommodity]);

			if (showFilledValues.commodityType === watchCommodity) {
				setValue('commodity_subtype', showFilledValues.commoditySubType);
			} else if (watchCommodity !== 'general') {
				setValue('commodity_subtype', MAPPING[watchCommodity]);
			} else if (selectedTradeType === 'domestic') {
				setValue('commodity_subtype', 'others');
			} else {
				setValue('commodity_subtype', 'all');
			}
		}
	};

	useEffect(() => {
		handleCommoditySubtype();
	}, [watchCommodity, selectedTradeType]);

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<FormElement control={control} controls={controls} showButtons errors={errors} />

			</div>

			<div style={{ width: '100%' }}>
				<Load
					airFreightLocalsData={airFreightLocalsData}
					setShowPopover={setShowPopover}
					formError={formError}
					showFilledValues={showFilledValues}
					setShowFilledValues={setShowFilledValues}
					getCargoReadyDate={getCargoReadyDate}
					getCommodity={getCommodity}
					getCommoditySubtype={getCommoditySubtype}
				/>
			</div>
		</div>
	);
}

export default GoodsDetails;
