export const environment = {
    production: false,
      secureLs:{
          secret:'secretabc',
          lucky:'EDP_DIV_01272021'
      },
      app: {
          production: false,
          ApiBaseUrl:'http://localhost:64158/',
  
          // PROD
        //   ApiBaseUrl:'https://webapp.ngowhock.co.th/nhcapi/',            // web jwt
  
          /* UAT */
        //   ApiBaseUrl:'http://10.3.1.23:888/OnlineAppointment/',          // web jwt
          
          // DEV
        //   ApiBaseUrl:'http://10.3.1.21:888/OnlineAppointment/',           // web jwt
          
          version: '1.0.0'
      }
  };