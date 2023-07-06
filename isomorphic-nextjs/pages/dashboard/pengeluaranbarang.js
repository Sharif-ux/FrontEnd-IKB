import Head from 'next/head';
import PengeluaranBarang from '../../containers/LaporanDokumen/pengeluaranbarang';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import { Path } from '../../components/Path/path';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Pengeluaran Barang</title>
    </Head> 
    <DashboardLayout>
    <Path parent="Laporan Dokumen BC" children="Pengeluaran Barang"/>
      <PengeluaranBarang />
    </DashboardLayout>
  </>
));
