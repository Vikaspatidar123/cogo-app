import { request } from '@/packages/request';

const useSaasUserInfo = (body) => request.post('/verify_saas_sign_up_lead_user', body);

export default useSaasUserInfo;
