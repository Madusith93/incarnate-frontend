import { Crumbs } from '@/components/admin/ui';
import { PasswordForm } from '@/components/admin/AccountForms';

export default function AccountPage() {
  return (
    <>
      <Crumbs trail={[{ label: 'Change password' }]} />
      <div className="ad-head"><div><h1 className="ad-h1">Change password</h1></div></div>
      <PasswordForm />
    </>
  );
}
