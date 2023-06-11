const configApi = {
    baseUrl: "https:myplace.nomoredomains.rocks",
    headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
}

export {
    configApi
}