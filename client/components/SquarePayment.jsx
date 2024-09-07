import React, { useEffect, useRef } from "react";

export default function SquarePayments() {
  const cardContainerRef = useRef(null);
  const paymentStatusContainerRef = useRef(null);

  useEffect(() => {
    const loadSquareScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const initializeSquarePayments = async () => {
      await loadSquareScript();

      const payments = window.Square.payments(
        "sandbox-sq0idb-mBUVLyBI8U6mZHPdKSeO-g", // Replace with your Square Application ID
        "L4EYF3X4PCVM5" // Replace with your Square Location ID
      );

      const card = await payments.card();
      await card.attach("#card-container");

      document
        .getElementById("card-button")
        .addEventListener("click", async () => {
          try {
            const result = await card.tokenize();
            if (result.status === "OK") {
              console.log(`Payment token is ${result.token}`);
              paymentStatusContainerRef.current.innerHTML =
                "Payment Successful";
              await handleToken(result.token);
            } else {
              let errorMessage = `Tokenization failed with status: ${result.status}`;
              if (result.errors) {
                errorMessage += ` and errors: ${JSON.stringify(result.errors)}`;
              }
              throw new Error(errorMessage);
            }
          } catch (e) {
            console.error(e);
            paymentStatusContainerRef.current.innerHTML = "Payment Failed";
          }
        });
    };

    initializeSquarePayments();

    return () => {
      // Cleanup any event listeners or resources if necessary
      const cardButton = document.getElementById("card-button");
      if (cardButton) {
        cardButton.removeEventListener("click", handleToken);
      }
    };
  }, []);

  const handleToken = async (token) => {
    try {
      const response = await fetch("/api/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = await response.json();
      console.log("Payment result:", result);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div id="payment-form">
      <div ref={paymentStatusContainerRef} id="payment-status-container"></div>
      <div id="card-container"></div>
      <button id="card-button" type="button">
        Pay
      </button>
    </div>
  );
}
