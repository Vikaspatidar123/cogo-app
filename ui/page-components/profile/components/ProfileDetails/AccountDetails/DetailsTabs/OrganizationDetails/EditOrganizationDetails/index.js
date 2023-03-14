import { Button } from '@cogoport/components';

import useEditOrganizationDetails from '../hooks/useEditOrganizationDetails';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function EditOrganizationDetails({
	setShowEditOrganizationDetails = () => { },
	organizationType = '',
	organizationData = {},
}) {
	const {
		showElements,
		control,
		fields,
		errors,
		loading,
		handleSubmit,
		onCreate,
		onError,
	} = useEditOrganizationDetails({
		organizationType,
		organizationData,
		setShowEditOrganizationDetails,
	});
	return (
		<div className={styles.layout_container}>
			<div className={styles.layout}>
				{fields.map((item) => {
					const Controller = getField(item.type);
					const show = showElements[item.name];
					return (
						show && (
							<div className={styles.field}>
								<div className={styles.lable}>{item.label}</div>
								<Controller {...item} control={control} />
								<div className={styles.errors}>
									{errors[item?.name]?.message}
								</div>
							</div>
						)
					);
				})}
			</div>
			<div className={styles.button_container}>
				<Button
					themeType="tertiary"
					size="md"
					disabled={loading}
					style={{
						marginRight: 16,
					}}
					onClick={() => setShowEditOrganizationDetails(false)}
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					size="md"
					disabled={loading}
					onClick={handleSubmit(onCreate, onError)}
				>
					Update
				</Button>
			</div>
		</div>
	);
}

export default EditOrganizationDetails;
