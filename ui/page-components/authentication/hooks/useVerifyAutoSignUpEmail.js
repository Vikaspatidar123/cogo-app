import { request } from '@/packages/request';

const useVerifyAutoSignUpEmail = (body) => request.post('/verify_auto_sign_up_lead_user', body);

export default useVerifyAutoSignUpEmail;
