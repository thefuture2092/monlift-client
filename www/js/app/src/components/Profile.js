/** @jsx React.DOM */


define(['jquery', 'react', 'app/monlift', 'components/buttons'], function($, React, monlift, buttons){
                ML = monlift.getInstance();
				var myInfosButton = buttons.MyInfosButton;
				var myCarsButton = buttons.MyCarsButton;
                
                return {
                
                	DriverProfile: React.createClass({displayName:'DriverProfile',
                	render: function(){
                	        return (
                	        
                	        <div className="content_Driver_Profil">
                	        
                	          <div id="box">
                	               <div id="topleft">
								   		<myInfosButton image = "img/profil.png"   id="profil" href="#"  event= "ui.showMyInfospage"/>
                	                              <h5 id="MyInfos">My Infos</h5>
                	               </div>
                	               
                	               <div id="topright">
                	                    <img src="img/addlift.png"   height="30" weight="30" id="addlift" href="" />
                	                              <h5 id="MyAutos">My Cars</h5>
                	               </div>
                	               
                	               <div id="bottomleft">
                	                    <img src="img/Alert.png"   height="30" weight="30" id="Alert" href="" />
                	                              <h5 id="MyAlerts">My Alerts</h5>
                	                              
                	                   </div>
                                <div id="bottomright">
                                     <img src="img/reviews.png"   height="30" weight="30"  id ="rev"  href="" />
                                             <h5 id="MyReviews">My Reviews</h5>
                                </div>

                           </div>
                        </div>
                    );
                                               
               }
                
          }),
                
        
        
           PassengerProfile: React.createClass({displayName:'PassengerProfile',
                	render: function(){
						
               
                	        return (
								
								<div className="content_Passanger_Profil">
                                        <div id="box">
                                          
										  <div id="topleft">
										  	
                                            <myInfosButton  event= {(ML.isUserLoggedIn())?"ui.showMyInfospage":"ui.showLoginPage"}  />
                                            
                                          </div>
                                        
										<div id="topright">
                                         	<myCarsButton  event= "ui.showMyCarspage"  />
                                           
                                        </div>

                                        <div id="bottomleft">
                                         	<img src="img/Alert.png"   height="30" weight="30" id="Alert" href="" />
                                         	<h5 id="MyAlerts">My Alerts</h5>
                                        </div>
									
                                      </div>

                                    </div>        

                   );
                                               
               }
                
          })
                   
      }

})
