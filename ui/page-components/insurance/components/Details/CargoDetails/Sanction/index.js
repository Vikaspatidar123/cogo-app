import { Modal, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { exclamationSvg } from '../../../../common/constants';

import styles from './styles.module.css';

function Sanction({ reset, isMobile, countryDetails, setCountryDetails }) {
	const [show, setShow] = useState(false);
	const { checkSantion = '', sanctionedCountry = '' } = countryDetails || {};

	const resetFunc = () => {
		setShow(false);
		setCountryDetails((prev) => ({
			...prev,
			checkSantion: '',
		}));
		reset((formValues) => ({
			...formValues,
			policyCountryId: '',
		}));
	};

	useEffect(() => {
		if (checkSantion !== 'NORMAL') setShow(true);
	}, [checkSantion]);

	const btnConditionHandler = () => {
		if (checkSantion === 'BLOCKED') {
			resetFunc();
		} else {
			setShow(false);
		}
	};
	return (
		<div>
			<Modal show={show} size={isMobile ? 'sm' : 'md'}>
				{(checkSantion === 'BLOCKED' || checkSantion === '') && (
					<>
						<Modal.Body>
							<div className={styles.wrapper}>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/resitrcted.gif"
									alt="cogo"
									width="100px"
								/>
								<div className={styles.label}>
									Shippings are restricted to
									{sanctionedCountry}
									. Kindly search services for
									another country.
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={btnConditionHandler}>OK</Button>
						</Modal.Footer>
					</>
				)}
				{checkSantion === 'HRA' && (
					<>
						<Modal.Body>
							<div className={styles.wrapper}>
								<img src={exclamationSvg} alt="" width={30} height={30} />
								<div className={styles.label}>Sanction Country Clause</div>
								<ul>
									<li className={styles.list}>Coverage Max upto the discharge port only</li>
									<li className={styles.list}>Transit not yet started</li>
									<li className={styles.list}>
										No other foreign entities being invloved in the transaction, other than
										those mentioned in the inovice and/or packing li
									</li>
									<li className={styles.list}>
										In the event of claim it will be payable to the indian entity and INR only
									</li>
								</ul>
								<div className={styles.styled_div}>
									<u>{sanctionedCountry}</u>
									is a sanctioned country.Do you want to continue?
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer align="center">
							<Button onClick={() => resetFunc()} className={styles.button}>No</Button>
							<Button onClick={() => setShow(false)}>Yes</Button>
						</Modal.Footer>
					</>
				)}
			</Modal>
		</div>
	);
}

export default Sanction;
