import {rentalDetailsList, rentalList} from "./rentalApiMockData";
import {getCurrentUserToken} from "../helpers/authHelper";
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
    const token = getCurrentUserToken();
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: rentalString
    };
    const promise = fetch(rentalsBaseUrl, options);
    return promise;
}

export function updateRentalApiCall(rentalId, rental) {
    const rentalString = JSON.stringify(rental);
    const token = getCurrentUserToken();
    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: rentalString
    };
    const promise = fetch(`${rentalsBaseUrl}/${rentalId}`, options);
    return promise;
}

export function deleteRentalApiCall(rentalId) {
    const token = getCurrentUserToken();
    const options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
    };
    const promise = fetch(`${rentalsBaseUrl}/${rentalId}`, options);
    return promise;
}