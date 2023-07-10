/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popover, Input } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useVerifyHscode from '../../../../../../hooks/useVerifyHsCode';
import iconUrl from '../../../../../../utils/iconUrl.json';
import styles from '../styles.module.css';

const sugestionContent = ({
	inputValue,
	setStatus,
	setValidateInProgress,
	setValue,
	isImport,
	setFormInfo,
	setPrevHs,
}) => {
	const clickHandler = (data = {}) => {
		const { hsCode = '', description = '' } = data || {};

		if (isImport) {
			const obj = { importHsCode: hsCode, productName: description };
			setValue('importHsCode', hsCode);
			setValue('productName', description);
			setFormInfo((prev) => ({
				...prev,
				...obj,
			}));
			setPrevHs((prev) => ({ ...prev, importHs: hsCode }));
		} else {
			const obj = { exportHsCode: hsCode };
			setValue('exportHsCode', hsCode);
			setFormInfo((prev) => ({
				...prev,
				...obj,
			}));
			setPrevHs((prev) => ({ ...prev, exportHs: hsCode }));
		}

		setStatus(true);
		setValidateInProgress(false);
	};

	return (
		<div className={styles.suggestion}>
			{(inputValue || []).map((ele) => (
				<div
					key={ele?.hsCode}
					className="row"
					role="presentation"
					onClick={() => clickHandler(ele)}
				>
					{ele?.hsCode}
					{' '}
					-
					{' '}
					{ele?.description}
				</div>
			))}
		</div>
	);
};

function ValidateRow({
	item = {},
	setValue,
	setFormInfo,
	setIsDisable,
	setPrevHs,
}) {
	const [status, setStatus] = useState(false);
	const [validateInProgress, setValidateInProgress] = useState(false);

	const { hsCode, isImport, prevHs, countryCode } = item || {};
	const { verifyHsCode, checkLoading, inputValue } = useVerifyHscode();

	const validateHSCode = () => {
		verifyHsCode({
			hsCode,
			destinationCountryCode: countryCode,
			setStatus,
			setValidateInProgress,
			setPrevHs,
			isImport,
		});
	};

	useEffect(() => {
		if (status) {
			setIsDisable((prev) => [...prev, status]);
		}
	}, [status]);

	useEffect(() => {
		if (hsCode === prevHs) {
			setStatus(true);
		}
	}, []);

	return (
		<div className={styles.row}>
			<Popover
				animation="shift-away"
				content={sugestionContent({
					inputValue,
					setStatus,
					setValidateInProgress,
					setValue,
					isImport,
					setFormInfo,
					setPrevHs,
				})}
				interactive
				placement="bottom"
				visible={validateInProgress && inputValue.length > 0}
			>
				<div className={styles.inputContainer}>
					<Input
						label="HS Code"
						value={hsCode}
						className={styles.hs_input}
						disabled
					/>
				</div>
			</Popover>
			<div className={styles.btn_container}>
				{!status ? (
					<Button
						size="md"
						onClick={validateHSCode}
						loading={checkLoading}
						disabled={validateInProgress}
						className={styles.btn_color}
					>
						Validate
					</Button>
				) : (
					<div className={styles.valid}>
						<img
							src={iconUrl.validate}
							alt="validated"
							className={styles.validate_svg}
						/>
						<div className={styles.validate}> Validated</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ValidateRow;
