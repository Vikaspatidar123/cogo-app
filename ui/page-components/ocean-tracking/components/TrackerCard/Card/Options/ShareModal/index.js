import { Modal, Button, Placeholder, Avatar } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import useShareOption from '@/ui/page-components/ocean-tracking/hooks/useShareOption';

function ShareModal({
	show, setShow, tracker,
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
	const {
		loading,
		apiLoading,
		shareDetailsList,
		setShareDetailsList,
		onSubmit,
	} = useShareOption({ saasSubscriptionId });
	// const shareData = () => {

	// };
	console.log(shareDetailsList, 'shareDetailsList');
	return (
		<Modal size="md" show={show} onClose={() => setShow(!show)} placement="center">
			<Modal.Header title="Share via Email" />
			<Modal.Body>
				Share current status of this shipment via email.
				<form className={styles.input}>
					<div className={styles.email}>
						{controls.map((field) => {
							const { name } = field;

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
					<div className={styles.button}>
						<Button
							size="lg"
							variant="secondary"
							onClick={handleSubmit(onSubmit)}
						>
							Share Tracker
						</Button>
					</div>
				</form>
				{apiLoading ? (
					<Placeholder height="50px" width="324px" margin="0px 0px 20px 0px" />
				) : (
					shareDetailsList.length > 0 && (
						<div>
							<h4>
								Shared with
							</h4>
							<div className={styles.shared_with}>
								{shareDetailsList
									.slice(0)
									.reverse()
									.map((item, idx) => {
										const bgColor = item.email[0];
										return (
											<div className={styles.list}>
												<div className={styles.content}>
													<Avatar personName={bgColor}>{item.email[0]}</Avatar>
													<div>
														{item.email}
													</div>
												</div>
												<div size="12px">
													on
													{' '}
													{format(item.created_at, 'dd LLL yyyy')}
												</div>
											</div>
										);
									})}
							</div>
						</div>
					)
				)}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footer}>
					<Button onClick={() => setShow(!show)}>Cancel</Button>
				</div>
			</Modal.Footer>

		</Modal>
	);
}
export default ShareModal;
