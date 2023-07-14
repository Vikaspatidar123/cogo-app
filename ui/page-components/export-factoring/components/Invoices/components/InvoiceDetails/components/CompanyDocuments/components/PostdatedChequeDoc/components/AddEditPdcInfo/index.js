import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { getAddPdcDocControls } from '@/ui/page-components/export-factoring/configurations/getAddPdcDocControls';
import useSavePdcDocsDetails from '@/ui/page-components/export-factoring/hooks/useSavePdcDocsDetails';

function AddEditPdcInfo({
	doc = {},
	data = {},
	showPdcForm,
	setShowPdcForm,
	refetch,
	creditRequest,
}) {
	const { document_url = '', id = '' } = doc || {};

	const addPdcDocControls = getAddPdcDocControls();

	const {
		control, watch, handleSubmit, setValue, formState: { errors },
	} = useForm();

	const { loading, onPdcDocSave } = useSavePdcDocsDetails({
		doc,
		data,
		refetch,
		creditRequest,
	});

	useEffect(() => {
		if (id) {
			setValue('postdated_cheque', document_url);
		}
	}, [doc]);

	return (
		<div className={styles.container}>
			<div className={styles.formDiv}>
				{addPdcDocControls.map((item) => {
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
				{document_url && (
					<Button
						type="button"
						size="md"
						themeType="secondary"
						onClick={() => setShowPdcForm((pv) => !pv)}
						style={{ marginRight: '10px' }}
					>
						Cancel
					</Button>
				)}
				<Button
					type="button"
					size="md"
					onClick={handleSubmit(onPdcDocSave)}
					loading={loading}
					disabled={loading}
				>
					Save
				</Button>
			</div>
		</div>
	);
}
export default AddEditPdcInfo;
