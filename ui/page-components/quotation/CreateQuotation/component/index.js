import { Button } from '@cogoport/components';
import { useState, useRef, forwardRef } from 'react';

import headerFields from '../configuration/headerControls';

import AllDetails from './AllDetails';
import Charges from './Charges';
import Header from './Header';
import OptSelector from './OptSelector';
import ProductDetails from './ProductDetails';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import { useSelector } from '@/packages/store';

function CreateQuotation() {
	const { id, organization } = useSelector((state) => state?.profile);
	const quoteRef = useRef();
	const [transportMode, setTransportMode] = useState('OCEAN');

	const {
		control:headerControls,
		// formState: { errors: headerError },
	} = useForm();

	const newHeaderFields = headerFields({ id, organization });

	const submitForm = async () => {
		const resp = await quoteRef.current.handleSubmit();
		console.log(resp, 'data');
	};

	return (
		<div>
			<Header control={headerControls} fields={newHeaderFields} />
			<div className={styles.container}>
				<div className={styles.details_section}>
					<OptSelector
						control={headerControls}
						fields={newHeaderFields}
						transportMode={transportMode}
						setTransportMode={setTransportMode}
					/>
					<AllDetails
						transportMode={transportMode}
						ref={quoteRef}
					/>
					<ProductDetails />
				</div>
				<div className={styles.charge_section}>
					<Charges />
				</div>
			</div>
			<div className={styles.btn_container}>
				<Button themeType="secondary" size="lg" className={styles.back_btn}>Back</Button>
				<Button size="lg" onClick={submitForm}>Create Quotation</Button>
			</div>
		</div>
	);
}

export default forwardRef(CreateQuotation);
