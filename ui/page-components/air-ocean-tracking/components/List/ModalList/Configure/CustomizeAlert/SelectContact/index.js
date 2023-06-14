import { Button, cl } from '@cogoport/components';
import { useState } from 'react';

import customizeAlertControls from '../../../../../../configuration/customizeAlertControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRouter } from '@/packages/next';
import AddContactModal from '@/ui/page-components/air-ocean-tracking/common/AddContactModal';

function SelectContact({ closeHandler, nextStepHandler, setSelectContactList }) {
	const { query } = useRouter();
	const [addContact, setAddContact] = useState(false);

	const { branch_id = '' } = query || {};
	const { control, formState: { errors }, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data, 'data');
		nextStepHandler();
	};

	const controls = customizeAlertControls({ branch_id });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Select Contact</h3>
			</div>
			<div className={styles.form_container}>
				<div className={styles.flex_box}>
					{controls.map((config) => {
						const { name, type } = config || {};
						const Element = getField(type);
						return (
							<div key={name} className={styles.col}>
								<Element control={control} {...config} handleChange={(e) => setSelectContactList(e)} />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}

					<div className={cl`${styles.flex_box} ${styles.col} ${styles.new_tag} `}>
						<div className={cl`${styles.or_tag}`}>
							<div className={styles.line} />
							<div>OR</div>
							<div className={styles.line} />
						</div>

						<Button themeType="accent" onClick={() => setAddContact(true)}>Add New Contact</Button>
					</div>
				</div>

			</div>
			<div className={styles.footer}>
				<Button themeType="secondary" onClick={closeHandler}>Cancel</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					onClick={handleSubmit(onSubmit)}
				>
					Next
				</Button>
			</div>
			{addContact && <AddContactModal addContact={addContact} setAddContact={setAddContact} />}
		</div>
	);
}

export default SelectContact;
