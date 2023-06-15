import { useEffect, useState } from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import { Path } from "../../components/Path/path";
import React from "react";
export default function PengeluaranBarang(){
    return <>
<Path parent="Laporan Dokumen BC" children="REPORT PENGELUARAN BARANG DOK PABEAN"/>
          <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
        </LayoutContent>
      </LayoutContentWrapper>
    </>
}