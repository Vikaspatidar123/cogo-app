import Toast, { Modal, Input, Upload } from '@cogoport/components';

import useGetMediaFileUrl from '../../hooks/useMediaFileUrl';
import getControl from '../configuration';

// import { Input } from 'postcss';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
// import SelectMobileNumber from '@/packages/forms/Business/SelectMobileNumber';
import getField from '@/packages/forms/Controlled';
import FormItem from '@/ui/commons/components/FormItem';

function ModalPage({ open, setOpen }) {
	const { loading, promotionData } = useGetMediaFileUrl();
	const controls = getControl();
	console.log(controls, 'controls');

	const {
		setValue,
		control,
	} = useForm();
	return (
		<Modal
			size="md"
			show={open}
			onClose={() => setOpen(false)}
			placement="center"
		>
			<Modal.Header title="Get Additional Sport Searches for free!" />
			<Modal.Body>
				<p>We just need some additional details from you</p>
				<div>
					{controls.map((itm) => {
						const Element = getField(itm?.type);
						return (
							<FormItem label={itm?.label} className={itm?.name} key={itm.id}>
								{console.log(itm?.type, 'label')}
								<Element {...itm} control={control} />
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
				<button className={styles.button}>Avail Your Free Searches</button>
			</Modal.Footer>
		</Modal>
	);
}
export default ModalPage;
