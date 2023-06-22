import { Modal, Button, ButtonIcon } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import csvUploadControls from '../../../../configuration/csvUploadControls';
import { CSV_SAMPLE_FILE } from '../../../../constant/csvSampleFile';
import useCsvUpload from '../../../../hooks/useCsvUpload';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const downloadSampleHandler = ({ trackingType }) => {
	window.open(CSV_SAMPLE_FILE[trackingType], '_self');
};

function ImportCsvModal({ csvModal, setCsvModal, trackingType = 'ocean', operatorData = {} }) {
	const controls = csvUploadControls({ trackingType, operatorData });
	const { control, handleSubmit, formState:{ errors } } = useForm();

	const closeModalHandler = () => setCsvModal(false);
	const { loading, submitHandler } = useCsvUpload({ trackingType, closeModalHandler });

	return (
		<Modal show={csvModal} onClose={closeModalHandler} closeOnOuterClick showCloseIcon>
			<div className={styles.container}>
				<div className={styles.header}>
					<h3>{`Import your CSV file to track at once (${startCase(trackingType)})`}</h3>
					<ButtonIcon icon={<IcMCross />} onClick={closeModalHandler} disabled={loading} />
				</div>

				<div className={styles.main_body}>
					{controls.map((config) => {
						const { name, type, width } = config || {};
						const Element = getField(type);

						return (
							<div key={name} className={styles.col} style={{ width }}>
								<Element control={control} {...config} type="card" />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}

					<Button
						type="button"
						themeType="linkUi"
						onClick={() => downloadSampleHandler({ trackingType })}
					>
						Download the sample file here
					</Button>

					<Button
						type="button"
						themeType="accent"
						className={styles.footer_btn}
						onClick={handleSubmit(submitHandler)}
						loading={loading}
					>
						Import

					</Button>
				</div>

			</div>
		</Modal>
	);
}

export default ImportCsvModal;
