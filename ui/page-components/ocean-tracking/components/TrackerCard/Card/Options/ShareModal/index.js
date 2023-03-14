import { Modal, Button, Input } from '@cogoport/components';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function ShareModal({
	show, setShow, refetch, tracker, setTrackers,
}) {
	// console.log()
	const saasSubscriptionId = tracker?.id;

	const emailValidator = /^[^<>()[\]\\,;:%#^\s@"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
	const controls = [
		{
			name  : 'email',
			label : 'EMAIL',
			type  : 'text',
			value : '',
			rules : {
				required : 'Please enter email',
				pattern  : {
					value   : emailValidator,
					message : 'Invalid email address',
				},
			},
		},
	];

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const shareData = () => {

	};
	return (
		<Modal size="md" show={show} onClose={() => setShow(!show)} placement="center">
			<Modal.Header title="Share via Email" />
			<Modal.Body>
				<form className={styles.input}>
					<div className={styles.email}>
						{controls.map((field) => {
							const { type, name } = field;

							const Element = getField(field?.type);

							return (
								<div>
									<Element {...field} control={control} />
									<div>
										{errors[name]?.type === 'required' || 'pattern' ? (
											<div>
												{errors[name]?.message}
											</div>
										) : null}
									</div>
								</div>
							);
						})}
					</div>
					<div className={styles.b}>
						<Button
							size="lg"
							variant="secondary"
						>
							Share Tracker
						</Button>
					</div>
				</form>

			</Modal.Body>
			<div className={styles.footer}>
				<Button onClick={() => setShow(!show)}>Cancel</Button>
				{/* <Button onClick={() => shareData()}>OK</Button> */}
			</div>
		</Modal>
	);
}
export default ShareModal;
