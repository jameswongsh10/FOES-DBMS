import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import './assetAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';

const AssetAddNew = () => {
  const token = useSelector(state => state.auth.tokenId)
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

  const [customColumn, setCustomColumn] = useState([]);

  let inputArr = customColumn;
  const listRef = useRef([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getAssetColumns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "getAssetColumns", "asset_tag_number", "physical_check", "item", "description", "serial_no", "year_purchased", "warranty", "quantity", "location", "original_cost", "condition_of_asset", "end_user", "grant", "brand", "model_no", "remark", "created_at", "updated_at"]
        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      });
  }, [token]);

  const onCustomColumnAddHandler = () => {
    fetch(`http://127.0.0.1:8000/api/getAssetColumns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filters = ["id", "getAssetColumns", "asset_tag_number", "physical_check", "item", "description", "serial_no", "year_purchased", "warranty", "quantity", "location", "original_cost", "condition_of_asset", "end_user", "grant", "brand", "model_no", "remark", "created_at", "updated_at"]
        setCustomColumn((data.column).filter((column) => !filters.includes(column)));
      });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const jsonObject = {
      "physical_check": phsycialCheckInput.current.value,
      "asset_tag_number": assetTagNumberInput.current.value,
      "item": itemInput.current.value,
      "description": descriptionInput.current.value,
      "serial_no": serialNoInput.current.value,
      "year_purchased": yearPurchasedInput.current.value,
      "warranty": warrantyInformationInput.current.value,
      "quantity": quantityInput.current.value,
      "original_cost": originalCostInput.current.value,
      "condition_of_asset": conditionOfAssetInput.current.value,
      "grant": grantInput.current.value,
      "brand": brandInput.current.value,
      "model_no": modelNoInput.current.value,
      "remark": remarkInput.current.value,
      "location": locationInput.current.value,
      "end_user": endUserInput.current.value
    };

    listRef.current.forEach(el => {
      if (el.value) {
        jsonObject[`${el.name}`] = el.value;
      }
    })

    fetch('http://127.0.0.1:8000/api/createAsset', {
      method: 'POST',
      body: JSON.stringify(jsonObject),
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          navigate('/asset');
          return response.json();
        }
        return Promise.reject(response);
      })
      .catch(response => {
        response.json().then(json => alert(json.message));
      });

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
              <input type="number" name="quantity" min='0' ref={quantityInput} />
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
              <label>Grant (If Any)</label>
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

            <div key='endUser' className="formInput" >
              <label>End User</label>
              <input type="text" name="endUser" ref={endUserInput} />
            </div>

            <div key='conditionOfAsset' className="formInput" >
              <label>Condition of Asset</label>
              <input type="text" name="conditionOfAsset" ref={conditionOfAssetInput} />
            </div>

            <div key='warrantyInformation' className="formInput" >
              <label>Warranty Information (If Any)</label>
              <input type="text" name="warrantyInformation" ref={warrantyInformationInput} />
            </div>

            <div key='remark' className="formInput" >
              <label>Remark</label>
              <input type="text" name="remark" ref={remarkInput} />
            </div>

            {inputArr.map((label, i) => {
              return (
                <div key={label} className="formInput" >
                  <label>{label}</label>
                  <input type="text" name={label} ref={(ref) => (listRef.current[i] = ref)} />
                </div>
              );
            })}

            <Button type='submit'>Send</Button>
          </form>
        </div>
        <div className="addColumnBox">
          <p className='title'>Add Column</p>
          <AddColumn apiEndPoint="addAssetColumn" onCustomColumnAddHandler={onCustomColumnAddHandler}/>
        </div>
      </div>
    </div>
  );
};

export default AssetAddNew;