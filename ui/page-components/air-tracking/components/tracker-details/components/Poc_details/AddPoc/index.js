import { Toast, Modal, Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import patterns from '@/ui/commons/configurations/patterns';

function AddPocs({ isOpen, handleModal, addPocToState }) {
	const { general, profile } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_air_shipment_poc',
		method : 'post',
	}, { manual: true });

	const controls = [
		{
			name  : 'name',
			label : 'NAME *',
			type  : 'text',
			value : '',
			rules : {
				required  : 'Please enter name',
				maxLength : { value: 16, message: 'Name length should be less than 16' },
			},
		},
		{
			name  : 'mobile_no',
			label : 'MOBILE NO',
			type  : 'text',
			value : '',
			rules : {
				required : 'Please enter mobile no',
				pattern  : {
					value   : patterns.MOBILE,
					message : 'Invalid mobile number',
				},
			},
		},
		{
			name  : 'email',
			label : 'EMAIL *',
			type  : 'text',
			value : '',
			rules : {
				required : 'Please enter email',
				pattern  : {
					value   : patterns.EMAIL,
					message : 'Invalid email address',
				},
			},
		},
		{
			name  : 'company',
			label : 'COMPANY',
			type  : 'text',
			value : '',
		},
	];

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async ({ name, company, mobile_no, email }) => {
		try {
			let requestData = {};

			requestData = {
				name,
				company,
				mobile_no,
				email,
				organization_id        : profile.organization?.id,
				organization_branch_id : general?.query?.branch_id,
			};

			const res = await trigger({ data: requestData });

			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			const { data } = res;

			addPocToState(data);
			handleModal();
		} catch (err) {
			const message = err?.message ?? "Couldn't add POC details. Please try again later.";
			Toast.error(message);
		}
	};

	return (
		<Modal
			show={isOpen}
			onClose={handleModal}
			placement="center"
		>
			<Modal.Header title="New Contact" />

			<div className={styles.Alert}>
				<IcMAlert width={10} height={10} />
				<p>
					Add new contacts for whom you want to set up alerts or status reports.
				</p>
			</div>
			<form>
				<Modal.Body>
					<div className={styles.row}>
						{controls.map((controlItem) => {
							const { type, name, label } = controlItem;
							const Element = getField(type);
							return (
								<div className={styles.col}>
									{label}
									<Element {...controlItem} control={control} />
									{errors[name]?.type === 'required'
									|| errors[name]?.type === 'pattern'
									|| errors[name]?.type === 'maxLength' ? (
										<div className={styles.message}>
											{errors[name]?.message}
										</div>
										) : null}
								</div>
							);
						})}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button}>
						<Button
							size="lg"
							variant="ghost"
							style={{ marginRight: 8 }}
							onClick={handleModal}
						>
							CANCEL
						</Button>
						<Button
							size="lg"
							variant="secondary"
							normalCase
							disabled={loading}
							onClick={handleSubmit(onSubmit)}
						>
							Save
						</Button>
					</div>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default AddPocs;
