import Head from 'next/head';
import DeliveryOrder from '../../containers/DeliveryOrder';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Barang Sisa</title>
    </Head> 
    <DashboardLayout>
      <DeliveryOrder />
    </DashboardLayout>
  </>
));
