import { useEffect, useState } from "react";
import React from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import TableForm from "./testtable";
export default function DeliveryOrder(){
    return <>
          <LayoutContentWrapper style={{ height: '100%' }}>
        <LayoutContent>
<TableForm/>
        </LayoutContent>
      </LayoutContentWrapper>
    </>
}