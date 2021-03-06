/** @jsx React.DOM */
/**
 * @author Trispa
 *
 */
define(['jquery', 'react', 'app/monlift'], function($, React, monlift){
	
	ML  = monlift.getInstance();
	var Lift = React.createClass({displayName:'Lift', 
		render: function(){
			
			return (
				<div className="card">
					
  					<li className="table-view-cell media">
 
						<a className="navigate-right" >
						
						  <img className="media-object pull-left" src ={this.props.image} height="70" 	weight="70" />
							<div className="media-body">
							
							{this.props.date}
								<p>De {" "+ this.props.depart} vers{" "+ this.props.arrivee +" "} au prix de {" "+this.props.prix +"."} Conducteur : {this.props.driver} Nombre de place : {this.props.placesdisponible} </p>
						  
						
						 </div>
						 </a>
					</li>
					
				</div>
		)
		}
	});
	
	return Lift;
	
});// JavaScript Document
