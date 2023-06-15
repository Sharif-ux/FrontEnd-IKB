import { useEffect, useState } from "react";
import React from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
export default function DeliveryOrder(){
    return <>
          <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Delivery Order</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    </>
}