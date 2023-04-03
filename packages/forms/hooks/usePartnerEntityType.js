import { useSelector } from '@/packages/store';

const usePartnerEntityType = () => {
	const { entity_types = [] } = useSelector(({ profile = {} }) => ({
		entity_types: profile?.partner?.entity_types || [],
	}));
	const isChannelPartner = entity_types.includes('channel_partner')
		&& !entity_types.includes('cogoport');
	return { entityTypes: entity_types, isChannelPartner };
};

export default usePartnerEntityType;
