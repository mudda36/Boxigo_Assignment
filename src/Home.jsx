
import { useEffect, useState } from "react";
import '../src/home.css'
import HomeImage from './Images/home (1).png';
import Location from './Images/location-pin.png';
import Calender from './Images/calendar.png';
import RightArrow from './Images/right-arrow (2).png';
import Bricks from './Images/bricks.png';
import Danger from './Images/danger-sign.png';

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [expandedMoveIndex, setExpandedMoveIndex] = useState(null);
  const [expandedRoom, setExpandedRoom] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://test.api.boxigo.in/sample-data/');
        const data = await response.json();
        if (data && data.Customer_Estimate_Flow) {
          setUserData(data.Customer_Estimate_Flow);
        } else {
          setUserData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserData([]);
      }
    };
    fetchData();
  }, []);

  const handleViewMoreDetailsClick = (index) => {
    setExpandedMoveIndex(expandedMoveIndex === index ? null : index);
  };

  const handleRoomClick = (moveIndex, room) => {
    setExpandedRoom(prevState => ({
      ...prevState,
      [moveIndex]: prevState[moveIndex] === room ? null : room
    }));
  };

  return (
    <div className="main1">
      <div className="main2">
        <h2 className="Mymove">My Moves</h2>
        {userData.map((data, index) => {
          // Calculate total quantity with default value of 1
          const calculateTotalQuantity = (inventoryName) => {
            const totalQuantity = data.items.inventory
              .filter(item => item.name === inventoryName)
              .flatMap(item => item.category)
              .flatMap(ele => ele.items)
              .reduce((sum, item) => sum + (item.qty || 1), 0);

            return totalQuantity === 0 ? 1 : totalQuantity;
          };

          const totalFurnitureQuantity = calculateTotalQuantity('furniture');
          const totalElectronicsQuantity = calculateTotalQuantity('electronics');
          const totalFragileQuantity = calculateTotalQuantity('fragile');
          
          // Calculate total of all categories
          const totalCombinedQuantity = totalFurnitureQuantity + totalElectronicsQuantity + totalFragileQuantity;

          // Calculate total bedroom items
          const calculateBedroomTotalQuantity = () => {
            const bedroomItems = [
              {
                id: "1_3",
                order: 3,
                name: "chair",
                displayName: "Chair",
                items: []
              },
              {
                id: "1_4",
                order: 4,
                name: "cot",
                displayName: "Cot",
                items: []
              },
              {
                id: "1_5",
                order: 5,
                name: "mattress",
                displayName: "Mattress",
                items: []
              }
            ];
            return bedroomItems.reduce((sum, item) => sum + 1, 0); 
          };

          const totalBedroomQuantity = calculateBedroomTotalQuantity();

          return (
            <div key={index} className="moves">
              <div className="moves1">
                <div className="movesfrom">
                  <h5 id="from1"><b>From</b></h5>
                  <h6 className="movesfrom1">{data.moving_from}</h6>
                </div>
                <div className="arrowimg">
                    <img id="arrowimg1" src={RightArrow} alt="" />
                </div>
                
                <div className="movesto">
                  <h5 id="moveto01">To</h5>
                  <h6 className="movesto1"> {data.moving_to}</h6>
                </div>
                <div className="request">
                  <h5><b>Request#</b></h5>
                  <h5 id="rqst">{data.estimate_id}</h5>
                </div>
              </div>
              <div className="moves2" >
              <div className="imghome">
               
  <img id="homimg1" src={HomeImage} alt="" />
  <h5 className="data-text1">
 
  {data.property_size}
  </h5>
</div>
<div className="wall">
                    <img id="wall1" src={Bricks} alt="" />
                  <h5 className="data-text2">{data.old_floor_no}</h5>
                </div>

                <div className="imgdistance">
                    <img id="loc1" src={Location} alt="" />
                    
                  <h5 className="data-text3">{data.distance}</h5>
                </div>
                <div className="imgcalendar">
                    <img id="cal1" src={Calender} alt="" />
                  <h5 className="data-text4">{data.moving_on}</h5>
                </div>
                <div className="checkbox1">
                  <input type="checkbox" id={`checkboxId${index}`} name="checkboxName" />
                  <label htmlFor={`checkboxId${index}`}>Is Flexible</label>
                </div>
                <div className="btnveiwdetails">
                  <button className="btn1" onClick={() => handleViewMoreDetailsClick(index)}>
                    {expandedMoveIndex === index ? "View Less Details" : "View More Details"}
                  </button>
                </div>
                <div className="btnawaiting">
                  <button className="btn2">Quotes Awaiting</button>
                </div>
              </div>
              <div>
                
                <div className="moves3">
                    <img id="dangerimg" src={Danger} alt="" />
                <h5>Disclaimer:<p id="disdata1">Please update your move data before two days of shifting</p></h5>
                
              
                </div>
              </div>
              <div className="moves4">
              {expandedMoveIndex === index && (
                <div className="move-details">
                   <div>
                   <h3 id="invedetails">Inventory Details</h3><button id="btn3" >Edit Inventory</button>
                   </div>
                  {['Living Room', 'Bedroom'].map((room) => (
                    <div key={room}>
                        
                      <button id="btn4" onClick={() => handleRoomClick(index, room)}>
                        {room} ({room === 'Bedroom' ? totalBedroomQuantity : totalCombinedQuantity})
                      </button>
                      {expandedRoom[index] === room && (
                        <div className="room-items">
                          {room === 'Bedroom' && (
                            <>
                              
                              {[
                                {
                                  id: "1_3",
                                  order: 3,
                                  name: "chair",
                                  displayName: "Chair",
                                  items: []
                                },
                                {
                                  id: "1_4",
                                  order: 4,
                                  name: "cot",
                                  displayName: "Cot",
                                  items: []
                                },
                                {
                                  id: "1_5",
                                  order: 5,
                                  name: "mattress",
                                  displayName: "Mattress",
                                  items: []
                                }
                              ].map((bedroomItem) => (
                                <div key={bedroomItem.id} className="category">
                                  <h1 className="data5">{bedroomItem.displayName}</h1>
                                  {bedroomItem.items.length > 0 && (
                                    <div className="subcategory">
                                      
                                      {bedroomItem.items.map((item, idx) => (
                                        <div key={idx} className="item-details3">
                                         
                                          {item.typeOptions && item.type.length > 0 && (
                                            <div>
                                              <p>First Type Option:</p>
                                              <p>{item.type[0].option}</p>
                                              <p>Quantity: {item.qty}</p>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </>
                          )}
                          <div className="live">
                          {room === 'Living Room' && (
                            <>
                            
                              {data.items.inventory
                                .filter(inventoryItem => inventoryItem.name === 'furniture')
                                .map((inventoryItem) => (
                                  <div key={inventoryItem.id} className="category1">
                                    <h1 className="funrni">Furniture</h1>
                                    {inventoryItem.category.map((ele) => (
                                      <div key={ele.id} className="subcategory">
                                      
                                        {ele.items.map((item, idx) => (
                                          <div key={idx} className="item-details1">
                                            <h4>{item.displayName}</h4>
                                            {item.typeOptions && item.type.length > 0 && (
                                              <div>
                                                
                                                <p>{item.type[0].option}</p>
                                                <p id="qtydata">{item.qty}</p>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                ))}

                             
                              {data.items.inventory
                                .filter(inventoryItem => inventoryItem.name === 'electronics')
                                .map((inventoryItem) => (
                                  <div key={inventoryItem.id} className="category">
                                    <h1 className="ele1">Electronics</h1>
                                    {inventoryItem.category.map((ele) => (
                                      <div key={ele.id} className="subcategory">
                                       
                                        {ele.items.map((item, idx) => (
                                          <div key={idx} className="item-details2">
                                            <h4>{item.displayName}</h4>
                                            {item.typeOptions && item.type.length > 0 && (
                                              <div>
                                                
                                                <p>{item.type[0].option}</p>
                                                
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                ))}

                             
                              {data.items.inventory
                                .filter(inventoryItem => inventoryItem.name === 'fragile')
                                .map((inventoryItem) => (
                                  <div key={inventoryItem.id} className="category">
                                    <h1>Fragile</h1>
                                    {inventoryItem.category.map((ele) => (
                                      <div key={ele.id} className="subcategory">
                                        <h6>{ele.displayName}</h6>
                                        {ele.items.map((item, idx) => (
                                          <div key={idx} className="item-details">
                                            <h4>{item.displayName}</h4>
                                            {item.typeOptions && item.type.length > 0 && (
                                              <div>
                                                <p>First Type Option:</p>
                                                <p>{item.type[0].option}</p>
                                                <p>Quantity: {item.qty}</p>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                ))}
                            </>
                          )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              </div>
            
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;






























