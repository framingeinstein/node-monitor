var rules = {
	notifications:[
		{rule: ".*", type: "email", to: "jason@framingeinstein.com", pass: false}
	]
	,sites:
	[
		{
			 host:"www.framingeinstein.com"
			,notifications: [
				{rule:"Title.*", type: "email", to: "jason@framingeinstein.com", pass: false}
			]
			,pages:
			 [
				 {
					 path:"/"
					,method: "GET"
					,protocol:"http"
					,interval:10
					,parameters:{}
					,rules:
					 [
						{
							 name:"Title should be"
							,type:"dom"
							,selector:"title"
							,expectation:/^F.*[ ]E.*ns$/
						}
						,{
							 name:"Status"
							,type:"status"
							,expectation:200
						}
					 ]
				}
			 ]
		},
		{
			 host:"www.planwithtan.com"
			,pages:
			 [
				{
					 path:"/"
					,method: "GET"
					,protocol:"http"
					,interval:10
					,parameters:{}
					,rules:
						[
							{
								 name:"Title should be"
								,type:"dom"
								,selector:"title"
								,expectation:"Wholesale Vacation Program | Travel Advantage Network"
							}
							,{
								 name:"Status"
								,type:"status"
								,expectation:200
							}
						]
				}
			 ]
		}
	]
};

module.exports = rules;
