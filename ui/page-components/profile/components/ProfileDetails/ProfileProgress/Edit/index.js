import styles from './styles.module.css'
import { IcMEdit } from '@cogoport/icons-react'
const Edit = () => {
    return <div className={styles.container}>
        <div className={styles.label_text}><IcMEdit /><div className={styles.text}>CHANGE PASSWORD</div></div>
        <div className={styles.label_text}><IcMEdit /> <div className={styles.text}>EDIT PROFILE</div></div>

    </div>
}
export default Edit;