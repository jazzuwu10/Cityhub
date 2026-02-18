import axios from "axios";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const RazorpayButton = ({ amount }) => {
  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // call backend
    const order = await axios.post("http://localhost:5000/create-order", {
      amount: amount,
    });

    const options = {
      key: "rzp_test_xxxxxxxxx", // YOUR KEY ID
      amount: order.data.amount,
      currency: order.data.currency,
      name: "CityHub",
      description: "Booking Payment",
      order_id: order.data.id,

      handler: function (response) {
        alert("Payment Successful 🎉\nPayment ID: " + response.razorpay_payment_id);
      },

      prefill: {
        name: "Jasmin",
        email: "test@email.com",
        contact: "9999999999",
      },

      theme: {
        color: "#4f46e5",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button onClick={displayRazorpay} style={{
      padding: "12px 24px",
      background: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px"
    }}>
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
