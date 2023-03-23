// import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/components';
// import { useFormCogo } from '@cogoport/front/hooks';
import React, { useState, useEffect, useMemo } from 'react';

import COMMODITY_TYPE_MAPPING from '../../../utils/CommodityMapping';

import getControls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

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
	general         : 'all',
};

function GoodsDetails({
	serviceType = '',
	cargo_clearance_date = '',
	goodsDetail = {},
	setGoodsDetail = () => {},
	showPopover = false,
	setShowPopover = () => {},
	tomorrow,
	setToggleState,
	toggleState,
	options,
	data = {},
}) {
	if (!showPopover) {
		return null;
	}

	const { international_freight = {}, domestic_transport = {} } =		COMMODITY_TYPE_MAPPING || {};

	const [commoditySubtypeOptions, setCommoditySubTypeOptions] = useState([]);
	const controls = getControls({
		cargo_clearance_date,
		tomorrow,
		OPTIONS,
		commoditySubtypeOptions,
		toggleState,
		setToggleState,
		options,
		goodsDetail,
		serviceType,
	});
	const {
		formState,
		getValues,
		setValue,
		watch,
		handleSubmit,
		control,
	} = useForm();
	const { errors = {} } = formState || {};

	const watchCommodity = watch('commodity_type');
	useEffect(() => {
		if (data.length > 0) {
			if (goodsDetail?.incoterms && data.includes(goodsDetail?.incoterms)) {
				setValue(
					'incoterms',
					goodsDetail?.incoterms,
				);
				return;
			}

			setValue('incoterms', data?.[0]);
			setGoodsDetail((pv) => ({
				...pv,
				incoterms: data?.[0],
			}));
		}
	}, [JSON.stringify(data)]);

	const handleCommoditySubtype = () => {
		const serviceTypeGooods =			serviceType === 'air_domestic'
			? domestic_transport
			: international_freight;
		if (
			['general', 'dangerous', 'temp_controlled', 'other_special'].includes(
				watchCommodity,
			)
		) {
			setCommoditySubTypeOptions(serviceTypeGooods[watchCommodity]);

			if (
				[
					goodsDetail.commodity_type,
					goodsDetail?.values?.commodity_type,
				].includes(watchCommodity)
			) {
				if (goodsDetail?.values?.commodity_subtype) {
					setValue('commodity_subtype', goodsDetail?.values?.commodity_subtype);
				}
			} else {
				setValue('commodity_subtype', MAPPING[watchCommodity]);
			}
		}
	};

	useEffect(() => {
		handleCommoditySubtype();
	}, [watchCommodity, serviceType]);

	const onSubmit = (values) => {
		console.log(values, 'values');
		const goodsCommodity =			values.commodity_type === 'general' ? 'general' : 'special_consideration';

		const getCargoReadyDate = getValues('cargo_date');

		const formValues = {
			cargoDate: getCargoReadyDate,
		};

		const {
			dry_ice_required = false,
			incoterms = '',
			service_name = '',
			...rest
		} = values || {};

		setGoodsDetail({
			...formValues,
			dry_ice_required,
			commodity    : goodsCommodity,
			values       : { ...rest },
			trade_type   : toggleState,
			incoterms    : serviceType === 'air_international' ? incoterms : '',
			service_name : serviceType === 'air_domestic' ? service_name : '',
			payment_type : serviceType === 'air_international' ? 'prepaid' : '',
		});

		setShowPopover(false);
	};

	const showElements = useMemo(() => controls.reduce((pv, cv) => {
		const { name = '' } = cv;
		let showElement = true;

		if (name === 'incoterms' && serviceType !== 'air_international') {
			showElement = false;
		}

		if (name === 'service_name' && serviceType !== 'air_domestic') {
			showElement = false;
		}

		if (name === 'dry_ice_required' && serviceType !== 'air_domestic') {
			showElement = false;
		}

		return { ...pv, [name]: showElement };
	}, {}), [serviceType]);

	if (!showPopover) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				{controls.map((item) => {
					const Element = getField(item.type);
					const show = showElements[item.name];
					return (
						show && (
							<div className={styles.field} key={item.name}>
								<div className={styles.lable}>{item.label}</div>
								<Element {...item} control={control} />
								{errors && (
									<div className={styles.errors}>
										{errors[item?.name]?.message}
									</div>
								)}
							</div>
						)
					);
				})}

			</div>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => {
						setShowPopover(false);
					}}
					style={{ marginRight: 8 }}
				>
					CANCEL
				</Button>
				<Button size="md" onClick={handleSubmit(onSubmit)}>
					CONFIRM
				</Button>
			</div>
		</div>
	);
}

export default GoodsDetails;
