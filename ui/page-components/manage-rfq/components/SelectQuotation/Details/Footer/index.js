import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import useCreateCheckout from '@/ui/page-components/manage-rfq/hooks/useCreateCheckout';

function Footer({
	selectedPairs,
	formData,
	spotSearchId,
	setShowContractCreation = () => {},
}) {
	const data = formData.find((item) => item.id === spotSearchId);

	const { handleCreateCheckout, loading } = useCreateCheckout({
		searchId       : data?.id,
		selectedCardId : data?.card,
	});

	return (
		<div className={styles.container}>
			<div className={styles.footer_left}>
				{selectedPairs || 'No'}
				{' '}
				Port Pairs Selected
			</div>

			<div className={styles.footer_right}>
				{selectedPairs === 1 && (
					<Button
						onClick={handleCreateCheckout}
						disabled={loading || !data?.card}
						themeType="secondary"
					>
						Book
					</Button>
				)}
				<Button
					themeType="accent"
					onClick={() => {
						setShowContractCreation(true);
					}}
					disabled={!selectedPairs}
					className={styles.req_btn}
				>
					Request Contract
				</Button>
			</div>
		</div>
	);
}

export default Footer;
