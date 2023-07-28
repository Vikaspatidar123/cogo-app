/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popover, Input, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import useVerifyHscode from '../../../../../../hooks/useVerifyHsCode';
import iconUrl from '../../../../../../utils/iconUrl.json';
import styles from '../styles.module.css';

import { Image } from '@/packages/next';

function SugestionContent({
	inputValue,
	setStatus,
	setValidateInProgress,
	setValue,
	isImport,
	setFormInfo,
	setPrevHs,
}) {
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
					className={styles.rowx}
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
}

function ValidateRow({
	item = {},
	setValue,
	setFormInfo,
	setIsDisable,
	setPrevHs,
}) {
	const { t } = useTranslation(['importExportControls']);
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
		<div className={cl`${styles.row} ${styles.hs_row}`}>
			<Popover
				animation="shift-away"
				content={(
					<SugestionContent
						inputValue={inputValue}
						setStatus={setStatus}
						setValidateInProgress={setValidateInProgress}
						setValue={setValue}
						isImport={isImport}
						setFormInfo={setFormInfo}
						setPrevHs={setPrevHs}
					/>
				)}
				interactive
				placement="bottom"
				visible={validateInProgress && inputValue.length > 0}
			>
				<div className={styles.inputContainer}>
					<p className={styles.label}>
						{isImport
							? t('importExportControls:import_hscode_label')
							: t('importExportControls:export_hscode_label')}
					</p>
					<Input
						size="sm"
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
						themeType="accent"
					>
						{t('importExportControls:validate_modal_validate')}
					</Button>
				) : (
					<div className={styles.valid}>
						<Image
							src={iconUrl.validate}
							alt="validated"
							width={25}
							height={25}
						/>
						<div className={styles.validate}>{t('importExportControls:validate_modal_validated')}</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ValidateRow;
