import { MultiSelect } from '@cogoport/components';
import { useState } from 'react';

import useUpdateUser from '../../../../hooks/useUpdateUser';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import languages from '@/ui/commons/configurations/languages';
import useGetUser from '@/ui/page-components/profile/hooks/useGetUser';

function ChangeLanguage() {
	const { profile = {} } = useSelector((state) => state);
	const { preferred_languages } = profile || {};
	const { refetch } = useGetUser();
	const { getUpdate } = useUpdateUser(refetch);

	const [value, setValue] = useState(preferred_languages);
	const onSelect = async (pre_languages) => {
		await getUpdate(pre_languages);
		setValue(pre_languages);
	};
	return (
		<div className={styles.container}>
			<MultiSelect options={languages} value={value} onChange={(e) => onSelect(e)} style={{ width: '154px' }} />
		</div>
	);
}
export default ChangeLanguage;
