export const formatDateFromISOStringToLocaleString = (ISOString: string) => {
    const dateInMs = Date.parse(ISOString);
    const formatedDate = new Date(dateInMs).toLocaleString();
    return formatedDate;
};
