import { useEffect, useState } from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import React from "react";
export default function Wip(){
    return <>
         <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Barang Dalam Proses (WIP)</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    </>
}