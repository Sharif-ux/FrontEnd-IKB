import Head from 'next/head';
import Mesin from '../../containers/LaporanMutasi/mesin';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Mesin dan Peralatan Kantor</title>
    </Head> 
    <DashboardLayout>
      <Mesin />
    </DashboardLayout>
  </>
));
