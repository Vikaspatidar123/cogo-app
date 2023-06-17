import { cl, Button, RadioGroup } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import useSendOrder from '../../../../hooks/useSendOrder';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getConfig from '@/ui/page-components/cogo-store/configurations/getConfig';

function Send({ orderItemId, closeModal }) {
	const { t } = useTranslation(['cogoStore']);
	const { name: userName } = useSelector((state) => state.profile);
	const [checked, setChecked] = useState('email');
	const [showElements, setShowElements] = useState({});

	const { sendConfig, options } = getConfig({ t });

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			senderName: userName,
		},
	});

	const {
		sendOrderFn,
		loading = false,
		respId = '',
		commError = false,
	} = useSendOrder();

	const submitHandler = (data) => {
		sendOrderFn({ formData: data, orderItemId, checked });
	};

	useEffect(() => {
		if (checked === 'email') {
			setShowElements({ mobile_no: false });
		} else {
			setShowElements({ email: false });
		}
	}, [checked]);

	if (respId) {
		setTimeout(() => {
			closeModal();
		}, 4000);

		return (
			<div className={styles.send_container}>
				<img
					src={GLOBAL_CONSTANTS.image_url.send_gift_image}
					alt={t('cogoStore:orderHistory_infoModel_send_image_alt')}
					width="240px"
				/>
			</div>
		);
	}

	if (commError) {
		return (
			<div className={cl`${styles.send_container} ${styles.err_box}`}>
				<IcCError width={50} height={50} />
				<p>{t('cogoStore:orderHistory_error')}</p>
			</div>
		);
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.btn_grp}>
					<span className={styles.btn_header}>
						{t('cogoStore:send_option')}
					</span>
					<RadioGroup options={options} value={checked} onChange={setChecked} />
				</div>
				<div className={styles.input_fields}>
					{sendConfig.map((field) => {
						const { name, type, label } = field;
						const Element = getField(type);
						const show = !(name in showElements) || showElements[name];

						return show ? (
							<div className={cl`${styles.col} ${styles?.[name]}`}>
								<p className={styles.label}>{label}</p>
								<Element {...field} control={control} />
								{errors?.[name] && (
									<span className={styles.error}>
										{errors?.[name]?.message || errors?.[name]?.type}
										*
									</span>
								)}
							</div>
						) : null;
					})}
				</div>
			</div>
			<div className={styles.footer}>
				<Button onClick={handleSubmit(submitHandler)} loading={loading}>
					{t('cogoStore:modal_submit')}
				</Button>
			</div>
		</>
	);
}

export default Send;
