import { Accordion, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';

import FormTitleAndDescription from '../../common/FormTitleAndDescription';
import { getControls } from '../../configurations/basicDetailsControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';

const DETAILS_ARRAY = ['company_details', 'poc', 'requirements'];

function BasicDetailsForm() {
	const { profile } = useSelector((state) => state);

	const basicDetailsControls = getControls({ profile });
	const {
		// handleSubmit,
		control,
		// setValue,
		// reset,
		// setError,
		// formState: { errors },
		// getValues,
	} = useForm();

	return (
		DETAILS_ARRAY.map((details) => (
			<div className={styles.wrapper}>
				<div className={styles.form_description}>
					<FormTitleAndDescription details={details} />
				</div>
				<div className={styles.form}>
					<form type="submit">
						{basicDetailsControls.map((item) => {
							const Element = getField(item.type);
							if (item.section === details) {
								return (
									<div className={styles.field} key={item.key}>
										<div className={styles.field_name}>{item.name}</div>
										{!item.isAccordian
											? <Element {...item} control={control} />
											: (
												<Accordion
													title={item.placeholder}
													type="form"
												>
													<Element
														{...item}
														control={control}
													/>
													<div className={styles.button_wrapper}>
														<Button themeType="secondary">
															<IcMPlus />
															Add New
														</Button>
													</div>
												</Accordion>
											)}
									</div>
								);
							}
							return null;
						})}
					</form>
				</div>
			</div>
		))

	);
}

export default BasicDetailsForm;
