import {rentalDetailsList, rentalList} from "./rentalApiMockData";

export function getRentalsApiCall() {
    return rentalList;
}

export function getRentalByIdApiCall(rentalId) {
    const rental = rentalDetailsList.find(rental => rental._id === rentalId)
    return rental;
}