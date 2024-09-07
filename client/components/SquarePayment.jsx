import React, { useEffect, useRef } from "react";

export default function SquarePayment() {
  const formRef = useRef(null);
  const paymentForm = useRef(null);

  useEffect(() => {
    // Initialize Square payment form
    const script = document.createElement("script");
    script.src = "https://js.squareup.com/v2/paymentform";
    script.onload = () => {
      paymentForm.current = new window.SqPaymentForm({
        applicationId: "YOUR_APPLICATION_ID",
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
            // Submit nonce to your server
            handleNonce(nonce);
          },
        },
      });

      paymentForm.current.build();
    };
    document.body.appendChild(script);
  }, []);

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
      <div id="sq-card-number"></div>
      <div id="sq-expiration-date"></div>
      <div id="sq-cvv"></div>
      <div id="sq-postal-code"></div>
      <button
        type="button"
        onClick={() => paymentForm.current.requestCardNonce()}
      >
        Pay
      </button>
    </form>
  );
}
