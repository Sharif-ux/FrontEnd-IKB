import Head from 'next/head';
import Wip from '../../containers/LaporanMutasi/wip';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Barang Dalam Proses (WIP)</title>
    </Head> 
    <DashboardLayout>
      <Wip />
    </DashboardLayout>
  </>
));
