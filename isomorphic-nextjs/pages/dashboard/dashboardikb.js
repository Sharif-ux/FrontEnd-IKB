import Head from 'next/head';
import DeliveryOrder from '../../containers/DeliveryOrder';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardIKB from '../../containers/DashboardIKB';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Dashboard IKB</title>
    </Head> 
    <DashboardLayout>
      <DashboardIKB />
    </DashboardLayout>
  </>
));
