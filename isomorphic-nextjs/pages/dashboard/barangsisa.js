import Head from 'next/head';
import BarangSisa from '../../containers/LaporanMutasi/barangsisa';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Barang Sisa</title>
    </Head> 
    <DashboardLayout>
      <BarangSisa />
    </DashboardLayout>
  </>
));
