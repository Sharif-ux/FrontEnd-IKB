import Head from 'next/head';
import MaterialMasuk from '../../containers/MaterialMasuk';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Material Masuk</title>
    </Head> 
    <DashboardLayout>
      <MaterialMasuk />
    </DashboardLayout>
  </>
));
