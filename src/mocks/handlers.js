import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', (req, res, ctx) => {
    const response = new HttpResponse();
    response.status = 200;
    response.body = {
      bookingNumber: '12345',
      total: 500,
      active: true,
    };
    return response;
  }),

  http.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', (req, res, ctx) => {
    return res(
      ctx.json({
        bookingNumber: '12345',
        total: 500,
        active: true,
      })
    );
  }),
];
