import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { getAddMiDocControls } from '@/ui/page-components/export-factoring/configurations/getAddMiDocControls';
import useSaveMiDocsDetails from '@/ui/page-components/export-factoring/hooks/useSaveMiDocsDetails';

function AddEditMiInfo({
	doc,
	data = {},
	refetch,
	showMiForm,
	setShowMiForm,
	creditRequest,
}) {
	const addMiDocControls = getAddMiDocControls();

	const {
		control, handleSubmit, setValue, formState: { errors },
	} = useForm();

	const { document_data = {}, document_url = '', id = '' } = doc || {};
	const { insuring_party_name = '', document_number = '' } = document_data;

	useEffect(() => {
		if (id) {
			setValue('insuring_party_name', insuring_party_name);
			setValue('mi_number', document_number);
			setValue('marine_insurance', document_url);
		}
	}, [doc]);

	const { loading, onMiDocSave } = useSaveMiDocsDetails({
		doc,
		data,
		refetch,
		showMiForm,
		setShowMiForm,
		creditRequest,
	});

	return (
		<div className={styles.container}>
			<div className={styles.formDiv}>
				{addMiDocControls.map((item) => {
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

			<div className={styles.buttonFlex}>
				<Button
					type="button"
					size="md"
					themeType="secondary"
					onClick={() => setShowMiForm((pv) => !pv)}
					style={{ marginRight: '10px' }}
				>
					Cancel
				</Button>

				<Button
					type="button"
					size="md"
					onClick={handleSubmit(onMiDocSave)}
					loading={loading}
					disabled={loading}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default AddEditMiInfo;
