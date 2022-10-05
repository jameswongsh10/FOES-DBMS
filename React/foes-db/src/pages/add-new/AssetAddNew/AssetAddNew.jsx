import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import './assetAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';

const AssetAddNew = () => {
  const navigate = useNavigate();

  const phsycialCheckInput = useRef(null);
  const itemInput = useRef(null);
  const descriptionInput = useRef(null);
  const assetTagNumberInput = useRef(null);
  const serialNoInput = useRef(null);
  const quantityInput = useRef(null);
  const locationInput = useRef(null);
  const originalCostInput = useRef(null);
  const grantInput = useRef(null);
  const brandInput = useRef(null);
  const modelNoInput = useRef(null);
  const yearPurchasedInput = useRef(null);
  const endUserInput = useRef(null);
  const conditionOfAssetInput = useRef(null);
  const warrantyInformationInput = useRef(null);
  const remarkInput = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    // listRef.current.forEach(el => {
    //   if (el.value) {
    //     newObj[`${el.name}`] = el.value;
    //   }
    // });
    // fetch(`https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database/${viewCollection}.json`, {
    //   method: 'POST',
    //   body: JSON.stringify(newObj)
    // })
    navigate('/asset');
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="title">
          <p>Asset</p>
        </div>
        <div className="bottom">
          <form onSubmit={submitHandler}>
     
          <div key='physicalCheck' className="formInput" >
              <label>Physical Check</label>
              <input type="text" name="physicalCheck" ref={phsycialCheckInput} />
            </div>
     
          <div key='item' className="formInput" >
              <label>Item</label>
              <input type="text" name="item" ref={itemInput} />
            </div>
     
          <div key='description' className="formInput" >
              <label>Description</label>
              <input type="text" name="description" ref={descriptionInput} />
            </div>
     
          <div key='assetTagNumber' className="formInput" >
              <label>Asset Tag Number</label>
              <input type="text" name="assetTagNumber" ref={assetTagNumberInput} />
            </div>
     
          <div key='serialNo' className="formInput" >
              <label>Serial No.</label>
              <input type="text" name="serialNo" ref={serialNoInput} />
            </div>
     
          <div key='quantity' className="formInput" >
              <label>Quantity</label>
              <input type="text" name="quantity" ref={quantityInput} />
            </div>
     
          <div key='location' className="formInput" >
              <label>Location</label>
              <input type="text" name="location" ref={locationInput} />
            </div>
     
          <div key='originalCost' className="formInput" >
              <label>Original Cost (RM)</label>
              <input type="text" name="originalCost" ref={originalCostInput} />
            </div>
     
          <div key='grant' className="formInput" >
              <label>Grant</label>
              <input type="text" name="grant" ref={grantInput} />
            </div>
     
          <div key='brand' className="formInput" >
              <label>Brand</label>
              <input type="text" name="brand" ref={brandInput} />
            </div>
     
          <div key='modelNo' className="formInput" >
              <label>Model No.</label>
              <input type="text" name="modelNo" ref={modelNoInput} />
            </div>
     
          <div key='yearPurchased' className="formInput" >
              <label>Year Purchased</label>
              <input type="text" name="yearPurchased" ref={yearPurchasedInput} />
            </div>
     
          <div key='conditionOfAsset' className="formInput" >
              <label>Condition of Asset</label>
              <input type="text" name="conditionOfAsset" ref={conditionOfAssetInput} />
            </div>
     
          <div key='warrantyInformation' className="formInput" >
              <label>Warranty Information</label>
              <input type="text" name="warrantyInformation" ref={warrantyInformationInput} />
            </div>
     
          <div key='remark' className="formInput" >
              <label>Remark</label>
              <input type="text" name="remark" ref={remarkInput} />
            </div>
     
            <Button type='submit'>Send</Button>
          </form>
        </div>
        <div className="addColumnBox">
          <p className='title'>Add Column</p>
          <AddColumn />
        </div>
      </div>
    </div>
  );
};

export default AssetAddNew;