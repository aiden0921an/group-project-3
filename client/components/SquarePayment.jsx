import React, { useEffect, useRef } from "react";

export default function SquarePayments() {
  const formRef = useRef(null);
  const paymentForm = useRef(null);

  useEffect(() => {
    // Dynamically load the Square Web Payments SDK
    const script = document.createElement("script");
    script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
    script.async = true;
    script.onload = () => {
      initializeSquarePaymentForm();
    };
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeSquarePaymentForm = () => {
    paymentForm.current = new window.SquarePaymentForm({
      applicationId: "YOUR_APPLICATION_ID", // Replace with your Square Application ID
      inputClass: "sq-input",
      autoBuild: false,
      inputStyles: [
        {
          fontSize: "16px",
          padding: "16px",
          color: "#373F4A",
        },
      ],
      cardNumber: {
        elementId: "card-number",
        placeholder: "Card Number",
      },
      cvv: {
        elementId: "cvv",
        placeholder: "CVV",
      },
      expirationDate: {
        elementId: "expiration-date",
        placeholder: "MM/YY",
      },
      postalCode: {
        elementId: "postal-code",
        placeholder: "ZIP",
      },
      callbacks: {
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            console.log("Encountered errors:", errors);
            return;
          }
          handleNonce(nonce);
        },
      },
    });

    paymentForm.current.build();
  };

  const handleNonce = async (nonce) => {
    try {
      const response = await fetch("/api/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nonce }),
      });
      const result = await response.json();
      console.log("Payment result:", result);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <form ref={formRef} id="payment-form">
      <div id="card-number"></div>
      <div id="expiration-date"></div>
      <div id="cvv"></div>
      <div id="postal-code"></div>
      <button
        type="button"
        onClick={() => paymentForm.current.requestCardNonce()}
      >
        Pay
      </button>
    </form>
  );
}
