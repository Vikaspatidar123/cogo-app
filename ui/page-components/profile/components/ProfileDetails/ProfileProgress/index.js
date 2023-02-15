import styles from './styles.module.css'
import UserDetails from './UserDetails'
import ContactDetails from './ContactDetails'
import ChangeLanguage from './ChangeLanguage'
import Edit from './Edit'
const ProfileProgress = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user_details_container}><UserDetails /></div>
            <div className={styles.contact_details_container}><ContactDetails /></div>
            <div className={styles.completion_chnages}><Edit /></div>
            <div className={styles.progress_completion_container}><ChangeLanguage /></div>

        </div>
    )
};

export default ProfileProgress;