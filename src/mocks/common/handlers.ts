import {HttpResponse, http} from 'msw'

let automationStatus = { isAllowed: false };

export const handlers = [

  // Mocks HTTP Base Services
  http.get('/test-success', () => {
    return HttpResponse.json({
      message: 'Hello World',
    })
  }),
  http.get('/test-error-401', () => {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Not authorized',
    })
  }),
  http.get('/test-error-403', () => {
    return new HttpResponse(null, {
      status: 403,
      statusText: 'Forbidden',
    })
  }),
  http.get('/test-error-404', () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }),
  http.get('/test-error-500', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Server Error',
    })
  }),
  http.get('/test-error-301', () => {
    return new HttpResponse(null, {
      status: 301,
      statusText: 'Network Error',
    })
  }),
/*  http.get('/automationStatus', async () => {
      return HttpResponse.json({
        isAllowed: true,
      })
    }),
    http.put('/automationStatus', async () => {
        return HttpResponse.json({
            isAllowed: true,
        })
    }),*/
  http.post('/test-error-422', () => {
    return HttpResponse.json({
      errors: [
        {
          msg: 'jobTemplateName must be provided',
          param: 'jobTemplateName',
          location: 'body',
        },
        {
          value: 'Test_Automation',
          msg: 'Automation Test_Automation already exists',
          param: 'automaton',
          location: 'body',
        },
      ],
    }, {
      status: 422,
    })
  }),

    /* Automation Status */
    http.get('/automationStatus', async () => {
        return HttpResponse.json(automationStatus);
    }),

    http.put('/automationStatus', async ({ request }) => {
        let parsedRequest: any = {};

        try {
            parsedRequest = await request.json();
        } catch (error) {
            // if there's a problem with getting the JSON, send a 400 error with a message
            return HttpResponse.json({ error: 'Invalid JSON in request' }, { status: 400 });
        }

        const { isAllowed } = parsedRequest;

        if (typeof isAllowed !== 'boolean') {
            // if isAllowed is not a boolean, send a 400 error with a message
            return HttpResponse.json({ error: 'Invalid value for isAllowed' }, { status: 400 });
        }

        automationStatus = { isAllowed };
        return HttpResponse.json(automationStatus);
    }),
]
