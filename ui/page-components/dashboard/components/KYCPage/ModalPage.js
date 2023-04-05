import { Modal, Input, Upload, Button, Toast } from '@cogoport/components';

import useGetMediaFileUrl from '../../hooks/useMediaFileUrl';
import { getControls } from '../configuration';

// import { Input } from 'postcss';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
// import SelectMobileNumber from '@/packages/forms/Business/SelectMobileNumber';
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
	// const { loading, promotionData } = useGetMediaFileUrl();
	const { scope, agent_id, organization, user_profile } = useSelector(
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
		setValue,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (values = {}) => {
		// setMobile({
		// 	mobile_number       : values?.mobile?.mobile_number,
		// 	mobile_country_code : values?.mobile?.mobile_country_code,
		// });
		// setFormValue(values);
		try {
			// trackEvent(APP_EVENT.kyc_requested_verfication, {
			// 	company_name : organization.business_name,
			// 	company_type : organization.account_type,
			// });

			await otpVerifyAPI({
				data: {
					id                  : agent_id,
					mobile_number       : values?.mobile?.number,
					mobile_country_code : values?.mobile?.country_code,
				},
			});

			// setShow(true);
			Toast.success('OTP sent');
		} catch (err) {
			Toast.errors(err?.data);
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
				<Button onClick={handleSubmit(onSubmit)}>
					Avail Your Free Searches
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default ModalPage;
