import { http, HttpResponse } from 'msw';
const bookingInfo = {
  "active": true,
"id": "STR8966APMU",
"lanes": "1",
"people": "1",
"price": 220,
"shoes": ["37"],
"when": "2024-05-30T13:47"
}




export const handlers = [
  http.get('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', (req, res, ctx) => {
    const response = new HttpResponse();
    response.status = 200;
    response.body = {bookingInfo
     
    };
    return response;
  }),

  http.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', () => {
    return HttpResponse.json(bookingInfo);
       
      })
 
];
