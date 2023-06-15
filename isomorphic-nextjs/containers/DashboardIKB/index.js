import { useEffect, useState } from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import React from "react";
import {Row, Col} from 'antd'
import { IoIosUndo, IoIosRedo } from "react-icons/io";
const { rowStyle, colStyle } = basicStyle;

export default function DashboardIKB(){
    return <>
{/* <Row style={{height: "100%"}} gap="12"><Col  md={24} sm={24} >
    <Row  style={{backgroundColor: "white", height: "10vh", borderRadius: "10px"}} gutter={[2,2]}><Col lg={8} md={8} sm={8}></Col>   <Col lg={8} md={8} sm={8}></Col></Row>
 
    </Col></Row> */}
    <LayoutWrapper><Row justify="center" style={rowStyle} gutter={0}>
          <Col lg={11} md={12} sm={24} xs={24} style={colStyle}>
<div style={{height: "14em", width: "100%", backgroundColor: "#1f2431", borderRadius: "10px", display: "flex", flexDirection: "column"}}>
    <h1 style={{margin: "2px 0 0 15px", height: "50%", color: "#efefef"}}>Total Barang Masuk Bulan Ini</h1>
    <div style={{display: "flex", alignItems: "end", width: "100%", height: '50%'}}><div style={{width: "50%"}}></div><div style={{width: "50%",}}><h1 style={{margin: "0 20px 15px 0", float:"right", fontSize: "44px", color: "#efefef"}}>4000</h1></div></div>
</div>
          </Col>
          <Col lg={1} md={24} sm={24} xs={24} style={colStyle}>
          </Col>
          <Col lg={11} md={12} sm={24} xs={24} style={colStyle}>
          <div style={{height: "14em", width: "100%", backgroundColor: "#9aa1b0", borderRadius: "10px", display: "flex", flexDirection: "column"}}>
    <h1 style={{margin: "2px 0 0 15px", height: "50%", color: "#1f2431"}}>Total Barang Keluar Bulan Ini</h1>
    <div style={{display: "flex", alignItems: "end", width: "100%", height: '50%'}}><div style={{width: "50%"}}></div><div style={{width: "50%",}}><h1 style={{margin: "0 20px 15px 0", float:"right", fontSize: "44px", color: "#1f2431"}}>1000</h1></div></div>
</div>
          </Col>
          <Col lg={20} md={20} sm={20} xs={20} style={colStyle}>
<div style={{height: "14em", width: "100%", backgroundColor: "white", borderRadius: "10px"}}>
   <center><h1>INI BUAT CHART DIAGRAM</h1></center> 
</div>
          </Col>
          <Col lg={11} md={12} sm={24} xs={24} style={colStyle}>
<div style={{height: "14em", width: "100%", backgroundColor: "white", borderRadius: "10px"}}></div>
          </Col>
          <Col lg={1} md={24} sm={24} xs={24} style={colStyle}>
          </Col>
          <Col lg={11} md={12} sm={24} xs={24} style={colStyle}>
<div style={{height: "14em", width: "100%", backgroundColor: "white", borderRadius: "10px"}}></div>
          </Col>
          </Row>
          </LayoutWrapper>
    </>
}