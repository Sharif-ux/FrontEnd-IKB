import Head from 'next/head';
import BarangJadi from '../../containers/LaporanMutasi/barangjadi';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Barang Jadi</title>
    </Head> 
    <DashboardLayout>
      <BarangJadi />
    </DashboardLayout>
  </>
));
