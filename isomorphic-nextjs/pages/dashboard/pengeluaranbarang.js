import Head from 'next/head';
import PengeluaranBarang from '../../containers/LaporanDokumen/pengeluaranbarang';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Pengeluaran Barang</title>
    </Head> 
    <DashboardLayout>
      <PengeluaranBarang />
    </DashboardLayout>
  </>
));
