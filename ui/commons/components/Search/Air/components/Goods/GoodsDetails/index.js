/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import React, { useState, useEffect, useMemo } from 'react';

import COMMODITY_TYPE_MAPPING from '../../../utils/CommodityMapping';

import getControls from './controls';
import IncotermController from './IncotermController';
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
	loading = false,
}) {
	const { international_freight = {}, domestic_transport = {} } =	COMMODITY_TYPE_MAPPING || {};

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
	} = useForm({
		defaultValues: {
			cargo_date        : cargo_clearance_date || tomorrow,
			incoterms         : goodsDetail?.incoterms,
			service_name      : goodsDetail.service_name,
			commodity_type    : goodsDetail?.commodity_type || goodsDetail?.values?.commodity_type,
			commodity_subtype : goodsDetail?.values?.commodity_subtype
			|| (serviceType === 'air_international' ? 'all' : 'others'),
			dry_ice_required: goodsDetail?.dry_ice_required,
		},
	});

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

	const getOption = (serviceTypeGooods) => {
		if (watchCommodity === 'general' || watchCommodity === 'other_special') {
			return serviceTypeGooods[watchCommodity];
		}
		const optArr = serviceTypeGooods[watchCommodity];

		const option = optArr.map((opt) => (
			[...opt.options]
		));

		return option.flat();
	};

	const handleCommoditySubtype = () => {
		const serviceTypeGooods = serviceType === 'air_domestic' ? domestic_transport : international_freight;
		if (
			['general', 'dangerous', 'temp_controlled', 'other_special'].includes(
				watchCommodity,
			)
		) {
			const option = getOption(serviceTypeGooods);
			setCommoditySubTypeOptions(option);

			if (
				[
					goodsDetail.commodity_type,
					goodsDetail?.values?.commodity_type,
				].includes(watchCommodity)
			) {
				if (goodsDetail?.values?.commodity_subtype) {
					setValue('commodity_subtype', goodsDetail?.values?.commodity_subtype || '');
				}
			} else {
				setValue('commodity_subtype', MAPPING[watchCommodity] || '');
			}
		}
	};

	useEffect(() => {
		handleCommoditySubtype();
	}, [watchCommodity, serviceType]);

	const onSubmit = (values) => {
		const goodsCommodity = values.commodity_type === 'general' ? 'general' : 'special_consideration';
		const {
			dry_ice_required = false,
			incoterms = '',
			service_name = '',
			cargo_date = '',
			...rest
		} = values || {};

		setGoodsDetail({
			cargoDate    : cargo_date,
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
					if (item?.name === 'incoterms') {
						return (
							<div className={styles.field} key={item.name}>
								<IncotermController
									item={item}
									toggleState={toggleState}
									setToggleState={setToggleState}
									options={options}
									setValue={setValue}
									getValues={getValues}
									loading={loading}
								/>
							</div>
						);
					}
					const Element = getField(item.type);
					const show = showElements[item.name];
					return (
						show && (
							<div className={styles.field} key={item.name}>
								<div className={styles.lable}>{item.label}</div>
								<Element {...item} control={control} />
								{errors[item?.name] && (
									<div className={styles.errors}>
										{errors[item?.name]?.type}
										*
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
				<Button size="md" themeType="accent" onClick={handleSubmit(onSubmit)}>
					CONFIRM
				</Button>
			</div>
		</div>
	);
}

export default GoodsDetails;
