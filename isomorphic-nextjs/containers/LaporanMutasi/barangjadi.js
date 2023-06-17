import { useEffect, useState } from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import React from "react";
export default function BarangJadi(){
    return <>
         <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Barang Jadi</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    </>
}