import { Popover } from '@cogoport/components';
import { startCase, upperCase, isEmpty, format } from '@cogoport/utils';
import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useCallback,
} from 'react';

import CLASS_MAPPING from '../../utils/classMapping';

import GoodsDetails from './GoodsDetails';
import styles from './styles.module.css';
import usePaymentType from './usePaymentsType';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const showFilledPaymentDetails = ({ goodsDetail = {}, toggleState }) => {
	let displayGoodsType = '';

	if (goodsDetail?.commodity === 'general') {
		displayGoodsType = 'General Cargo';
	} else if (goodsDetail?.commodity === 'special_consideration') {
		displayGoodsType = 'Special Consideration';
	}

	return (
		<div className={styles.details_container}>
			<div className={styles.details}>
				{format(goodsDetail?.cargoDate, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
			</div>

			{(displayGoodsType && goodsDetail?.values?.commodity_type === 'dangerous')
			|| goodsDetail?.commodity_type === 'dangerous' ? (
				<div className={styles.details}>
					{startCase(
						goodsDetail?.values?.commodity_type || goodsDetail?.commodity_type,
					)}
				</div>
				) : null}

			{(displayGoodsType && goodsDetail?.values?.commodity_type === 'temp_controlled')
			|| goodsDetail?.commodity_type === 'temp_controlled' ? (
				<div className={styles.details}>
					{startCase(goodsDetail.values?.commodity_type) || startCase(goodsDetail?.commodity_type)}
				</div>
				) : null}

			{(displayGoodsType && goodsDetail?.values?.commodity_type === 'other_special')
			|| goodsDetail?.commodity_type === 'other_special' ? (
				<div className={styles.details}>
					{startCase(
						goodsDetail?.values?.commodity_type || goodsDetail?.commodity_type,
					)}
				</div>
				) : null}

			{displayGoodsType && goodsDetail?.commodity === 'general' ? (
				<div className={styles.details}>
					{startCase(goodsDetail?.commodity)}
				</div>
			) : null}

			{displayGoodsType && goodsDetail?.values?.commodity_subtype ? (
				<div className={styles.details}>
					{startCase(goodsDetail?.values?.commodity_subtype)}
				</div>
			) : null}

			<div className={styles.details}>{upperCase(goodsDetail?.incoterms)}</div>
			<div className={styles.details}>{upperCase(toggleState)}</div>
		</div>
	);
};

function Goods(props, ref) {
	const {
		airFreightData = {},
		serviceType = '',
		formError = {},
		location = {},
		detail = {},
		toggleState = '',
		setToggleState = () => {},
	} = props;
	const {
		cargo_clearance_date,
		commodity = '',
		commodity_details = [],
		dry_ice_required = false,
		logistics_service_type = '',
		inco_term = '',
	} = airFreightData || {};

	const {
		commodity_class = {},
		commodity_type = '',
		commodity_subtype = '',
		temp_controlled_range = '',
		temp_controlled_type = '',
		commodity_description = '',
	} = commodity_details?.[0] || {};

	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

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

	let commodityClassDescription = '';
	Object.keys(CLASS_MAPPING).forEach((element) => {
		const newElement = CLASS_MAPPING[element];
		if (
			newElement?.class_id === commodity_class?.class_id
      && newElement?.subclass_id === commodity_class?.subclass_id
      && newElement?.subclass_codes?.toString()
        === commodity_class?.subclass_codes?.toString()
		) {
			commodityClassDescription = element;
		}
	});

	const [goodsDetail, setGoodsDetail] = useState({
		cargoDate         : cargo_clearance_date || tomorrow,
		commodity         : commodity || 'general',
		commodity_type    : commodityData || 'general',
		cargo_description : commodity_description,
		dry_ice_required,
		service_name      : logistics_service_type || 'normal',
		incoterms         : inco_term,
		values            : {
			commodity_class   : commodityClassDescription,
			commodity_subtype : subCommodityData,
			temp_controlled_range,
			temp_controlled_type,
		},
		trade_type: toggleState,
	});

	const [showPopover, setShowPopover] = useState(false);

	const imperativeHandle = useCallback(() => {
		const { values = {} } = goodsDetail || {};

		const isError = isEmpty(values);

		return {
			handleSubmit: () => ({
				hasError: isError,
				...(!isError && { values: { ...goodsDetail } }),
				...(isError && { errors: {} }),
			}),
		};
	}, [goodsDetail]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	const { options, data, loading } = usePaymentType({
		inco_term,
		toggleState,
		location,
		setGoodsDetail,
	});

	return (
		<div className={styles.container}>
			<div className={styles.title}>GOODS</div>

			<Popover
				// theme="light"
				trigger="mouseenter"
				placement="bottom"
				className={styles.popover_class}
				render={(
					<GoodsDetails
						serviceType={serviceType}
						cargo_clearance_date={cargo_clearance_date}
						goodsDetail={goodsDetail}
						setGoodsDetail={setGoodsDetail}
						showPopover={showPopover}
						setShowPopover={setShowPopover}
						tomorrow={tomorrow}
						toggleState={toggleState}
						setToggleState={setToggleState}
						detail={detail}
						options={options}
						loading={loading}
						data={data}
					/>
				)}
				interactive
				animation="shift-away"
				visible={showPopover}
				onClickOutside={() => setShowPopover(true)}
			>
				<div
					role="presentation"
					className={styles.payment_terms_container}
					// showPopover={showPopover}
					onClick={() => setShowPopover(!showPopover)}
				>
					{!goodsDetail?.commodity ? (
						<div className="text">Tell us about your goods</div>
					) : (
						showFilledPaymentDetails({ goodsDetail, toggleState })
					)}
				</div>
			</Popover>
			{formError?.goods && isEmpty(goodsDetail) ? (
				<div className={styles.error_message_container}>Goods is required</div>
			) : null}
		</div>
	);
}

export default forwardRef(Goods);
