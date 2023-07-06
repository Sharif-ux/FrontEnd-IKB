import Head from 'next/head';
import PenerimaanBarang from '../../containers/LaporanDokumen/penerimaanbarang';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import { Path } from '../../components/Path/path';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Penerimaan Barang</title>
    </Head> 
    <DashboardLayout>
    <Path parent="Laporan Dokumen BC" children="Penerimaan Barang"/>

      <PenerimaanBarang />
    </DashboardLayout>
  </>
));
