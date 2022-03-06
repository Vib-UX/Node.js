const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches',()=>{
    test('It should respond with 200 success', async ()=>{
        const response = await request(app).get('/launches')
        .expect(200)
        .expect('Content-Type', /json/);
    })
})


describe('Test POST /launch', ()=>{

    const completeData={
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4,2028',
    }

    const datawithoutDate={
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
    }

    const dataWithInvalidDate ={
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'invalid format',
    }

    test('It should respond with 201 created', async ()=>{
        const response = await request(app)
        .post('/launches')
        .send(completeData)
        .expect(201)
        .expect('Content-Type',/json/)
        

        const requestDate = new Date((completeData.launchDate).valueOf());
        const responseDate = new Date((response.body.launchDate).valueOf());

        expect(responseDate).toStrictEqual(requestDate);


        expect(response.body).toMatchObject(datawithoutDate)

    })

    test('It should catch the missing required properties', async()=>{
        const response = await request(app)
        .post('/launches')
        .send(datawithoutDate)
        .expect(400)
        .expect('Content-Type', /json/)

        expect(response.body).toStrictEqual({
            error: 'Missing launch field',
        })

    })
    test('It should catch the invalid dates',async()=>{
        const response = await request(app).post('/launches')
        .send(dataWithInvalidDate)
        .expect(400)
        .expect('Content-Type',/json/)

        expect(response.body).toStrictEqual({
            error: 'Invalid date format',
        })
    })
})