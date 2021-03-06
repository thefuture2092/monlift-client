/** @jsx React.DOM */
define(['jquery', 'react', 'app/monlift', 'app/auth', 'app/event','components/buttons'], function($, React, monlift, auth, EventProvider,buttons){
	 
	 ML = monlift.getInstance();
	 
	 
	 
	 var selectCAr  = buttons.selectCAr;
	 return {
 		
		LoginForm:React.createClass({displayName:'LoginForm',
			
			getInitialState: function() {
    			return {errorMessage: ''};
  			},
			
			loginFailed: function(message){
				console.log("loginFailed called with message: ");
				console.log(arguments);
				this.setState({errorMessage:message});
			},
			
			validateForm: function(email, password){
				var missing_fields = [];
				
				if(!email)
				{
					missing_fields.push("email");
				}
				if(!password)
				{
					missing_fields.push("password");
				}
				
				if(missing_fields.length == 0)
					return true;
				if(missing_fields.length == 1)
					var message = "The value for field \"" + missing_fields[0] +" is missing";  
				else
					var message = "The values for fields \"" + missing_fields.toString() + " are missing";
				this.setState({errorMessage:message});
				return false;
			},
			
			handleSubmit:function(e){
				e.preventDefault();
				var email = this.refs.email.getDOMNode().value;
				var password  = this.refs.password.getDOMNode().value;
				if(this.validateForm(email, password))
				{
					auth.login(email, password);
				}
			
			},
			
			componentWillUnmount: function(){
				EventProvider.clear('auth.loginFailed');
			},
			
			componentDidMount: function(){
				var that = this;
				EventProvider.subscribe('auth.loginFailed', ML.bind(that, 'loginFailed'));
			},
			
			render: function(){
				return (
				<div className = "card1">
					<form id = "login-form"  className = "form-horizontal" onSubmit= {this.handleSubmit} >
						{this.state.errorMessage? <p>{this.state.errorMessage} </p>:''}
						
						<input type ="email" className="input-xlarge" id="email" name="email" placeholder="Email" ref= "email" required />
						<input type="password" className ="form-control" placeholder="Password" ref = "password" required />
                		<label className="checkbox pull-left">
                		<input type="checkbox" value="remember-me" />
                 				Remember me
                		</label>
                		<a href="#" className="pull-right need-help">Need help? </a>
						<span className="clearfix"></span>
                		<button className="btn btn-primary btn-block" type = "submit">Sign in</button>
						
            		</form> 
                </div>	
				);
			}
		
		}),
		
		RegisterForm: React.createClass({displayName:'RegisterForm', 
			
			handleSubmit: function(e){
				e.preventDefault();
				var firstname = this.refs.firstname.getDOMNode().value;
				var lastname = this.refs.lastname.getDOMNode().value;
				var email = this.refs.email.getDOMNode().value;
				var password = this.refs.password.getDOMNode().value;
				var phone = this.refs.phone.getDOMNode().value;
				if(this.validateForm(firstname, lastname, email, password, phone))
				{
					auth.register(firstname, lastname, email, password, phone);
				}
			},
			validateForm: function(firstname, lastname, email, password, phone)
			{
				var missing_fields = [];
				if(!firstname)
					missing_fields.push("firstname");
				if(!lastname)
					missing_fields.push("lastname");
				if(!email)
					missing_fields.push("email");
				if(!password)
					missing_fields.push("password");
				if(!phone)
					missing_fields.push("phone");
					
				if(missing_fields.length == 0)
					return true;
				if(missing_fields.length == 1)
					var message = "The value for field \"" + missing_fields[0] +" is missing";  
				else
					var message = "The values for fields \"" + missing_fields.toString() + " are missing";
				this.setState({errorMessage:message});
				return false;
			},
			registrationFailed: function(message)
			{
				console.log("RegistrationFailed called with message: ");
				console.log(arguments);
				this.setState({errorMessage:message});
			},
			
			getInitialState: function() {
    			return {errorMessage: ''};
  			},
			
			componentWillUnmount: function(){
				var that = this;
				EventProvider.clear('auth.registerFailed');
			},
			
			componentDidMount: function(){
				var that = this;
				EventProvider.subscribe('auth.registerFailed', ML.bind(that, 'registrationFailed'));
			},
			render: function(){
				
				return (
					<form id="register" className="form-horizontal" onSubmit={this.handleSubmit}>
						{this.state.errorMessage? <p>{this.state.errorMessage} </p>:''}
						<div className = "card">
						<div className="control-group">
							<div className="controls">
								<div className="input-prepend">
									<span className="add-on"><i className="icon-user"></i> </span>
									<input type="text" className="input-xlarge" id="fname" name="fname" placeholder="First Name" ref="firstname" required/>
								</div>
							</div>
						</div>
						<div className="control-group ">
							<div className="controls">
								<div className="input-prepend">
									<span className="add-on"><i className="icon-user"></i></span>
									<input type="text" className="input-xlarge form-control" name="lname" placeholder="Last Name" ref="lastname" required />
								</div>
							</div>
						</div>
						<div className="control-group">
							<div className="controls">
								<div className="input-prepend">
									<span className="add-on"><i className="icon-envelope"></i></span>
									<input type="email" className="input-xlarge" id="email" name="email" placeholder="Email" ref="email" required />
								</div>
							</div>
						</div>
			
						<div className="control-group">
							<div className="controls">
								<div className="input-prepend">
									<span className="add-on"><i className="icon-lock"></i></span>
									<input type="Password" className="input-xlarge" name="password" ref="password" required placeholder="Password" />
								</div>
							</div>
						</div>
								
						<div className="control-group">
							<div className="controls">
								<div className="input-prepend">
									<span className="add-on"><i className="icon-lock"></i></span>
									<input type="text" className="input-xlarge" name="phone" ref="phone" placeholder="Your phone number" required />
								</div>
							</div>
						</div>
						
						<div className="control-group">
							<label className="control-label"></label>
							<div className="controls">
								<button type="submit" className="btn btn-primary btn-block">Create My Account</button>
							</div>
						</div>
						</div>
	  				</form>

				);
			}
		}),
		
		ToDriverForm: function(){
			
		},
		
		addLiftForm : React.createClass({displayName:'addliftFromForm',
		
			getInitialState: function() {
    			return {errorMessage: ''};
  			},
			
			createCarFailed: function(message){
				console.log("addLiftFailed called with message: ");
				console.log(arguments);
				this.setState({errorMessage:message});
			},
			handleSubmit: function(e){
				e.preventDefault();
				var from = this.refs.from.getDOMNode().value;
				var to = this.refs.to.getDOMNode().value;
				var time = this.refs.time.getDOMNode().value +":00";
				var price = this.refs.price.getDOMNode().value;
				var meetingPlace = this.refs.meetingPlace.getDOMNode().value;
				var totalPlace = this.refs.totalPlace.getDOMNode().value;
				var car = this.refs.car.getDOMNode().value;
				console.log("ce que je recupere du temp" + time);
				if(this.validateForm(from, to, time,price, meetingPlace, totalPlace, car))
				{
					ML.createLift( from, to, time, price, meetingPlace, totalPlace, car)
					console.log(" ce que je recois du select est " + car);
				
				}
			},
			componentWillUnmount: function(){
				EventProvider.clear('ML.createLiftFailed');
			},
			
			componentDidMount: function(){
				var that = this;
				EventProvider.subscribe('ML.createLiftFailed', ML.bind(that, 'createLiftFailed'));
			},
			validateForm: function(from, to, time, price, meetingPlace, totalPlace, car)
			{
				var missing_fields = [];
				if(!from)
					missing_fields.push("from");
				if(!to)
					missing_fields.push("to");
				if(!time)
					missing_fields.push("time");
				if(!price)
					missing_fields.push("price");
				if(!meetingPlace)
					missing_fields.push("meetingPlace");
				if(!totalPlace)
					missing_fields.push("totalPlace");
				if(!car)
					missing_fields.push(car);
					
				if(missing_fields.length == 0)
					return true;
				if(missing_fields.length == 1)
					var message = "The value for field \"" + missing_fields[0] +" is missing";  
				else
					var message = "The values for fields \"" + missing_fields.toString() + " are missing";
				this.setState({errorMessage:message});
				return false;
			},
			
		
		render:function(){
			//var cars = ML.getUserCars();
			console.log(this.props.cars);
			return(
			 			
						<form  className="input-group" id ="fromFormInfo" onSubmit={this.handleSubmit}>
							
							<div className="control-group">
								<div className="controls">
									<input type="text" placeholder=	"Départ" ref="from" required/>
								</div>
							</div>
							
							<div className="control-group">
								<div className="controls">
									<input type="text" placeholder="Arrivée" ref="to" required/>
								</div>
							</div>
							
							<div className="control-group">
								<div className="controls">
									<input type="datetime-local" placeholder="Heure" ref="time" required/>
								</div>
							</div>
							
							<div className="control-group">
								<div className="controls">
									<input type="number" placeholder="Prix en $ CAD" ref="price" required/>
								</div>
							</div>
							
							<div className="control-group">
								<div className="controls">
									<input type="text" placeholder="Lieu de Départ" ref="meetingPlace" required/>
								</div>
							</div>
							

							<div className="control-group">
								<div className="controls">
									<input type="number" placeholder="Nombre de place" ref="totalPlace" required/>
								</div>
							</div>
							
							<div className="control-group">
								<div className="controls">
									<select className="" ref = "car" name = "car" required >
										{
											this.props.cars.map(function(car, i){
												return <option value = {car.id}> {car.name} </option>;
											})
										}

									</select>
								</div>
							</div>
							                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
							<div className = "control-group submit-button">
								<div className = "controls">			 
									<button type="submit" className="btn btn-primary btn-block ">Publier</button>
								</div>
							</div>	
						</form>
						
					
			);
			
		}
		}),
		
		

		AddCarForm : React.createClass({displayName:'addliftCarForm',
			getInitialState: function() {
    			return {errorMessage: ''};
  			},
			
			createCarFailed: function(message){
				console.log("addCarFailed called with message: ");
				console.log(arguments);
				this.setState({errorMessage:message});
			},
			
			handleSubmit:function(e){

				e.preventDefault();
				var name = this.refs.name.getDOMNode().value;
				var matricule = this.refs.matricule.getDOMNode().value;
				var description = this.refs.description.getDOMNode().value;

				console.log(name + " " + matricule + " " + description);
				if(this.validateForm(matricule))
				{
					ML.createCar(name, matricule, description);
					
				}
				console.log(ML._cars);	
			},
			
			componentWillUnmount: function(){
				EventProvider.clear('ML.createCarFailed');
			},
			
			componentDidMount: function(){
				var that = this;
				EventProvider.subscribe('ML.createCarFailed', ML.bind(that, 'createCarFailed'));
			},
			// Rework the validate function for add Car
			validateForm : function(matricule) {
				if(!matricule) {
					var message = "The matricule is required";
					this.setState({errorMessage:message});
					return false;
				}
				
				return true;
			},
			
			render:function(){
				return(
					<form  id ="fromCarInfo" className="input-group" onSubmit = {this.handleSubmit}>
						{this.state.errorMessage? <p>{this.state.errorMessage} </p>:''}
						<div className = "control-group">
							<div className = "controls">
								<input type = "text" name = "name" ref = "name" placeholder = "Name" required />
							</div>
						</div>
						
						<div className = "control-group">
							<div className = "controls">
								<input type = "text" name = "matricule" ref = "matricule" placeholder = "Matricule" required/>
							</div>
						</div>
						
						<div className = "control-group">
							<div className = "controls">

								<textarea rows = "4" name = "description" ref = "description" placeholder = "Add car description like color, year or stuff like that here"></textarea>

							</div>
						</div>
						
						<div className = "control-group submit-button">
							<div className = "controls">
								<button type = "submit" className = "btn btn-primary btn-block ">Add car</button>
							</div>
						</div>
							

					</form>				
				);
			
			}
		}),

		
		AddUsernameForm: React.createClass({displayName: "UserName Form",
			
			getInitialState: function() {
    			return {errorMessage: ''};
  			},
			
			promoteFailed: function(message){
				console.log("promoteFailed called with message: ");
				console.log(arguments);
				this.setState({errorMessage:message});
			},
			
			handleSubmit:function(e){
				e.preventDefault();
				var username = this.refs.username.getDOMNode().value;
				console.log(username);
				if(this.validateForm(username))
				{
					ML.promoteUserToDriver(username);
				}
					
			},
			
			componentWillUnmount: function(){
				EventProvider.clear('ML.promoteUserFailed');
			},
			
			componentDidMount: function(){
				var that = this;
				EventProvider.subscribe('ML.promoteUserFailed', ML.bind(that, 'promoteFailed'));
			},
			validateForm : function(username) {
				if(!username) {
					var message = "The username is required";
					this.setState({errorMessage:message});
					return false;
				}
				
				return true;
			},
			
			render:function() {
				
				return(
					
					<form id = "UserNameForm" className = "input-group" onSubmit= {this.handleSubmit}>
						{this.state.errorMessage? <p>{this.state.errorMessage} </p>:''}
						<div className = "control-group">
							<div className = "controls">
								<input type = "text" name = "username" ref = "username" placeholder = "Add your driver username here" />
							</div>
						</div>
						
						<div className = "control-group submit-button">
							<div className = "controls">
								<button type = "submit" className="btn btn-primary btn-block">Next <span className="icon icon-right"></span> </button>
							</div>
						</div>
						
					</form>
				);
			}
		}),
		
		SearchForm : React.createClass({displayName:'SearchForm',
			render: function(){
				return (
					<div className = "card">
					<form id="search-form" className = "input-group">
						
							<input type="text" name="from-place" placeholder="From" />
							<input type="text" name="to-place" placeholder="To" />
							<div className="more-option">
								<span className="icon icon-caret">
									more options
								</span>
							</div>
						
						
							<button className="btn btn-primary btn-block">Search</button>
						
						
                    </form>
					</div>
					
				);
			}
		
		})
		 
	 }
 	
 })