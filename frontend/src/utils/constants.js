const configApi = {
    url: 'https://api.myplace.nomoredomains.rocks',
    headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
};

export {
    configApi
}