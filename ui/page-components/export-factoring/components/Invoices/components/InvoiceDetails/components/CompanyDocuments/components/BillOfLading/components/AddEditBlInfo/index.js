import { Button } from '@cogoport/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import { useAddBolDocControls } from '@/ui/page-components/export-factoring/configurations/useAddBolDocControls';
import useSaveBlDocsDetails from '@/ui/page-components/export-factoring/hooks/useSaveBlDocsDetails';

function AddEditBlInfo({
	doc,
	data = {},
	refetch,
	showBlForm,
	setShowBlForm,
}) {
	const addBolDocControls = useAddBolDocControls();

	const {
		control, handleSubmit, setValue, formState: { errors },
	} = useForm();

	const { document_data = {}, document_url = '', id = '' } = doc || {};
	const { document_date, document_number } = document_data;

	useEffect(() => {
		if (id) {
		  setValue('po_number', document_number);
		  setValue('po_date', new Date(document_date));
		  setValue('purchase_order', document_url);
		}
	  }, [doc]);

	const { loading, onBlDocSave } = useSaveBlDocsDetails({
		doc,
		data,
		refetch,
		showBlForm,
		setShowBlForm,
	});

	return (
		<div className={styles.container}>
			<div className={styles.formDiv}>
				{addBolDocControls.map((item) => {
					const Element = getField(item?.type);
					return (
						item?.type
						&& (
							<div className={styles.field}>
								<div className={styles.field_name}>{item?.label}</div>
								<Element control={control} {...item} />
								<div className={styles.error_text}>
									{errors?.[item?.name]?.message
										|| errors?.[item?.name]?.type}
								</div>
							</div>
						)
					);
				})}
			</div>

			<div className={styles.buttonFlex}>
				<Button
					type="button"
					size="md"
					themeType="secondary"
					onClick={() => setShowBlForm((pv) => !pv)}
					style={{ marginRight: '10px' }}
				>
					Cancel
				</Button>

				<Button
					type="button"
					size="md"
					onClick={handleSubmit(onBlDocSave)}
					loading={loading}
					disabled={loading}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default AddEditBlInfo;
