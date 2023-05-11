export default async function displayPayment(){
    //simple post the node.js server

    const data = await fetch("http://localhost:4000/razorpay",{
        method: 'POST'
    }).then((t) => t.json())

    const options = {
        key: "rzp_test_0HNVfUdXU1ot3f",
        currency: data.currency,
        amount: data.amount,
        description: 'Wallet Transaction',
        image: 'http://localhost:4000/Resume.jpeg',
        order_id: data.id,
        handler: function(response){
            alert("PAYMENT ID: " + response.razorpay_payment_id)
            alert("ORDER ID: " + response.razorpay_order_id)
        },
        prefill: {
            name: 'GAUTAM SHARMA',
            email: 'geekygautam1997@gmail.com',
            contact: '9418306776'
        }
    };
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}
