import { Popover, Modal } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import LegendInput from '../../../../common/form/business/LegendInput';

import InputController from '../../../../../packages/forms/Controlled/InputController';
import Button from '../../common/Button';
import { ValidateIcon } from '../../configuration/icon-configuration';
import useVerifyHscode from '../../hook/useVerifyHscode';
import validateFn from '../../utils/validateFn';

// import {
// 	ValidateModal,
// 	Container,
// 	Row,
// 	Footer,
// 	Suggestion,
// 	BtnContainer,
// } from './styles';
import styles from './styles.module.css';
import TitleContainer from './TitleContainer';

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
				{' '}
				-
				{ele?.description}
			</div>
		))}
	</div>
);

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
	isMobile = false,
}) {
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
			className={`${styles.primary} ${styles.ui_modal_dialog}`}
			onClose={() => setShow(false)}
			closable={!getDraftData?.headerResponse}
			width={!isMobile ? '534' : '363'}
		>
			<div className={styles.container}>
				<TitleContainer getDraftData={getDraftData} />
				<div className={styles.row_div}>
					<Popover
						animation="shift-away"
						content={sugestionContent({
							inputValue,
							setVerifiedData,
							setStatus,
							setValidateInProgress,
							setPrevHs,
						})}
						interactive
						placement="bottom"
						theme="light-border"
						visible={validateInProgress && inputValue.length > 0}
					>
						<div className={styles.input_container}>
							<InputController
								label="HS Code"
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
								productLoading
							>
								Validate
							</Button>
						) : (
							<div className={styles.valid}>
								<img src={ValidateIcon} alt="" height={25} width={25} />
								<div className={styles.validate}> Validated</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				{isQuotaLeft ? (
					<Button
						size="md"
						disabled={!status && !isValidated}
						onClick={handleSubmit(validateSubmitHandler)}
						loading={draftLoading}
					>
						Continue
					</Button>
				) : (
					<Button
						size="md"
						disabled={!status}
						onClick={submitHandler}
						loading={draftLoading}
					>
						Continue
					</Button>
				)}
			</div>
		</Modal>
	);
}

export default ValidateHsModal;
