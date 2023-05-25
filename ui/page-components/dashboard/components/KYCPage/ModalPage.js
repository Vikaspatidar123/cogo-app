import { Modal, Button, Toast } from '@cogoport/components';

import { getControls } from '../configuration';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import FormItem from '@/ui/commons/components/FormItem';

function ModalPage({ open, setOpen }) {
	const [{ loading }, otpVerifyAPI] = useRequest(
		{
			url    : '/verify_user_mobile',
			method : 'post',
		},
		{ manual: true },
	);

	const { agent_id, organization, user_profile } = useSelector(
		({ general, profile }) => ({
			scope        : general?.scope,
			agent_id     : profile?.id,
			organization : profile?.organization,
			countryId:
        profile?.organization?.country_id || profile?.partner?.country_id,
			user_profile: profile,
		}),
	);
	const initialValues = {
		preferred_languages : user_profile?.preferred_languages,
		registration_number : user_profile?.organization?.registration_number,
		mobile              : {
			country_code : user_profile?.mobile_country_code,
			number       : user_profile?.mobile_number,
		},
		country_id:
      user_profile?.organization?.country_id
      || user_profile?.partner?.country_id,
		country_code: organization?.country?.country_code,
	};
	const controls = getControls(initialValues);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (values = {}) => {
		try {
			await otpVerifyAPI({
				data: {
					id                  : agent_id,
					mobile_number       : values?.mobile?.number,
					mobile_country_code : values?.mobile?.country_code,
				},
			});
			Toast?.success('OTP sent');
		} catch (err) {
			console.log(err);
		}
	};
	const head = () => (
		<div>
			<h3>Get Additional Sport Searches for free!</h3>
			<p className={styles.head}>
				We just need some additional details from you
			</p>
		</div>
	);
	return (
		<Modal
			size="md"
			show={open}
			onClose={() => setOpen(false)}
			placement="center"
		>
			<Modal.Header title={head()} />
			<Modal.Body>
				<div>
					{controls.map((itm) => {
						const Element = getField(itm?.type);
						return (
							<FormItem label={itm?.label} className={itm?.name} key={itm.id}>
								<Element {...itm} control={control} />
								{errors[itm.name] && (
									<p className={styles.errors}>{errors[itm.name].message}</p>
								)}
							</FormItem>
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<p className={styles.para}>
					We attach great importance to protecting your private data, which is
					only used to verify your business and complete transactions
				</p>
				<Button onClick={handleSubmit(onSubmit)} loading={loading}>
					Avail Your Free Searches
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default ModalPage;
