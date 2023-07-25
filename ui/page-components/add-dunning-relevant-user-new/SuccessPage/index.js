import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function SuccessPage() {
	const Router = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div>
					<Image
						src={GLOBAL_CONSTANTS.image_url.success_image}
						alt="Success"
						width={300}
						height={300}
					/>
				</div>
				<h1>Thank you for your valuable time!</h1>
				<h2 className={styles.success_text}>User Added Succesfully.</h2>
				<Button
					size="lg"
					className={styles.btn}
					onClick={() => Router.push('/login')}
				>
					Go To Login Page
				</Button>
			</div>
		</div>
	);
}

export default SuccessPage;
