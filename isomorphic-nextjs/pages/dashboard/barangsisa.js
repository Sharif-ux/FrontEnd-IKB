import Head from 'next/head';
import BarangSisa from '../../containers/LaporanMutasi/barangsisa';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import { Path } from '../../components/Path/path';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Barang Sisa</title>
    </Head> 
    <DashboardLayout>
    <Path parent="Laporan Mutasi" children="Barang Sisa"/>
      <BarangSisa />
    </DashboardLayout>
  </>
));
