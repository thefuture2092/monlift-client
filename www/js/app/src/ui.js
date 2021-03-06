/** @jsx React.DOM */
define(['jquery','react', 'app/auth', 'app/component','components/forms', 'app/event', 'app/monlift', 'app/exceptions'], function($,React, auth, component, forms, EventProvider, monlift, exceptions){
	 
	 // because JSX component do not understand the "." in forms.X, define a variable for them instead
	ML = monlift.getInstance();
	 console.log(component);
	 var SearchForm = forms.SearchForm;
	 var LoginForm = forms.LoginForm;
	 var RegisterForm = forms.RegisterForm;
	 var AddCarForm = forms.AddCarForm;
	 var HomePage = component.getHomePage();
	 var Header = component.getHeader();
	 var Footer = component.getFooter();
	 var LogOutButton = component.getLogoutButton();
	 var PassengerProfilePage = component.getPassengerProfilePage();
	 var DriverProfilePage = component.getDriverProfilePage();
	 var ParametterPage = component.getParamettersPage();
	 var InfosPage = component.getInfosPage();
	 var CarsListPage = component.getCarsListPage();
	 var RequestAlertPage = component.getRequestAlertPage();
	 var AddLiftPage = component.getAddLiftPage();
	 var AddUsernamePage = component.getAddUsernamePage();
	 var LiftListComponent = component. getLiftListPage();
	 var addCarForm = component.getAddCarPage();
	 var AddFirstCarPage = component.getAddFirstCarPage();
	 var liftDisplaye = component.getliftDisplaye();

	 console.log(Header, HomePage, Footer);
	 
	 
	 UI =  {
 		
		go:function(){
			// implements all ui specific functions here
			
			React.renderComponent(
				<Header page='index' />,
				document.getElementById('header')
			);
			
			React.renderComponent(
				<HomePage />,
				document.getElementById('app-body')
			);
			
			React.renderComponent(
				<Footer />,
				document.getElementById('footer')
			);
			
		},
		
		showAddCarFormPage : function()
		{
			React.renderComponent(
				<Header page='Add Cars' />,
				document.getElementById('header')
			);
			
			React.renderComponent(
				<addCarForm/>,
				document.getElementById('app-body')
			);
		},

		showAddFirstCarPage : function () {
			ML.loginRequired();
			
			React.renderComponent(
				<Header page ='Add a car'/>,
				document.getElementById('header')
			);
			
			React.renderComponent(
				<AddFirstCarPage />,
				document.getElementById('app-body')
			);
		},

		showAddLiftPage : function (){
			ML.loginRequired();
		
			console.log("iscurrentUserDriver() : " + ML.isCurrentUserDriver()); 
			if(!ML.isCurrentUserDriver()) {
				try {
					UI.showAddUsernamePage();
					EventProvider.subscribe('ML.userPromoted', ML.bind(UI, 'showAddFirstCarPage'));
					return;
				}catch(e) {
					if(e instanceof exceptions.PageAccessDeniedException) {
						// this case cannot really happen here but ignore it anyway
					}
					else {
						throw e;
					}
				}
			}
			
			if(!ML.userHasCar()) {
				UI.showAddFirstCarPage();
				EventProvider.subscribe('ML.carCreated', ML.bind(UI, 'showAddLiftPage'));
				return;
			}
			
			React.renderComponent(
				<Header page ='New Lift'/>,
				document.getElementById('header')
			);
			
			React.renderComponent(
				<AddLiftPage/>,
				document.getElementById('app-body')
			);
		},

		showAddUsernamePage : function () {
			ML.loginRequired();
			if(ML.isCurrentUserDriver()) {
				throw new exceptions.PageAccessDeniedException("User is already a driver");
			}
			
			React.renderComponent(
				<Header page ='Add a username'/>,
				document.getElementById('header')
			);
			
			React.renderComponent(
				<AddUsernamePage />,
				document.getElementById('app-body')
			);
			
		},

		showDriverProfilePage: function()
		{	
			ML.loginRequired();
			React.renderComponent(
				<Header page='Profil' />,
				document.getElementById('header')
			);
			React.renderComponent(
				<DriverProfilePage />,
				document.getElementById('app-body')
			);

		},

		showEditUserInfos: function()
		{
			React.renderComponent(
				<Header page='Edite Infos' />,
				document.getElementById('header')
			);
			
			React.renderComponent(
				<EditeUserInfos/>,
				document.getElementById('app-body')
			);
			
		},	


		showProfilePage: function()
		{	
			ML.loginRequired();
			
			console.log("iscurrentUserDriver() : " + ML.isCurrentUserDriver()); 
			if(ML.isCurrentUserDriver()) {
				try {
					UI.showDriverProfilePage();
					EventProvider.subscribe('ML.iscurrentUserDriver()', ML.bind(UI, 'showDriverProfilePage'));
					return;
				}catch(e) {
					if(e instanceof exceptions.PageAccessDeniedException) {
						
					}
					else {
						throw e;
					}
				}
			}
			React.renderComponent(
				<Header page='Profil' />,
				document.getElementById('header')
			);
			React.renderComponent(
				<PassengerProfilePage />,
				document.getElementById('app-body')
			);

		},		
		showHomePage: function()
		{	
			React.renderComponent(
				<Header page='Home' />,
				document.getElementById('header')
			);
			
			React.renderComponent(
				<HomePage />,
				document.getElementById('app-body')
			);
		},

		showLiftDisplay:function(){
			
			React.renderComponent(
				<Header page='liftDisplay' />,
				document.getElementById('header')
			);
			React.renderComponent(
				<liftDisplaye/>,
				document.getElementById('app-body')
			);
		},
		
		showLiftsListPage:function(){
			ML.loginRequired();
			React.renderComponent(
				<Header page='Rides offered' />,
				document.getElementById('header')
			);
			React.renderComponent(
				<LiftListComponent/>,
				document.getElementById('app-body')
			);
		},

		showMyCarspage:function()
		{
			ML.loginRequired();
			React.renderComponent(
			<Header page='Cars' />,
				document.getElementById('header')
			);
			React.renderComponent(
				<CarsListPage />,
				document.getElementById('app-body')
			);
		},

		showMyInfospage:function()
		{
			ML.loginRequired();
			React.renderComponent(
			<Header page='Infos' />,
				document.getElementById('header')
			);
			React.renderComponent(
				<InfosPage />,
				document.getElementById('app-body')
			);
		},

		showParametterPage: function()
		{	
			React.renderComponent(
				<Header page='Parametters' />,
				document.getElementById('header')
			);
			React.renderComponent(
				<ParametterPage />,
				document.getElementById('app-body')
			);
				
		},
		
		showRequestALert:function(){
			ML.loginRequired();

			React.renderComponent(
				<Header page='Request' />,
				document.getElementById('header')
			);
			React.renderComponent(
				<RequestAlertPage/>,
				document.getElementById('app-body')
			);
		}
		
		 
	 }
	 
	 EventProvider.subscribe('auth.login', UI.showHomePage);
	 EventProvider.subscribe('ui.showHomePage', UI.showHomePage);
	 EventProvider.subscribe('auth.logout', UI.showHomePage);
	 EventProvider.subscribe('ui.showLoginPage', UI.showLoginPage);
	 EventProvider.subscribe('ui.showRegisterPage', UI.showRegisterPage);
	 EventProvider.subscribe('ui.showProfilePage', UI.showProfilePage);
	 EventProvider.subscribe('ui.showParametterPage', UI.showParametterPage);
	 EventProvider.subscribe('ui.showMyInfospage', UI.showMyInfospage);
	 EventProvider.subscribe('ui.showMyCarspage', UI.showMyCarspage);
	 EventProvider.subscribe('ui.showRequestALert', UI.showRequestALert);
	 EventProvider.subscribe('ui.showAddLiftPage', UI.showAddLiftPage);
	 EventProvider.subscribe('ui.showSearchPage', UI.showSearchPage);
	 EventProvider.subscribe('ui.showLiftsListPage', UI.showLiftsListPage);
	 EventProvider.subscribe('ui.showAddCarFormPage', UI.showAddCarFormPage);
	 EventProvider.subscribe('ui.showEditUserInfos', UI.showEditUserInfos);
	 EventProvider.subscribe('ui.showLiftDisplay', UI.showLiftDisplay);
	
	 
	
	 return UI;
 	
 });
