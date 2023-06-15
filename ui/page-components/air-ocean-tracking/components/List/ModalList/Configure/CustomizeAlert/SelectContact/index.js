import { Button, cl } from '@cogoport/components';
import { useState } from 'react';

import customizeAlertControls from '../../../../../../configuration/customizeAlertControls';
import useCreateContact from '../../../../../../hooks/useCreateContact';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRouter } from '@/packages/next';
import AddContactModal from '@/ui/page-components/air-ocean-tracking/common/AddContactModal';

function SelectContact({
	closeHandler, nextStepHandler, selectContactList, setSelectContactList,
	activeTab = 'ocean',
}) {
	const { query } = useRouter();
	const [addContact, setAddContact] = useState(false);

	const { loading, createContact } = useCreateContact({ activeTab });

	const { branch_id = '' } = query || {};

	const { control, formState: { errors }, handleSubmit } = useForm({
		defaultValues: {
			contactName: selectContactList || [],
		},
	});

	const controls = customizeAlertControls({ branch_id, activeTab });

	const onSubmit = async () => {
		const promiseArr = selectContactList.map((contact) => {
			if (contact.tradeContact) {
				const { name = '', mobile_no, email } = contact || {};
				const payloadData = {
					name,
					mobileNo: mobile_no,
					email,
				};
				return createContact({ data: payloadData, src: 'alert' });
			}
			return null;
		});

		await Promise.all(promiseArr)
			.then(() => nextStepHandler())
			.catch((err) => console.log(err));
	};

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
				<Button themeType="secondary" onClick={closeHandler} disabled={loading}>Cancel</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					Next
				</Button>
			</div>
			{addContact && (
				<AddContactModal
					addContact={addContact}
					setAddContact={setAddContact}
					activeTab={activeTab}
				/>
			)}
		</div>
	);
}

export default SelectContact;
