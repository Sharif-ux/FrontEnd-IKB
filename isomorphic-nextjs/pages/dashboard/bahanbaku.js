import Head from 'next/head';
import BahanBaku from '../../containers/LaporanMutasi/bahanbaku';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import { Path } from '../../components/Path/path';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Bahan Baku</title>
    </Head> 
    <DashboardLayout>
    <Path parent="Laporan Mutasi" children="Bahan Baku"/>
      <BahanBaku />
    </DashboardLayout>
  </>
));
