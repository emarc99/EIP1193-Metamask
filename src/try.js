const btn = document.getElementById('btn');

const ethereum = window.ethereum

btn.addEventListener('click', async () => {
    if(typeof ethereum !== 'undefined') {

        const response = await ethereum.request({
            method: 'eth_requestAccounts',
        })

        console.log(response)
    }
})