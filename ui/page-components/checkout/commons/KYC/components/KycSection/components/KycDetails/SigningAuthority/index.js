// import Layout from '@cogo/business-modules/form/Layout';

import { Select, Button } from '@cogoport/components';

import styles from './styles.module.css';
import useSigningAuthority from './useSigningAuthority';

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
		fields = {},
		formState = {},
		inviteUserAPILoading = false,
		controls = [],
	} = useSigningAuthority({ channelPartnerDetails, kycDetails, setKycDetails });

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

				{/* <Layout controls={controls} fields={fields} errors={formState.errors} /> */}

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
