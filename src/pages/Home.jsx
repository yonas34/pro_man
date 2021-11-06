import { CDBCard, CDBCardBody } from 'cdbreact'
import React from 'react'
import Sidebar from '../component/Sidebar'
import styled from 'styled-components'





const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`; 
export default function Home() {
   


    return (
        <GridWrapper style={{marginLeft:"10%"}}>
        <CDBCard >
<CDBCardBody>
    home
</CDBCardBody>

        </CDBCard>
        </GridWrapper>
    )
}
