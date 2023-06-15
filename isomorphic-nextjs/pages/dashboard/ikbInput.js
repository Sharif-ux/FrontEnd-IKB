import Head from 'next/head';
import BlankPage from '@iso/containers/BlankPage';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>IKB Input</title>
    </Head> 
    <DashboardLayout>
      <BlankPage />
    </DashboardLayout>
  </>
));
