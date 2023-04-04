import { Button, Input, Checkbox } from '@cogoport/components';
import { IcCCogoCoin } from '@cogoport/icons-react';
import { useEffect, useState, useCallback } from 'react';

import useUpdateCheckoutCogoPoint from '../../../../../hooks/useUpdateCheckoutCogoPoint';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatAmount from '@/ui/commons/utils/formatAmount';

function EditCogoPoints({ cogopoint_data = {}, refetch }) {
	const geo = getGeoConstants();
	const [checked, setChecked] = useState(
		cogopoint_data.redeemed_cogopoints?.cogopoints > 0,
	);
	const [isDisabled, setIsDisabled] = useState(true);
	const [error, setError] = useState(null);

	const [cogopoints, setCogoPoints] = useState(
		cogopoint_data.max_redeemable_cogopoints?.cogopoints || 1,
	);
	const { updateCheckoutCogoPoint } = useUpdateCheckoutCogoPoint({
		max_redeemable_cogopoints:
			cogopoint_data.max_redeemable_cogopoints?.cogopoints,
		setError,
	});

	const applyCogopPoint = async () => {
		setError(false);
		setIsDisabled(true);
		const res = await updateCheckoutCogoPoint(cogopoints);
		if (res) {
			await refetch();
		}
	};

	const useCogopPoint = useCallback(async () => {
		const res = await updateCheckoutCogoPoint(
			cogopoint_data.max_redeemable_cogopoints?.cogopoints,
		);
		if (res) {
			await refetch();
		}
	}, [cogopoint_data.max_redeemable_cogopoints?.cogopoints, refetch, updateCheckoutCogoPoint]);

	const removeCogopPoint = useCallback(async () => {
		const res = await updateCheckoutCogoPoint(0);
		if (res) {
			await refetch();
		}
	}, [refetch, updateCheckoutCogoPoint]);

	useEffect(() => {
		if (checked) {
			useCogopPoint();
		} else {
			removeCogopPoint();
		}
	}, [checked, removeCogopPoint, useCogopPoint]);

	const usePoints = async (flag) => {
		setChecked(flag);

		if (flag === false) {
			const res = await updateCheckoutCogoPoint(0);

			if (res) {
				refetch();
			}
		}
	};

	if (!cogopoint_data.max_redeemable_cogopoints?.cogopoints) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.balance_container}>

				<div className={styles.flex}>
					<div className={styles.balance}>
						<div className={`${styles.Wrapper} ${checked ? 'active' : 'inactive'}`}>
							<IcCCogoCoin height={18} width={18} />
						</div>
						Redeemable CogoPoints
					</div>

					<div className={styles.Points}>
						{cogopoint_data.max_redeemable_cogopoints?.cogopoints?.toLocaleString()}
					</div>
				</div>
				<div className={styles.use_cogo_points}>
					<Checkbox checked={checked} onChange={usePoints} />
					<div className={styles.text}>Use CogoPoints</div>
					{checked && (
						<div className={styles.apply_container}>
							<div className={styles.input_container}>
								<Input
									placeholder="No of cogoPoints"
									value={cogopoints}
									onChange={(e) => setCogoPoints(e)}
									type="number"
									disabled={isDisabled}
								/>
								<div className={styles.conversion}>
									i.e.
									{' '}
									{formatAmount({
										amount:
											cogopoints
											* cogopoint_data.max_redeemable_cogopoints
												.cogopoints_unit_rate,
										currency : geo.country.currency.code,
										options  : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 0,
										},
									})}
								</div>
							</div>
							{isDisabled ? (
								<Button onClick={() => setIsDisabled((prev) => !prev)}>
									Edit
								</Button>
							) : (
								<Button onClick={applyCogopPoint}>Apply</Button>
							)}
						</div>
					)}
				</div>
				<div className={styles.error}>{error}</div>
			</div>
		</div>
	);
}

export default EditCogoPoints;
