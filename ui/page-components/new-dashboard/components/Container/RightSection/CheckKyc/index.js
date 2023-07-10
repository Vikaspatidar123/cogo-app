import { Button } from '@cogoport/components'
import styles from './styles.module.css'
import { IcAInsurance, IcMArrowNext } from '@cogoport/icons-react'
const CheckKyc = () => {
    return <div className={styles.container}>
        <div className={styles.box}>
            <IcAInsurance width={50} height={50} />
            <div>
                <div className={styles.heading}>KYC Verification is pending!</div>
                <div className={styles.des}>Kindly upload the required documents to proceed further.</div>
                <Button size='sm' themeType="accent" type='button'>Complete KYC <IcMArrowNext /></Button>
            </div>
        </div>
    </div>
}
export default CheckKyc