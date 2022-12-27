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