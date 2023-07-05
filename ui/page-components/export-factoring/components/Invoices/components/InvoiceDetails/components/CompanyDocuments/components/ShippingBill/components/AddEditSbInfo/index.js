import { Button } from '@cogoport/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import { getAddSbDocControls } from '@/ui/page-components/export-factoring/configurations/getAddSbDocControls';
import useSaveSbDocsDetails from '@/ui/page-components/export-factoring/hooks/useSaveSbDocsDetails';

function AddEditSbInfo({
	doc,
	data = {},
	refetch,
	showSbForm,
	setShowSbForm,
}) {
	const addSbDocControls = getAddSbDocControls();

	const {
		control, handleSubmit, setValue, formState: { errors },
	} = useForm();

	const { document_data = {}, document_url = '', id = '' } = doc || {};
	const { document_date = '', document_number = '' } = document_data || {};

	useEffect(() => {
		if (id) {
			setValue('sb_date', new Date(document_date));
			setValue('sb_number', document_number);
			setValue('marine_insurance', document_url);
		}
	}, [doc]);

	const { loading, onSbDocSave } = useSaveSbDocsDetails({
		doc,
		data,
		refetch,
		showSbForm,
		setShowSbForm,
	});

	return (
		<div className={styles.container}>
			<div className={styles.formDiv}>
				{addSbDocControls.map((item) => {
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
					onClick={() => setShowSbForm((pv) => !pv)}
					style={{ marginRight: '10px' }}
				>
					Cancel
				</Button>

				<Button
					type="button"
					size="md"
					onClick={handleSubmit(onSbDocSave)}
					loading={loading}
					disabled={loading}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default AddEditSbInfo;
