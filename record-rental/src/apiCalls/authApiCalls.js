const baseUrl = "http://localhost:3000/api/auth";

export function loginApiCall(user) {
    const userString = JSON.stringify(user);
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: userString
    }
    const promise = fetch(`${baseUrl}/login`, options);
    return promise;
}