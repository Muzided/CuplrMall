import axios from 'axios'
export const getCuplrInDollar = async ({ setTokenPriceInUsd }) => {
    axios.get(`${process.env.REACT_APP_API_BASEURL}api/get-coin-value`).then((res) => {
        console.log('ace', res?.data?.coinValue)

        setTokenPriceInUsd(res?.data?.coinValue)
    }).catch((err) => { console.log("error white reterving cuplr amount in dollar from api :", err) })

}

export const saveCuplrTokenPrice = async (value) => {
    const data = {
        "coinAmount": value
    }
    axios.post(`${process.env.REACT_APP_API_BASEURL}api/add-coinvalue`, data).then((res) => {

    }).catch((err) => {
        console.log("error while saving cuplr amount in api :", err)
    })


}
export const saveUser = async ({ userAddress, tokens, received }) => {
    const data = {
        "userAddress": userAddress,
        "tokens": tokens,
        "amountReceived": received
    }
    axios.post(`${process.env.REACT_APP_API_BASEURL}api/add-user`, data).then((res) => {

    }).catch((err) => {
        console.log("error while saving user info in api :", err)
    })


}

export const getSavedUsers = async () => {
 const users = await   axios.get(`${process.env.REACT_APP_API_BASEURL}api/get-users`).then((res) => {
        console.log("res", res)
        const data = res?.data || []
        let result = [];
        for (const items of data) {
            console.log('items',items)

                result.push({
                    "userAddress":items?.userAddress,
                    "tokens":items?.tokens,
                    "amountReceived":items?.amountReceived
                  
                });
            }
            console.log("result",result)
            return result;

    }).catch((err) => {
        console.log("error while getting user info in api :", err)
    })
    return users;


}

export const fundUser = async ({ userAddress, tokens }) => {
    const data = {
        "userAddress": userAddress,
        "tokens": tokens,
    }
    axios.post(`${process.env.REACT_APP_API_BASEURL}api/delete-user`, data).then((res) => {
        console.log("res", res)

    }).catch((err) => {
        console.log("error while getting user info in api :", err)
    })


}