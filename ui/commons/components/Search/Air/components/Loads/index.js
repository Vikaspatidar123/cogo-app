import { Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, {
	useState,
	forwardRef,
	useCallback,
	useImperativeHandle,
} from 'react';

import DisplayLoadValues from './DisplayLoadValues';
import LoadsDetails from './LoadsDetails';
import styles from './styles.module.css';

function Loads(props, ref) {
	const { formError = {}, serviceDetails = {}, airFreightData = {} } = props;

	const [showPopover, setShowPopover] = useState(false);

	const airFreightArr = Object.values(serviceDetails || {}).filter((element) => ['air_freight'].includes(element.service_type));

	const {
		packages_count,
		volume,
		weight,
		load_selection_type,
		commodity_details = [],
	} = airFreightData || {};

	const { packing_list = '' } = commodity_details?.[0] || {};

	const packageDetails = [];
	(airFreightArr?.[0]?.packages || [{}]).forEach((element) => {
		const obj = {
			handling_type : element?.handling_type || 'stackable',
			length        : element?.length || 1,
			width         : element?.width || 1,
			height        : element?.height || 1,
			packing_type  : element?.packing_type || 'box',
			quantity      : element?.packages_count || 1,
			weight        : element?.package_weight || 1,
			units         : 'cm',
		};

		packageDetails.push(obj);
	});

	const [showFilledValues, setShowFilledValues] = useState(
		load_selection_type === 'cargo_per_package'
			? {
				perPackagedata: {
					packages: packageDetails,
				},
			}
			: {
				gross: {
					total_quantity : packages_count || 1,
					total_weight   : weight || 1,
					gross_volume   : volume || 1,
					stackability   : packageDetails?.[0]?.handling_type || 'stackable',
					package_type   : packageDetails?.[0]?.packing_type || 'box',
					packing_list,
				},
			},
	);

	const handlePopoverBtn = () => {
		setShowPopover(!showPopover);
	};

	const imperativeHandle = useCallback(() => {
		const isError = isEmpty(showFilledValues);

		return {
			handleSubmit: () => ({
				hasError: isError,
				...(!isError && { values: { ...showFilledValues } }),
				...(isError && { errors: { errorMessage: 'Load is required' } }),
			}),
		};
	}, [showFilledValues]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>LOAD</div>

			<Popover
				placement="bottom"
				className={styles.popover}
				render={(
					<LoadsDetails
						showPopover={showPopover}
						setShowPopover={setShowPopover}
						showFilledValues={showFilledValues}
						setShowFilledValues={setShowFilledValues}
					/>
				)}
				interactive
        // animation="shift-away"
				visible={showPopover}
				onClickOutside={() => setShowPopover(true)}
			>
				<div
					className={styles.load_container}
					role="presentation"
          // showPopover={showPopover}
					onClick={handlePopoverBtn}
				>
					{isEmpty(showFilledValues) ? (
						<div className="text">What are you shipping</div>
					) : (
						<div>
							<DisplayLoadValues showFilledValues={showFilledValues} />
						</div>
					)}
				</div>
			</Popover>
			{formError?.load ? (
				<div className={styles.error_message_container}>Load is required</div>
			) : null}
		</div>
	);
}

export default forwardRef(Loads);
