import { Popover } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';
import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
	useCallback,
} from 'react';

import CLASS_MAPPING from '../../utils/classMapping';

import GoodsDetails from './GoodsDetails';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const showFilledPaymentDetails = ({ goodsLoadsData = {} }) => {
	let displayGoodsType = '';

	if (goodsLoadsData?.commodity === 'general') {
		displayGoodsType = 'General Cargo';
	} else if (goodsLoadsData?.commodity === 'special_consideration') {
		displayGoodsType = 'Special Consideration';
	}

	return (
		<div className={styles.details_container}>
			<div className={styles.details}>
				{formatDate({
					date       : goodsLoadsData?.cargoDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}

			</div>

			<div className={styles.details}>{startCase(displayGoodsType)}</div>
			<div className={styles.details}>
				{startCase(goodsLoadsData?.commodity_sub_type)}
			</div>
		</div>
	);
};

function Goods(props, ref) {
	const {
		airFreightLocalsData = {},
		formError = {},
		airFormRef,
		serviceDetails,
		selectedTradeType = '',
	} = props;

	const airFreightArr = Object.values(serviceDetails || {}).filter((element) => (
		['air_freight_local'].includes(element.service_type)));

	const packages = [];

	airFreightArr.forEach((item) => {
		packages.push(item.packages[0]);
	});

	const packageDetails = [];

	const packagehandle = () => {
		if (packages.length > 0) {
			(packages || []).forEach((element) => {
				const obj = {
					handling     : element?.handling_type || 'stackable',
					length       : element?.length || undefined,
					width        : element?.width || undefined,
					height       : element?.height || undefined,
					package_type : element?.packing_type,
					quantity     : element?.packages_count,
					total_weight : element?.package_weight,
					units        : 'cm',
				};

				packageDetails.push(obj);
			});
		} else {
			packageDetails.push({
				handling     : 'stackable',
				length       : 1,
				width        : 1,
				height       : 1,
				package_type : 'pallet',
				quantity     : 1,
				total_weight : 1,
				units        : 'cm',
			});
		}

		return packageDetails;
	};

	const {
		commodity_details = [],
		commodity,
		cargo_clearance_date,
		trade_type = '',
	} = airFreightLocalsData || {};

	const {
		commodity_type = '',
		commodity_subtype = '',
		commodity_class = {},
		temp_controlled_range = '',
		temp_controlled_type = '',
	} = commodity_details?.[0] || {};

	const commodityPrefill = () => {
		if (commodity === 'general') {
			return commodity;
		}

		return commodity_type;
	};

	const commoditySubTypePrefill = () => {
		if (commodity === 'general') {
			return commodity_type;
		}
		if (
			commodity === 'special_consideration'
      && commodity_type === 'other_special'
		) {
			return commodity_subtype;
		}
		if (
			commodity === 'special_consideration'
      && commodity_type === 'dangerous'
		) {
			let classDescription = '';
			Object.keys(CLASS_MAPPING).forEach((element) => {
				const newElement = CLASS_MAPPING[element];
				if (
					newElement?.class_id === commodity_class?.class_id
          && newElement?.subclass_id === commodity_class?.subclass_id
          && newElement?.subclass_codes?.toString()
            === commodity_class?.subclass_codes?.toString()
				) {
					classDescription = element;
				}
			});

			return classDescription;
		}
		if (
			commodity === 'special_consideration'
      && commodity_type === 'temp_controlled'
		) {
			const tempControlled = `${temp_controlled_type}-${temp_controlled_range}`;
			return tempControlled;
		}

		return null;
	};

	const commodityData = commodityPrefill();
	const subCommodityData = commoditySubTypePrefill();

	const [showFilledValues, setShowFilledValues] = useState({
		perPackagedata: {
			dimensions: packagehandle(),
		},
		showLabel        : false,
		commodityType    : commodityData || 'general',
		commoditySubType : subCommodityData || 'all',
		cargoDate        : cargo_clearance_date,
	});

	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const [showPopover, setShowPopover] = useState(false);

	const goodsCommodity = showFilledValues.commodityType === 'general'
		? 'general'
		: 'special_consideration';

	const {
		cargoDate = '',
		commoditySubType = '',
		commodityType = '',
		showLabel,
		...rest
	} = showFilledValues || {};

	const goodsLoadsData = {
		load               : { ...rest },
		cargoDate,
		commodity_type     : commodityType,
		commodity_sub_type : commoditySubType,
		commodity          : goodsCommodity,
	};

	const imperativeHandle = useCallback(() => {
		const isError = isEmpty(rest) && !commoditySubType && !commodityType;

		return {
			handleSubmit: () => ({
				hasError: isError,
				...(!isError && { values: { ...goodsLoadsData } }),
				...(isError && { errors: {} }),
			}),
		};
	}, [rest, commoditySubType, commodityType]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	useEffect(() => {
		setShowFilledValues((pv) => {
			const commodity_type_data = pv.commodityType;
			let commodity_subtype_data = '';
			if (
				selectedTradeType === 'domestic'
				&& commodity_type_data === 'general'
				&& commodityData === 'general'
				&& trade_type === selectedTradeType
			) {
				commodity_subtype_data = subCommodityData;
			} else if (
				selectedTradeType === 'domestic'
        && commodity_type_data === 'general'
			) {
				commodity_subtype_data = 'others';
			} else if (
				selectedTradeType !== 'domestic'
        && commodity_type_data === 'general'
        && commodityData === 'general'
        && trade_type === selectedTradeType
			) {
				commodity_subtype_data = subCommodityData;
			} else if (
				selectedTradeType !== 'domestic'
        && commodity_type_data === 'general'
			) {
				commodity_subtype_data = 'all';
			} else if (
				commodity_type_data === 'other_special'
        && selectedTradeType === 'domestic'
        && commodityData === 'other_special'
        && trade_type === selectedTradeType
			) {
				commodity_subtype_data = subCommodityData;
			} else if (
				commodity_type_data === 'other_special'
        && selectedTradeType === 'domestic'
			) {
				commodity_subtype_data = 'others';
			} else if (
				selectedTradeType !== 'domestic'
        && commodity_type_data === 'other_special'
        && commodityData === 'other_special'
        && trade_type === selectedTradeType
			) {
				commodity_subtype_data = subCommodityData;
			} else if (
				selectedTradeType !== 'domestic'
        && commodity_type_data === 'other_special'
			) {
				commodity_subtype_data = 'others';
			} else {
				commodity_subtype_data = pv.commoditySubType;
			}

			return {
				...pv,
				commoditySubType: commodity_subtype_data,
			};
		});
	}, [selectedTradeType]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>GOODS</div>

			<Popover
				placement="bottom"
				caret={false}
				render={(showPopover ? (
					<GoodsDetails
						commodity={commodity}
						setShowPopover={setShowPopover}
						tomorrow={tomorrow}
						selectedTradeType={selectedTradeType}
						airFreightLocalsData={airFreightLocalsData}
						airFormRef={airFormRef}
						formError={formError}
						showFilledValues={showFilledValues}
						setShowFilledValues={setShowFilledValues}
					/>
				) : null)}
				interactive
				visible={showPopover}
				onClickOutside={() => setShowPopover(showPopover)}
			>
				<div
					className={styles.payment_terms_container}
					role="presentation"
					onClick={() => setShowPopover(!showPopover)}
				>
					{isEmpty(goodsLoadsData) ? (
						<div className="text">Tell us about your goods</div>
					) : (
						showFilledPaymentDetails({ goodsLoadsData })
					)}
				</div>
			</Popover>
			{formError?.goods && isEmpty(goodsLoadsData) ? (
				<div className={styles.error_message_container}>Goods is required</div>
			) : null}
		</div>
	);
}

export default forwardRef(Goods);
