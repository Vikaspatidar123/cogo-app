/* eslint-disable react-hooks/exhaustive-deps */
import {
	Popover, Modal, Input, Button,
} from '@cogoport/components';
import { IcAReports } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import useVerifyHscode from '../../hook/useVerifyHscode';
import validateFn from '../../utils/validateFn';

import styles from './styles.module.css';
import TitleContainer from './TitleContainer';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const sugestionContent = ({
	inputValue,
	setStatus,
	setVerifiedData,
	setValidateInProgress,
	setPrevHs,
}) => (
	<div className={styles.suggestion}>
		{(inputValue || []).map((ele) => (
			<div
				className={styles.row}
				role="presentation"
				onClick={() => {
					setVerifiedData(ele);
					setStatus(true);
					setValidateInProgress(false);
					setPrevHs(ele?.hsCode);
				}}
			>
				{ele?.hsCode}
				-
				{ele?.description}
			</div>
		))}
	</div>
);

function RenderTitle() {
	const { t } = useTranslation(['dutiesTaxesCalculator']);
	return (
		<div className={styles.title_div}>
			<IcAReports width={25} height={25} />
			<div className={styles.title}>{t('dutiesTaxesCalculator:validate_hscode_modal_title')}</div>
		</div>
	);
}

function ValidateHsModal({
	show,
	setShow,
	verifiedData = {},
	setVerifiedData,
	portDetails = {},
	hsCode = '',
	handleSubmit,
	validateSubmitHandler,
	isQuotaLeft = false,
	refetchDraft,
	draftLoading = false,
	getDraftData = {},
	postTradeEngine,
	prevHs = '',
	setPrevHs = () => {},
}) {
	const { t } = useTranslation(['common', 'dutiesTaxesCalculator']);

	const [status, setStatus] = useState(false);
	const [isValidated, setIsValidated] = useState(false);
	const [validateInProgress, setValidateInProgress] = useState(false);
	const { verifyHsCode, checkLoading, inputValue } = useVerifyHscode();
	const hs = getDraftData?.lineItem?.[0]?.destinationHs;
	const { validateHSCode, submitHandler } = validateFn({
		verifyHsCode,
		hsCode,
		portDetails,
		refetchDraft,
		draftLoading,
		getDraftData,
		postTradeEngine,
		verifiedData,
		setShow,
		setStatus,
		setValidateInProgress,
	});
	useEffect(() => {
		if (getDraftData?.headerResponse) {
			const { lineItem = [] } = getDraftData;
			setVerifiedData({
				hsCode      : lineItem[0].destinationHs,
				description : lineItem[0].productName,
			});
		}
	}, [getDraftData]);

	useEffect(() => {
		if (isQuotaLeft) {
			if (prevHs === hsCode) {
				setIsValidated(true);
			} else {
				setIsValidated(false);
			}
		}
	}, []);

	return (
		<Modal
			show={show}
			className={styles.modal_container}
			onClose={() => setShow(false)}
			closable={!getDraftData?.headerResponse}
			size="md"
		>
			<Modal.Header title={<RenderTitle />} />
			<Modal.Body>
				<TitleContainer getDraftData={getDraftData} />

				<div className={styles.row_div}>
					<Popover
						content={sugestionContent({
							inputValue,
							setVerifiedData,
							setStatus,
							setValidateInProgress,
							setPrevHs,
						})}
						interactive
						placement="bottom"
						visible={validateInProgress && inputValue.length > 0}
					>
						<div className={styles.input_container}>
							<div className={styles.label}>{t('dutiesTaxesCalculator:validate_hscode_modal_label')}</div>
							<Input
								value={hsCode || hs}
								className={styles.hs_input}
								disabled
							/>
						</div>
					</Popover>
					<div className={styles.btn_container}>
						{!status && !isValidated ? (
							<Button
								size="md"
								onClick={validateHSCode}
								loading={checkLoading}
								disabled={validateInProgress}
							>
								{t('dutiesTaxesCalculator:validate_hscode_modal_validate')}
							</Button>
						) : (
							<div className={styles.valid}>
								<Image src={GLOBAL_CONSTANTS.image_url.validate} alt="" height={25} width={25} />
								<div className={styles.validate}>
									{t('dutiesTaxesCalculator:validate_hscode_modal_validated')}
								</div>
							</div>
						)}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>

				{isQuotaLeft ? (
					<Button
						size="md"
						disabled={!status && !isValidated}
						onClick={handleSubmit(validateSubmitHandler)}
						loading={draftLoading}
					>
						{t('common:continue')}
					</Button>
				) : (
					<Button
						size="md"
						disabled={!status}
						onClick={submitHandler}
						loading={draftLoading}
					>
						{t('common:continue')}
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}

export default ValidateHsModal;
