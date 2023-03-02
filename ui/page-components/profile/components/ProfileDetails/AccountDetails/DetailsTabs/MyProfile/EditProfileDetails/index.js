/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-lone-blocks */
import { Button } from '@cogoport/components';
// import { IcMDelete } from '@cogoport/icons-react';

import FieldArray from '../FieldArray';
import useEditProfileDetails from '../hooks/useEditProfileDetails';

import styles from './styles.module.css';

// import { useFieldArray } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function EditProfileDetails({
	setShowEditProfileDetails = () => {},
	userDetails = {},
	getChannelPartnerUser,
}) {
	const {
		showElements,
		fields = {},
		errors = {},
		handleSubmit = () => {},
		onCreate = () => {},
		onError = () => {},
		loading = false,
		control,
		// register,
	} = useEditProfileDetails({
		userDetails,
		getChannelPartnerUser,
		setShowEditProfileDetails,
	});
	// const {
	// 	fields:field, append, remove,
	// } = useFieldArray({
	// 	control, // control props comes from useForm (optional: if you are using FormContext)
	// 	name: 'alternate_mobile_numbers', // unique name for your Field Array
	//   });

	return (
		<div className={styles.Layout_container}>

			<div className={styles.layout}>
				{fields.map((item) => {
					if (item.type === 'fieldArray') {
						return (
							<FieldArray {...item} control={control} />
						);
					}
	               { /* const Element = getField('mobile_number');
					if (item.type === 'fieldArray') {
						return (
							<div className="child">
								{field.map((value, index) => (
									<div className={styles.fields}>
										<Element
											control={control}
											key={value.id}
											{...value}
											// {...register(`alternate_mobile_numbers.${index}.value`)}
											value={value.mobile_number}
										/>
										<IcMDelete onClick={() => remove(index)} />
									</div>
								))}
								<Button
									onClick={() => append({
										mobile_number: {
											country_code : '',
											number       : '',
										},
									})}
									themeType="link "
								>
									+ ADD MORE
								</Button>
							</div>
						);
					} */ }
					const ELEMENT = item.type !== 'fieldArray' && getField(item.type);
					const show = showElements[item.name];
					return (
						show && item.type !== 'fieldArray' && (
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
