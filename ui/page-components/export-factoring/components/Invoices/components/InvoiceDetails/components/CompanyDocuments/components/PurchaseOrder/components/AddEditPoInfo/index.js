import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { getAddPoDocControls } from '@/ui/page-components/export-factoring/configurations/getAddPoDocControls';
import useSavePoDocsDetails from '@/ui/page-components/export-factoring/hooks/useSavePoDocsDetails';

function AddEditPoInfo({
	doc,
	data = {},
	refetch,
	creditRequest,
	showPoForm,
	setShowPoForm,
}) {
	const addPoDocControls = getAddPoDocControls();

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

	const { loading, onPoDocSave } = useSavePoDocsDetails({
		doc,
		data,
		refetch,
		creditRequest,
		showPoForm,
		setShowPoForm,
	});

	return (
		<div className={styles.container}>
			<div className={styles.form_div}>
				{addPoDocControls.map((item) => {
					const Element = getField(item?.type);
					return (
						item?.type
						&& (
							<div className={styles.field} key={item.name}>
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

			<div className={styles.button_flex}>
				<Button
					type="button"
					size="md"
					themeType="secondary"
					onClick={() => setShowPoForm((pv) => !pv)}
					style={{ marginRight: '10px' }}
				>
					Cancel
				</Button>

				<Button
					type="button"
					size="md"
					onClick={handleSubmit(onPoDocSave)}
					loading={loading}
					disabled={loading}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default AddEditPoInfo;
