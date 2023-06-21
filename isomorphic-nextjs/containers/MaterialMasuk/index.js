import { useEffect, useState } from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import TableMaterial from "./Table";
import React from "react";
export default function MaterialMasuk(){
    return <>
          <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <TableMaterial/>
        </LayoutContent>
      </LayoutContentWrapper>
    </>
}