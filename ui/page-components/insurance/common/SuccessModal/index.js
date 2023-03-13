/* eslint-disable no-undef */
import { Button, Modal } from '@cogoport/components';
import { IcMAverage, IcMDownload, IcMHome } from '@cogoport/icons-react';
import React from 'react';

import { SuccessGIF } from '../constants';
import redirectUrl from '../redirectUrl';

import styles from './styles.module.css';

const URL = `${process.env.BUSINESS_FINANCE_BASE_URL}/saas/insurance/pdf/`;

function SuccessModal({
	showSuccessModal,
	setModal,
	createInsuranceLoading,
	policyIdDownload,
}) {
	const { redirectList } = redirectUrl();
	const downloadFunction = () => {
		window.open(`${URL}${policyIdDownload}`);
	};
	return (
		<Modal
			show={showSuccessModal}
			onClose={() => {
				setModal((prev) => ({
					...prev,
					showSuccessModal: false,
				}));
				redirectList();
			}}
		>
			{createInsuranceLoading && (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
					alt=""
				/>
			)}
			{!createInsuranceLoading && policyIdDownload && (
				<>
					<div className={styles.image_container}>
						<img src={SuccessGIF} alt="" />
					</div>
					<div className={styles.title}>Congratulations!!!!</div>
					<div className={styles.text}>
						Thanks for choosing Cogoport! Your cargo insurance policy is successfully
						generated. You will receive the original policy from the insurer in 24-48
						hours via email.
					</div>
					<div className={styles.text}>
						If any queries, please reach out to cogoport support.
					</div>
					<div className={styles.button_div}>
						<Button themeType="accent" onClick={downloadFunction}>
							<IcMDownload />
							Download PDF
						</Button>
						<Button onClick={() => redirectList()}>
							<IcMHome />
							Go to Home Screen
						</Button>
					</div>
				</>
			)}
			{!createInsuranceLoading && !policyIdDownload && (
				<>
					<div className={styles.image_container}>
						<IcMAverage
							height={100}
							width={100}
							fill="#fcdc00"
						/>
					</div>
					<div className={styles.text}>
						Sorry for the inconvenience.Insurance for your cargo was not created.We will
						get back to you in 24-28hrs
					</div>
					<div className={styles.button_div}>
						<Button onClick={() => redirectList()}>Go to Home Screen</Button>
					</div>
				</>
			)}
		</Modal>
	);
}
export default SuccessModal;
