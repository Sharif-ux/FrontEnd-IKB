import React from "react";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

export function Path(props){
    const {parent, children} = props
    return<>
    <div style={{padding: "20px 0 0 30px", display: "flex"}}>
<div><h1>{parent}</h1></div>
<div><IoIosArrowRoundForward size={30} style={{paddingBottom: "7px"}}/></div>
<div><h1>{children}</h1></div>
</div></>
}