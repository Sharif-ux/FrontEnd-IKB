import { useEffect, useState, Component, lazy } from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import React from "react";
import { Bar } from 'react-chartjs-2';
import {Row, Col} from 'antd'
import { IoIosUndo, IoIosRedo } from "react-icons/io";
import { options } from "../Charts/ReactChart2/Components/Mix/MixConfig";
import { Legend } from "recharts";
const { rowStyle, colStyle } = basicStyle;
const Bubble = lazy(() => import('../Charts/ReactChart2/Components/Bubble/Bubble'));
const ChartComponent = () => {
    const [chartData, setChartData] = useState(null);
  
    useEffect(() => {
      // Simulating data fetching delay
      setTimeout(() => {
        const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Sales',
              data: [50, 100, 80, 120, 150, 200, 180],
              backgroundColor: '#efefef',
            },
          ],
        };
        options: {
            legend: {
                fontColor: "white"
            }
            scales: { 
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        stepSize: 1,
                        beginAtZero: true
                    }
                }]
            }
        }
  
        setChartData(data);
      }, 2000); // Delay of 2 seconds
    }, []);
  
    return (
 
          <Bar data={chartData} height="100px" />


    );
  };
export default function DashboardIKB(){
    return <>
{/* <Row style={{height: "100%"}} gap="12"><Col  md={24} sm={24} >
    <Row  style={{backgroundColor: "white", height: "10vh", borderRadius: "10px"}} gutter={[2,2]}><Col lg={8} md={8} sm={8}></Col>   <Col lg={8} md={8} sm={8}></Col></Row>
 
    </Col></Row> */}
    <LayoutWrapper><Row justify="center" style={rowStyle} gutter={0}>
          <Col lg={8} md={12} sm={24} xs={24} style={colStyle}>
<div style={{height: "14em", width: "100%", backgroundColor: "#1f2431", borderRadius: "10px", display: "flex", flexDirection: "column"}}>
    <h1 style={{margin: "2px 0 0 15px", height: "50%", color: "#efefef", fontSize: 
"22px"}}>Total Barang Masuk Bulan Ini</h1>
    <div style={{display: "flex", alignItems: "end", width: "100%", height: '50%'}}><div style={{width: "50%"}}></div><div style={{width: "50%",}}><h1 style={{margin: "0 20px 15px 0", float:"right", fontSize: "44px", color: "#efefef"}}>4000</h1></div></div>
</div>
          </Col>
          <Col lg={1} md={24} sm={24} xs={24} style={colStyle}>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24} style={colStyle}>
          <div style={{height: "14em", width: "100%", backgroundColor: "#9aa1b0", borderRadius: "10px", display: "flex", flexDirection: "column"}}>
    <h1 style={{margin: "2px 0 0 15px", height: "50%", color: "#1f2431", fontSize: 
"22px"}}>Total Barang Keluar Bulan Ini</h1>
    <div style={{display: "flex", alignItems: "end", width: "100%", height: '50%'}}><div style={{width: "50%"}}></div><div style={{width: "50%",}}><h1 style={{margin: "0 20px 15px 0", float:"right", fontSize: "44px", color: "#1f2431"}}>1000</h1></div></div>
</div>
          </Col>
          <Col lg={20} md={20} sm={20} xs={20} style={colStyle}>
<div style={{height: "100%", width: "100%", backgroundColor: "#1f2431", borderRadius: "10px"}}>
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
  <ChartComponent />
  </div>
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