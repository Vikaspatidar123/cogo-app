import { Select, Button } from '@cogoport/components';

import styles from './styles.module.css';
import useSigningAuthority from './useSigningAuthority';

import getField from '@/packages/forms/Controlled';

function SigningAuthority({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		usersList = [],
		handleChangeUser = () => {},
		handleSubmit = () => {},
		onCreate = () => {},
		selectedUser,
		updateUserAPILoading = false,
		selectSigningAuthority = () => {},
		formState = {},
		inviteUserAPILoading = false,
		controls = [],
		control,
	} = useSigningAuthority({ channelPartnerDetails, kycDetails, setKycDetails });

	const { errors = {} } = formState;

	return (
		<div className={styles.flex}>
			<div style={{ color: '#333333' }}>
				Please select a key decision maker in the company from the dropdown. If
				the person is not available in the list, send an invite to them.
			</div>

			<div className={styles.layout_container}>
				<div className={styles.select_container}>
					<Select
						placeholder="Select User"
						type="select"
						options={usersList}
						themeType="new"
						onChange={handleChangeUser}
						valueKey="user_id"
						labelKey="name"
						size="lg"
						value={selectedUser}
					/>

					<div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
						<Button
							disabled={updateUserAPILoading}
							onClick={selectSigningAuthority}
						>
							CHOOSE
						</Button>
					</div>
				</div>

				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div className={styles.separator} />
					<div className={styles.separator_text}>OR</div>
					<div />
				</div>

				<div className={styles.layout_container}>
					<div className={styles.layout}>
						{controls.map((item) => {
							const Element = getField(item.type);
							return (
								<div className={styles.field}>
									<div className={styles.lable}>{item.label}</div>
									<Element {...item} control={control} />
									{errors && (
										<div className={styles.errors}>
											{errors[item?.name]?.message}
										</div>
									)}
								</div>
							);
						})}
					</div>

				</div>

				<div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
					<Button
						disabled={inviteUserAPILoading}
						onClick={handleSubmit(onCreate)}
					>
						INVITE
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SigningAuthority;
