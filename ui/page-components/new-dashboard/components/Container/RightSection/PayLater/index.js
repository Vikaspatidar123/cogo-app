import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function PayLater() {
    const { push } = useRouter();
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                Ship Now,
                {' '}
                <span className={styles.pay_text}> Pay Later </span>
                {' '}
                Easily apply online in just a few minutes
            </div>
            <div className={styles.des}>
                Pay up to 90 days later for
                shipments, local transport, and
                other trade services without
                additional charges.
            </div>
            <div className={styles.button}>
                <Button
                    type="button"
                    size="md"
                    themeType="secondary"
                    onClick={() => push('/pay-later')}
                >
                    CHECK ELIGIBILITY NOW
                </Button>
            </div>
        </div>
    );
}
export default PayLater;
