import {rentalDetailsList, rentalList} from "./rentalApiMockData";
const rentalsBaseUrl = "http://localhost:3000/api/rentals"

export function getRentalsApiCall() {
    const promise = fetch(rentalsBaseUrl);
    return promise;
}

export function getRentalByIdApiCall(rentalId) {
    // const rental = rentalDetailsList.find(rental => rental._id === rentalId)
    const promise = fetch(`${rentalsBaseUrl}/${rentalId}`)
    return promise;
}

export function addRentalApiCall(rental) {
    const rentalString = JSON.stringify(rental);
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: rentalString
    };
    const promise = fetch(rentalsBaseUrl, options);
    return promise;
}

export function updateRentalApiCall(rentalId, rental) {
    const rentalString = JSON.stringify(rental);
    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: rentalString
    };
    const promise = fetch(`${rentalsBaseUrl}/${rentalId}`, options);
    return promise;
}