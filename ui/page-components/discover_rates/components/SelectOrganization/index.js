import { Select, Checkbox } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';
// import EmailContent from '@cogo/checkout/components/QuotationDetail/SearchLock/QuotationEmail/EmailContent';
import { useSelector } from 'react-redux';

import styles from './styles.module.css';

import { useRequest } from '@/packages/request';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();

function SelectOrganization({
	importer_exporter_details = {},
	setImporterExporterDetails = () => {},
	className = '',
	search_type = '',
	selectedOrg = null,
	disabled = false,
	service,
	rightContent = null,
}) {
	const {
		user_profile,
	} = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const [impExpDetails, setImpExpDetails] = useState(selectedOrg);
	const [settingPriorDetails, setIsSettingPriorDetails] = useState(false);
	const [isDemoAccount, setIsDemoAccount] = useState(
		importer_exporter_details?.id === geo.uuid.cogo_demo_account_shipper,
	);

	const isChannelPartner = (user_profile?.partner?.entity_types || []).includes(
		'channel_partner',
	);

	const classNames = [className, search_type]
		.filter((item) => !isEmpty(item))
		.join(' ');

	const selectStyle = {
		control: {
			height       : className === 'small' ? 32 : 44,
			border       : 'solid 1px #E0E0E0',
			width        : search_type === 'business_dashboard' ? '150px' : '200px',
			marginRight  : 10,
			marginBottom : 5,
		},
		valueContainer: {
			fontSize     : '14px',
			color        : '#000000',
			lineHeight   : '16px',
			fontWeight   : 'bold',
			textOverflow : 'ellipsis',
			whiteSpace   : 'nowrap',
			overflow     : 'hidden',
		},
		placeholder: {
			fontSize     : '12px',
			color        : '#828282',
			lineHeight   : '16px',
			fontWeight   : 'normal',
			textOverflow : 'ellipsis',
			whiteSpace   : 'nowrap',
			overflow     : 'hidden',
		},
	};

	const [{ loading }, defaultOrganizationAPI] = useRequest({
		url    : '/list_organizations',
		method : 'get',
	}, { manual: true });

	const handleChange = (val, obj) => {
		setIsSettingPriorDetails(true);

		setImpExpDetails({ ...obj });

		const isPassThroughCustomer =			(
			(obj.organization_settings || []).filter(
				(org_setting) => org_setting.setting_type === 'pass_through'
						&& org_setting.status === 'approved',
			) || []
		).length > 0;

		setImporterExporterDetails({
			org                 : obj,
			id                  : val,
			name                : obj?.business_name,
			branch_id           : obj?.branches?.length === 1 ? obj?.branches?.[0].id : '',
			user_id             : '',
			user_options        : [],
			is_org_pass_through : isPassThroughCustomer,
		});

		setTimeout(() => {
			setIsSettingPriorDetails(false);
		}, 10);
	};

	const handleBranchChange = (val) => {
		setIsSettingPriorDetails(true);
		setImporterExporterDetails({
			...(importer_exporter_details || {}),
			branch_id    : val,
			user_id      : null,
			user_options : [],
		});
		setTimeout(() => {
			setIsSettingPriorDetails(false);
		}, 10);
	};

	const handleChangeUserChange = (val, obj) => {
		setImporterExporterDetails({
			...(importer_exporter_details || {}),
			branch_id : obj.branch?.id,
			user_id   : val,
		});
	};
	const handleSingleOptions = (options) => {
		if (!importer_exporter_details.user_id && options.length === 1) {
			const userObj = options[0];
			setImporterExporterDetails({
				...(importer_exporter_details || {}),
				branch_id    : userObj.branch?.id,
				user_id      : userObj?.user_id,
				user_options : options,
			});
		}
	};

	const handleDemo = () => {
		if (!isDemoAccount) {
			setImporterExporterDetails({
				id        : geo.uuid.cogo_demo_account_shipper,
				name      : 'Cogo Freight Pvt Ltd',
				branch_id : geo.uuid.cogo_demo_account_shipper_user_branch,
				user_id   : geo.uuid.cogo_demo_account_shipper_user,
			});
		} else {
			setImporterExporterDetails({
				id        : '',
				name      : '',
				branch_id : '',
				user_id   : '',
			});
		}
		setIsDemoAccount(!isDemoAccount);
	};

	const handleOptionsChange = (newList) => {
		if (importer_exporter_details?.id && !impExpDetails) {
			const newImpExpDetails = (newList || []).find(
				(item) => item?.id === importer_exporter_details?.id,
			);
			setImpExpDetails(newImpExpDetails);
		}
	};

	useEffect(() => {
		(async () => {
			if (search_type !== 'rfq' && isChannelPartner) {
				const params = {
					branches_data_required : true,
					filters                : {
						partner_id   : user_profile?.partner?.id,
						account_type : 'importer_exporter',
					},
				};
				const res = await defaultOrganizationAPI.trigger({ params });
				const org = res?.data?.list?.[0] || {};
				setImpExpDetails({ ...org });
				setImporterExporterDetails({
					...(importer_exporter_details || {}),
					id        : org?.id,
					name      : org?.business_name,
					branch_id : org?.branches?.[0]?.id,
				});
			}
		})();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{rightContent || null}

				{!['rfq', 'forecast', 'results'].includes(search_type) ? (
					<div className={styles.heading}>Search rates for</div>
				) : null}

				{!isChannelPartner && !selectedOrg ? (
					<Select
						placeholder="Choose Shipper name"
						type="select"
						optionsListKey="organizations"
						themeType="new"
						onChange={(val, obj) => handleChange(val, obj)}
						value={importer_exporter_details?.id}
						style={selectStyle}
						disabled={isDemoAccount || disabled}
						defaultOptions
						params={{
							branches_data_required : true,
							filters                : { status: 'active', account_type: 'importer_exporter' },
						}}
						onOptionsChange={handleOptionsChange}
						inputId="search_form_choose_organization_select"
					/>
				) : null}

				{importer_exporter_details?.id
				&& (impExpDetails?.branches || [])?.length > 1 ? (
					<Select
						placeholder="Choose Branch name"
						type="select"
						themeType="new"
						onChange={handleBranchChange}
						value={importer_exporter_details?.branch_id}
						style={selectStyle}
						valueKey="id"
						labelKey="branch_name"
						disabled={isDemoAccount || disabled}
						options={impExpDetails?.branches}
						inputId="search_form_choose_organization_branch_select"
					/>
					) : null}

				{importer_exporter_details.branch_id
				&& !settingPriorDetails
				&& search_type !== 'forecast' ? (
					<Select
						placeholder="Choose User name"
						type="select"
						options={importer_exporter_details?.user_options}
						optionsListKey={
							(importer_exporter_details?.user_options || []).length
								? null
								: 'organization-users'
						}
						themeType="new"
						onChange={handleChangeUserChange}
						value={importer_exporter_details?.user_id}
						style={selectStyle}
						valueKey="user_id"
						labelKey="name"
						disabled={isDemoAccount || disabled}
						defaultOptions
						onOptionsChange={handleSingleOptions}
						params={{
							filters: {
								status                 : !isChannelPartner ? 'active' : undefined,
								organization_id        : importer_exporter_details?.id,
								organization_branch_id : importer_exporter_details.branch_id,
							},
						}}
						inputId="search_form_choose_organization_user_select"
					/>
					) : null}

				{/* Todo: Remove false condition, to "Search using Demo Account"  */}
				{false && !isChannelPartner && (
					<div
						role="presentation"
						className={`${styles.demo_acc_wrap} ${styles.search_type}`}
						onClick={handleDemo}
						style={{ marginTop: '0px' }}
					>
						<Checkbox
							themeType="black"
							onChange={handleDemo}
							checked={isDemoAccount}
							id="search_form_choose_organization_checkbox"
						/>
						<div color="#333333" size={12} style={{ marginLeft: '8px' }}>
							Search using Demo Account
						</div>
					</div>
				)}
			</div>

			{rightContent && !service}
		</div>
	);
}

export default SelectOrganization;
