import { Modal, Button, Loader } from '@cogoport/components';
// import { IcMRolesIncluded } from '@cogoport/icons-react';
import { useState } from 'react';

import TitleStyle from '../../../common/Line';
import getControls from '../../../configuration/tradepartyaddresscontrols';
import usePostTradePartner from '../../../hooks/usePostTradePartner';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import CountrySelectController from '@/packages/forms/Controlled/CountryCodeSelectController';
import { useSelector } from '@/packages/store';

function TradePartnerAddress({
	showmodal,
	setShowModal,
	tradePartyDetails = {},
	isEdit = false,
	getList,
	setIsEdit,
}) {
	const { postTradePartner, loading } = usePostTradePartner({
		isEdit,
		tradePartyDetails,
		getList,
		setIsEdit,
	});

	const { profile } = useSelector((s) => s);
	const { id, organization } = profile || {};
	const [countryInfo, setCountryInfo] = useState();
	const [stateInfo, setStateInfo] = useState();
	const [cityInfo, setCityInfo] = useState();

	const field = getControls({
		countryInfo,
		stateInfo,
		setCountryInfo,
		setStateInfo,
		setCityInfo,
		tradePartyDetails,
	});

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	const ButtonRender = (edit) => {
		if (edit) {
			return 'UPDATE';
		}
		return 'CREATE';
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};
	const submitForm = (data) => {
		const userData = {
			...data,
			performedBy             : id,
			organizationId          : organization.id,
			organizationName        : data?.partyName,
			state                   : stateInfo?.name,
			stateId                 : stateInfo?.id,
			city                    : cityInfo?.name,
			cityId                  : cityInfo?.id,
			country                 : countryInfo?.country,
			countryId               : countryInfo?.id,
			phoneCode               : data.phoneNumber.country_code,
			phoneNumber             : data.phoneNumber.number,
			address                 : data.addLine,
			partnerOrganizationType : 'BUYER',
		};
		postTradePartner({
			data,
			userData,
			profile,
			handleCloseModal,
		});
	};

	const InputController = getField('email');
	const MobileNumberController = getField('mobile-select');
	const CountryController = getField('select');
	const TextController = getField('text');

	return (
		<Modal
			show={showmodal}
			onClose={() => setShowModal(false)}
			size="md"
		>
			<form>
				<div className={styles.container}>
					{/* <div className={styles.header}>
						<div className={styles.icon_container}>
						<IcMRolesIncluded width={20} height={20} />
						</div>
					</div> */}
					<Modal.Header title={`${isEdit ? 'Update' : 'Add New'} Trade Partner`} />
					<Modal.Body>
						<div className={styles.section}>
							<div className={styles.section_title}>
								<div className={styles.title}>User Details</div>
								<div className={styles.design}>
									<TitleStyle />
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.col}>
									<div className={styles.label}>
										{field[0]?.label}
									</div>
									<TextController {...field[0]} control={control} />
								</div>

								<div className={styles.col}>
									<div className={styles.label}>
										{field[1]?.label}
									</div>
									<TextController {...field[1]} control={control} />
									{errors[1] && <p className={styles.error_text}>{`${errors[1]?.type}*`}</p>}
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.col}>
									<div className={styles.label}>
										{field[2].label}
									</div>
									<InputController {...field[2]} control={control} />
									{errors[2] && (
										<p className={styles.error_text}>
											{`${
												errors[2]?.message || errors[2].type
											}*`}
										</p>
									)}
								</div>

								<div className={styles.col}>
									<div className={styles.label}>
										{field[3].label}
									</div>
									<TextController {...field[3]} control={control} />
									{errors[3] && (
										<p className={styles.error_text}>{`${errors[3].type}*`}</p>
									)}
								</div>

							</div>
							<div className={styles.row}>
								<div className={styles.col}>
									<div className={styles.label}>
										{field[4].label}
									</div>
									<MobileNumberController {...field[4]} control={control} />
									{errors[4] && (
										<p className={styles.error_text}>
											{`${
												errors[4].message || errors[4].type
											}*`}
										</p>
									)}
								</div>
								<div className={styles.col}>
									<div className={styles.label}>
										{field[5].label}
									</div>
									<CountrySelectController
										{...field[5]}
										control={control}
									/>
									{errors[5] && <p className={styles.error_text}>{`${errors[5].type}*`}</p>}
								</div>

							</div>
						</div>
						<div className={styles.section}>
							<div className={styles.section_title}>
								<div className={styles.title}>Address Details</div>
								<div className={styles.design}>
									<TitleStyle />
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.col}>
									<div className={styles.label}>
										{field[6].label}
									</div>
									<TextController {...field[6]} control={control} />
									{errors[6] && <p className={styles.error_text}>{`${errors[6].type}*`}</p>}
								</div>
								<div className={styles.col}>
									<div className={styles.label}>
										{field[7].label}
									</div>
									<TextController {...field[7]} control={control} />
								</div>

							</div>
							<div className={styles.row}>
								<div className={styles.col}>
									<div className={styles.label}>
										{field[8].label}
									</div>
									<CountryController
										className="country"
										{...field[8]}
										control={control}
										handleChange={(e) => setStateInfo(e)}
									/>
									{errors[8] && <p className={styles.error_text}>{`${errors[8].type}*`}</p>}
								</div>

								<div className={styles.col}>
									<div className={styles.label}>
										{field[9].label}
									</div>
									<CountryController
										className="country"
										{...field[9]}
										control={control}
										handleChange={(data) => setCityInfo(data)}
									/>
									{errors[9] && <p className={styles.error_text}>{`${errors[9].type}*`}</p>}
								</div>

							</div>
						</div>
					</Modal.Body>
				</div>
				<div className={styles.btn_container}>
					<Button
						type="button"
						className="submitBtn md"
						disabled={loading}
						onClick={handleSubmit(submitForm)}
					>
						{loading ? <Loader themeType="secondary" /> : ButtonRender(isEdit)}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
export default TradePartnerAddress;
