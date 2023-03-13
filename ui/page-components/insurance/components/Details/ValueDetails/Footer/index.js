import { Checkbox, Button } from '@cogoport/components';
import { IcMArrowBack, IcMBldo, IcMPreview } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Footer({
	saveDraft = () => {},
	submit = () => {},
	handleSubmit = () => {},
	// agree = '',
	setTermsConditionsShow = () => {},
	ratesLoading = false,
	isMobile = false,
	draftLoading = false,
	setAgree = () => {},
	checked = false,
	setChecked = () => {},
	ratesResponse = {},
	setActiveStepper = () => {},
}) {
	const prevButton = () => {
		setActiveStepper(() => ({
			1   : true,
			2   : 'pro',
			3   : false,
			svg : 2,
		}));
	};

	const renderBtn = () => (
		<>
			<IcMPreview width="22px" height="22px" className={styles.icon} />
			Preview & Buy
		</>
	);

	return (
		<div className={styles.flex_div}>
			<div className={isMobile ? styles.flex_mobile : styles.flex}>
				<Checkbox
					className={checked ? styles.no_error : styles.error}
					checked={checked}
					onChange={() => {
						setChecked(!checked);
						setAgree(false);
					}}
				/>
				<div className={styles.conditions_div}>
					I agree to the
					<u role="presentation" onClick={() => setTermsConditionsShow(true)} className={styles.underline}>
						terms and conditions
					</u>
				</div>
			</div>
			<div className={isMobile ? styles.wrapper_2_mobile : styles.wrapper_2}>
				<Button onClick={prevButton}>
					<IcMArrowBack width="22px" height="22px" className={styles.icon} />
				</Button>
				<Button onClick={handleSubmit(saveDraft)} loading={draftLoading}>
					<div className={styles.align_div}>
						Save as Draft
						<IcMBldo className={styles.icon_left} />
					</div>
				</Button>
				<Button
					disabled={ratesLoading || Object.keys(ratesResponse).length <= 0 || !checked}
					onClick={handleSubmit(submit)}
				>
					{renderBtn()}
				</Button>
			</div>
		</div>
	);
}
export default Footer;
