import Head from 'next/head';
import SystemLog from '../../containers/SystemLog';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>System Log</title>
    </Head> 
    <DashboardLayout>
      <SystemLog />
    </DashboardLayout>
  </>
));
