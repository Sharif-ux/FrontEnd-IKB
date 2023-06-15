import Head from 'next/head';
import PenerimaanBarang from '../../containers/LaporanDokumen/penerimaanbarang';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Penerimaan Barang</title>
    </Head> 
    <DashboardLayout>
      <PenerimaanBarang />
    </DashboardLayout>
  </>
));
