import { Button } from '@cogoport/components';
import { IcMBldo, IcMArrowNext } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function Footer({ handleSubmit = () => {}, draftLoading = false, saveDraft = () => {}, submit = () => {} }) {
	return (
		<div className={styles.wrapper_2}>
			<Button
				themeType="accent"
				disabled={draftLoading}
				onClick={handleSubmit(saveDraft)}
				loading={draftLoading}
			>
				<div className={styles.align_div}>
					Save as Draft
					<IcMBldo width="22px" height="22px" />
				</div>
			</Button>
			<Button
				className="primary md"
				type="button"
				onClick={handleSubmit(submit)}
			>
				<div className={styles.align_div}>
					Next step
					<IcMArrowNext />
				</div>
			</Button>
		</div>
	);
}

export default Footer;
