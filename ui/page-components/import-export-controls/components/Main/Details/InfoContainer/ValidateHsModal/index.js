import { Button, Modal } from '@cogoport/components';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';
import TitleContainer from './TitleContainer';
import ValidateRow from './ValidateRow';

import { useRouter } from '@/packages/next';

function ValidateHsModal({
	show,
	setShow,
	formInfo,
	isMobile = false,
	handleSubmit,
	loading = false,
	setValues,
	setFormInfo,
	prevHs,
	setPrevHs,
	validateSubmitHandler = () => {},
	getDraftFn,
}) {
	const { query } = useRouter();
	const { billId = '' } = query;
	const [isDisable, setIsDisable] = useState([]);

	const {
		importCountry = {},
		exportCountry = {},
		exportHsCode = '',
		importHsCode = '',
		tradeEngineInputId = '',
	} = formInfo || {};

	const hsObj = {
		exportHsCode: {
			hsCode      : exportHsCode,
			label       : 'Export Hs Code',
			isImport    : false,
			prevHs      : prevHs?.exportHs,
			countryCode : exportCountry?.country_code,
		},
		importHsCode: {
			hsCode      : importHsCode,
			label       : 'Import Hs Code',
			isImport    : true,
			prevHs      : prevHs?.importHs,
			countryCode : importCountry?.country_code,
		},
	};

	useEffect(() => {
		if (billId) {
			getDraftFn(tradeEngineInputId);
		}
	}, [billId]);

	return (
		<Modal
			show={show}
			className="primary"
			onClose={() => setShow(false)}
			closable={!billId}
			width={!isMobile ? '534' : '363'}
		>
			<div className={styles.container}>
				<TitleContainer billId={billId} />
			</div>
			<div className={styles.row_container}>
				{Object.keys(hsObj).map((item, index) => (
					<div key={item?.hsCode}>
						<ValidateRow
							item={hsObj?.[item]}
							setValues={setValues}
							setFormInfo={setFormInfo}
							setPrevHs={setPrevHs}
							setIsDisable={setIsDisable}
						/>
						{index === 0 && <div className="line" />}
					</div>
				))}
			</div>
			<div className={styles.footer}>
				<Button
					size="md"
					disabled={isDisable.length < 2 || loading}
					className={`primary md ${
						isDisable.length < 2 || loading ? 'disable_btn' : null
					}`}
					onClick={handleSubmit(validateSubmitHandler)}
					loading={loading}
				>
					Continue
				</Button>
			</div>
		</Modal>
	);
}

export default ValidateHsModal;
