import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/admin/AccountForms';
import { getCurrentUser } from '@/lib/cms/auth';

export default async function LoginPage() {
  if (await getCurrentUser()) redirect('/admin');
  return (
    <div className="ad-login">
      <div className="ad-login-art">
        <b style={{ fontSize: 20 }}>Incarnate</b>
        <div>
          <h1>Edit what the website says.</h1>
          <p>Update articles, projects, services and page details. Changes go live as soon as you save.</p>
        </div>
        <span style={{ color: '#6f8579', fontSize: 12.5 }}>Content manager</span>
      </div>
      <div className="ad-login-form"><LoginForm /></div>
    </div>
  );
}
