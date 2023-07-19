import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';
import TitleContainer from './TitleContainer';
import ValidateRow from './ValidateRow';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;
function ValidateHsModal({
	show,
	setShow,
	formInfo,
	handleSubmit,
	loading = false,
	setValue,
	setFormInfo,
	prevHs,
	setPrevHs,
	validateSubmitHandler = () => {},
	getDraftFn,
}) {
	const { query } = useRouter();
	const { billId = '' } = query;

	const { t } = useTranslation(['common', 'importExportControls']);
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
			label       : t('importExportControls:export_hscode_label'),
			isImport    : false,
			prevHs      : prevHs?.exportHs,
			countryCode : exportCountry?.country_code,
		},
		importHsCode: {
			hsCode      : importHsCode,
			label       : t('importExportControls:import_hscode_label'),
			isImport    : true,
			prevHs      : prevHs?.importHs,
			countryCode : importCountry?.country_code,
		},
	};

	useEffect(() => {
		if (billId) {
			getDraftFn(tradeEngineInputId);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [billId]);

	return (
		<Modal
			show={show}
			className="primary"
			onClose={() => setShow(false)}
			closable={!billId}
		>
			<div className={styles.container}>
				<TitleContainer billId={billId} />
			</div>
			<div className={styles.row_container}>
				{Object.keys(hsObj).map((item, index) => (
					<div key={item?.hsCode}>
						<ValidateRow
							item={hsObj?.[item]}
							setValue={setValue}
							setFormInfo={setFormInfo}
							setPrevHs={setPrevHs}
							setIsDisable={setIsDisable}
						/>
						{index === ZEROTH_INDEX && <div className={styles.line} />}
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
					{t('common:continue')}
				</Button>
			</div>
		</Modal>
	);
}

export default ValidateHsModal;
