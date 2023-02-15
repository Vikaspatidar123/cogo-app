import { MultiSelect } from '@cogoport/components';
import languages from '@/commons/configurations/languages'
import { useState } from 'react';
import { useSelector } from '@/packages/store';
import { IcMCalendar } from '@cogoport/icons-react'
import styles from './styles.module.css'
import useUpdateUser from '../../../../hooks/useUpdateUser'
import getUser from '@/ui/page-components/profile/hooks/getUser';
const ChangeLanguage = () => {
    const { profile = {} } = useSelector((state) => state);
    const { birth_date, preferred_languages } = profile || {}
    const { refetch } = getUser()
    const { getUpdate } = useUpdateUser(refetch)

    const [value, setValue] = useState(preferred_languages)
    const onSelect = async (preferred_languages) => {
        await getUpdate(preferred_languages);
        setValue(preferred_languages);
    };
    return <div className={styles.container}>
        <MultiSelect options={languages} value={value} onChange={(e) => onSelect(e)} style={{ width: '154px' }} />
        {/* <div className={styles.label_text}><IcMCalendar />{birth_date || '---'}</div> */}
    </div>
}
export default ChangeLanguage;