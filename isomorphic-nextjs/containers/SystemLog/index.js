import { useEffect, useState } from "react";
import React from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
export default function SystemLog(){
    return <>
          <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>System Log</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    </>
}