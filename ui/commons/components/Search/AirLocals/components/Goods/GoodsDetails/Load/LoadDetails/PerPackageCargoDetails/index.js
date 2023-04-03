import { Button, Modal } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import getControls from './controls';
import OverWeightModal from './OverWeightModal';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

function PerPackageCargoDetails({
	setShowPopover = () => {},
	showFilledValues = () => {},
	setShowFilledValues = () => {},
	getCargoReadyDate,
	getCommodity,
	getCommoditySubtype,
}) {
	const [showOWModal, setShowOWModal] = useState(false);

	const [overWeightDoc, setOverWeightDoc] = useState({});

	const controls = getControls({ showFilledValues });
	const { handleSubmit, formState, watch, control } = useForm();
	const { errors } = formState;

	const [totalVal, setTotalVal] = useState({});

	const watchDimensions = watch('dimensions');

	const perpkgcalculation = (data) => {
		const { dimensions = [] } = data || {};

		for (let i = 0; i < dimensions.length; i += 1) {
			const { quantity } = dimensions[i];
			let quantity1 = quantity;

			for (let j = i + 1; j < data?.dimensions.length; j += 1) {
				const { quantity: quantity2 } = dimensions[j];

				if (
					dimensions[i].package_type === dimensions[j].package_type
					&& dimensions[i].total_weight === dimensions[j].total_weight
					&& dimensions[i].length === dimensions[j].length
					&& dimensions[i].width === dimensions[j].width
					&& dimensions[i].height === dimensions[j].height
					&& dimensions[i].handling === dimensions[j].handling
				) {
					quantity1 = Number(quantity1) + Number(quantity2);
					data?.dimensions.splice(j, 1);
					dimensions[i].quantity = quantity1;
				}
			}
		}
	};

	useEffect(() => {
		let totalVolume = 0;
		watchDimensions?.forEach((item) => {
			totalVolume
				+= (Number(item.length || 0)
					* Number(item.width || 0)
					* Number(item.height || 0)
					* Number(item.quantity || 0))
				/ 1000000;
		});

		totalVolume = Math.round(totalVolume * 1000000) / 1000000;

		let totalWt = 0;
		watchDimensions?.forEach((item) => {
			totalWt += Number(item.total_weight || 0) * Number(item.quantity || 0);
		});

		setTotalVal({ totalWt, totalVol: totalVolume });
	}, [JSON.stringify(watchDimensions)]);

	const onSubmit = (data, e) => {
		e.preventDefault();

		if (!getCommoditySubtype) {
			return;
		}

		perpkgcalculation(data);

		Object.assign(data, { certificates: overWeightDoc.certificates || '' });

		setShowFilledValues({
			perPackagedata   : data,
			showLabel        : false,
			commodityType    : getCommodity,
			commoditySubType : getCommoditySubtype,
			cargoDate        : getCargoReadyDate,
		});

		let totalWeight = 0;
		data.dimensions.forEach((item) => {
			totalWeight += item.quantity * item.total_weight;
		});

		if (totalWeight >= 500 && !overWeightDoc.certificates) {
			setShowOWModal(true);
		} else {
			setShowPopover(false);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<FormElement control={control} controls={controls} showButtons errors={errors} />

				<div className={styles.button_container}>
					<div className={styles.display_live_cal}>
						<div className="totals">
							Total Volume:
							{totalVal.totalVol}
							{' '}
							cbm
						</div>
						<div className="totals">
							Total Weight:
							{totalVal.totalWt}
							{' '}
							kgs
						</div>
					</div>

					<div>
						<Button onClick={() => setShowPopover(false)}>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit(onSubmit)}
							className="primary sm"
							style={{ background: '#393F70', marginLeft: '8px' }}
						>
							Confirm
						</Button>
					</div>
				</div>
			</div>
			<Modal
				show={showOWModal}
				onClose={() => setShowOWModal(false)}
				className="primary sm"
				style={{ zIndex: 99999 }}
				// position="top-right"
			>
				<OverWeightModal
					setShowOWModal={setShowOWModal}
					setOverWeightDoc={setOverWeightDoc}
				/>
			</Modal>
		</>
	);
}

export default PerPackageCargoDetails;
