// check email helper function
export const checkEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email.toLowerCase());
}

// check name helper function
export const checkName = (name) => {
    const regex = /^[a-z ,.'-]+$/i;
    return regex.test(name);
}

// format prices
export const formatPrice = (price) => {
    price = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2}).format(price);

    return price;
}