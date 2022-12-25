export const rentalList = [
    {
        "_id": 1,
        "startDate": "2022-09-22T00:00:00.000Z",
        "endDate": "2022-10-01T00:00:00.000Z",
        "client": {
            "_id": 1,
            "firstName": "Siemowit",
            "lastName": "Blanek",
            "email": "siema.wit@gmail.com",
            "solvency": true,
        },
        "record": {
            "_id": 1,
            "recordName": "Bleach",
            "artistName": "Nirvana",
            "price": 14.00,
            "unit": 8,
        }
    },
    {
        "_id": 2,
        "startDate": "2022-10-04T00:00:00.000Z",
        "endDate": null,
        "client_id": 3,
        "record_id": 2,
        "client": {
            "_id": 3,
            "firstName": "Pankracy",
            "lastName": "Pika",
            "email": "pan.pika@gmail.com",
            "solvency": true
        },
        "record": {
            "_id": 2,
            "recordName": "77",
            "artistName": "Talking Heads",
            "price": 17.00,
            "unit": 4,
        }
    },
    {
        "_id": 3,
        "startDate": "2022-10-24T00:00:00.000Z",
        "endDate": null,
        "client_id": 1,
        "record_id": 3,
        "client": {
            "_id": 1,
            "firstName": "Siemowit",
            "lastName": "Blanek",
            "email": "siema.wit@gmail.com",
            "solvency": true,
        },
        "record": {
            "_id": 3,
            "recordName": "Born in the U.S.A.",
            "artistName": "Bruce Springsteen",
            "price": 15.00,
            "unit": 9,
        }
    }
]

export const rentalDetailsList = rentalList