import Head from 'next/head';
import BarangJadi from '../../containers/LaporanMutasi/barangjadi';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import { Path } from '../../components/Path/path';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Barang Jadi</title>
    </Head> 
    <DashboardLayout>
    <Path parent="Laporan Mutasi" children="Barang Jadi"/>
      <BarangJadi />
    </DashboardLayout>
  </>
));
