import { useEffect, useState } from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import React from "react";
export default function Mesin(){
    return <>
         <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Mesin & Bahan Jadi</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    </>
}