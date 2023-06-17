import Head from 'next/head';
import BahanBaku from '../../containers/LaporanMutasi/bahanbaku';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Bahan Baku</title>
    </Head> 
    <DashboardLayout>
      <BahanBaku />
    </DashboardLayout>
  </>
));
