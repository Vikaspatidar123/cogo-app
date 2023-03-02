import {
	Popover, Modal, Input, Button,
} from '@cogoport/components';
import { IcAReports } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { ValidateIcon } from '../../configuration/icon-configuration';
import useVerifyHscode from '../../hook/useVerifyHscode';
import validateFn from '../../utils/validateFn';

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

	const renderTitle = () => (
		<div className={styles.title_div}>
			<IcAReports width={25} height={25} />
			<div className={styles.title}>Get Accurate Data</div>
		</div>
	);
	return (
		<Modal
			show={show}
			className={styles.modal_container}
			onClose={() => setShow(false)}
			closable={!getDraftData?.headerResponse}
			size="md"
		>
			<Modal.Header title={renderTitle()} />
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
							<div className={styles.label}>HS Code</div>
							<Input
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
			</Modal.Body>
			<Modal.Footer>

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
			</Modal.Footer>
		</Modal>
	);
}

export default ValidateHsModal;
