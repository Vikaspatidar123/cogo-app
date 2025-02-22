import { Button, Popover, Input, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import useVerifyHscode from '../../../hooks/useVerifyHsCode';
import iconUrl from '../../../utils/iconUrl.json';
import validateFn from '../../../utils/validateFn';

import styles from './styles.module.css';
import TitleContainer from './TitleContainer';

import { useRouter } from '@/packages/next';

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
	handleSubmit,
	setVerifiedData,
	hsCode = '',
	prevHs = '',
	setPrevHs = () => {},
	validateSubmitHandler,
	getDraftFn,
	draftLoading = false,
	transportDetails = {},
	isQuotaLeft = true,
}) {
	const { t } = useTranslation(['common', 'importExportDoc']);
	const [status, setStatus] = useState(false);
	const [isValidated, setIsValidated] = useState(false);
	const [validateInProgress, setValidateInProgress] = useState(false);

	const { query } = useRouter();
	const { billId = '' } = query;

	const { verifyHsCode, checkLoading = false, inputValue = [] } = useVerifyHscode();

	const { validateHSCode } = validateFn({
		verifyHsCode,
		hsCode,
		transportDetails,
		setStatus,
		setShow,
		setValidateInProgress,
		getDraftFn,
	});

	useEffect(() => {
		if (status && inputValue.length === 0) {
			setPrevHs(hsCode);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue, status]);

	useEffect(() => {
		if (isQuotaLeft) {
			if (prevHs === hsCode) {
				setIsValidated(true);
			} else {
				setIsValidated(false);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Modal
			size="md"
			show={show}
			onClose={() => setShow(false)}
			showCloseIcon={!billId}
		>
			<div className={styles.container}>
				<TitleContainer billId={billId} />
				<div className={styles.row_container}>
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
						<div>
							<p>{t('importExportDoc:validate_modal_label')}</p>
							<Input value={hsCode} className={styles.hs_input} disabled />
						</div>
					</Popover>
					<div className={styles.btn_container}>
						{!status && !isValidated ? (
							<Button
								onClick={validateHSCode}
								loading={checkLoading}
								disabled={validateInProgress}
								className={styles.btn_color}
							>
								{t('importExportDoc:validate_modal_validate')}
							</Button>
						) : (
							<div className={styles.valid}>
								<img src={iconUrl.validate} alt="validated" className={styles.validate_svg} />
								<div className={styles.validate}>{t('importExportDoc:validate_modal_validated')}</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<Button
					size="md"
					disabled={(!status && !isValidated) || draftLoading}
					onClick={handleSubmit(validateSubmitHandler)}
					loading={draftLoading}
				>
					{t('common:continue')}
				</Button>
			</div>
		</Modal>
	);
}

export default ValidateHsModal;
