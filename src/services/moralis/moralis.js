import axios from 'axios';
export const getTokenBalance = async () => {
    const response = await axios.get('https://deep-index.moralis.io/api/v2.2/erc20/0x0D3608CE95Cd2b561298BeeD3F9fd3DDD3083163/price?chain=bsc&include=percent_change', {
        headers: {
            accept: "application/json",
            "X-API-Key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRlM2NlNmQzLTU1NjUtNDA1Ni05YzM0LWQ3MmI0NzcwYmRjYyIsIm9yZ0lkIjoiMzI2NzI1IiwidXNlcklkIjoiMzM1OTIzIiwidHlwZUlkIjoiZjgxOGNmY2EtZjgzNS00YWIxLTg0ZDYtZDE1NzNlYWE1YzM0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODI1MTEwOTgsImV4cCI6NDgzODI3MTA5OH0.-wQrC6G0CBkvMPUqh-IxTYjdt0vApDdxlXfPM2mElnQ",
        },
    }).catch((error)=>{console.log("Error while retreving pair from moralis",error)})
    
    const data = response?.data
    // console.log("Moralis-data", data)
    return data;

};

