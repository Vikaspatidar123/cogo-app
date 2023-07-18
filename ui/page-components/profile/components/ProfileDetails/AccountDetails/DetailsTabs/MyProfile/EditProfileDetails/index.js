import { Button } from '@cogoport/components';

import FieldArray from '../FieldArray';
import useEditProfileDetails from '../hooks/useEditProfileDetails';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function EditProfileDetails({
	setShowEditProfileDetails = () => {},
	userDetails = {},
	getChannelPartnerUser,
}) {
	const {
		showElements,
		fields = [],
		errors = {},
		handleSubmit = () => {},
		onCreate = () => {},
		onError = () => {},
		loading = false,
		control,
		setValue,
	} = useEditProfileDetails({
		userDetails,
		getChannelPartnerUser,
		setShowEditProfileDetails,
	});

	return (
		<div className={styles.Layout_container}>
			<div className={styles.layout}>
				{fields.map((item) => {
					if (item.type === 'fieldArray') {
						return (
							<FieldArray {...item} control={control} setValue={setValue} />
						);
					}
					const ELEMENT = item.type !== 'fieldArray' && getField(item.type);
					const show = showElements[item.name];
					return (show && item.type !== 'fieldArray' && (
						<div className={styles.field}>
							<div className={styles.lable}>{item.label}</div>
							<ELEMENT {...item} control={control} />
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
					disabled={loading}
					onClick={() => setShowEditProfileDetails(false)}
					size="sm"
					themeType="secondary"
					style={{
						marginRight: 16,
					}}
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate, onError)}
					size="sm"
					themeType="accent"
				>
					Update
				</Button>
			</div>
		</div>
	);
}

export default EditProfileDetails;
