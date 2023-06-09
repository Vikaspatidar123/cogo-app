import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();

export const useStakeholderCheck = () => {
	const { role_ids } = useSelector(({ profile }) => ({
		role_ids: profile?.partner?.user_role_ids,
	}));

	const is_kam = (role_ids || []).some((item) => geo.uuid.kam_ids.includes(item));

	const is_so1 = (role_ids || []).some((item) => geo.uuid.service_ops1_role_ids.includes(item));

	const is_so2 = (role_ids || []).some((item) => geo.uuid.service_ops2_role_id.includes(item));

	const is_superadmin = (role_ids || []).some((item) => geo.uuid.super_admin_id.includes(item));

	const is_sales_agent = (role_ids || []).some((item) => geo.uuid.sales_role.includes(item));

	const is_admin = (role_ids || []).some((item) => geo.uuid.admin_id.includes(item));

	const is_tech_superadmin = (role_ids || []).some((item) => geo.uuid.tech_super_admin_id.includes(item));

	return {
		is_kam,
		is_so1,
		is_so2,
		is_superadmin,
		is_sales_agent,
		is_admin,
		is_tech_superadmin,
	};
};
