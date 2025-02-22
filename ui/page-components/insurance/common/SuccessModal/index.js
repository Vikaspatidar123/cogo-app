import { Button, Modal } from '@cogoport/components';
import { IcMAverage, IcMDownload, IcMHome } from '@cogoport/icons-react';

import { SuccessGIF } from '../constants';
import redirectUrl from '../redirectUrl';

import styles from './styles.module.css';

import CustomerSatisfaction from '@/ui/commons/components/CustomerSatisfaction';

function SuccessModal({
	showSuccessModal,
	setModal,
	createInsuranceLoading,
	policyIdDownload,
	postInsuranceResponse = {},
}) {
	const { redirectList } = redirectUrl();
	const downloadFunction = () => {
		// eslint-disable-next-line no-undef
		window.open(postInsuranceResponse?.policyPdfFile);
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
			size="lg"
		>
			<Modal.Body>
				{createInsuranceLoading && (

					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
						alt=""
					/>

				)}
				{!createInsuranceLoading && policyIdDownload && (
					<>
						<div className={styles.image_container}>
							<img src={SuccessGIF} alt="" width={100} height={100} />
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

						<div className={styles.csat}>
							<CustomerSatisfaction
								serviceName="insurance"
								position="center"
								details={{ id: policyIdDownload }}
							/>
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
			</Modal.Body>
		</Modal>
	);
}
export default SuccessModal;
