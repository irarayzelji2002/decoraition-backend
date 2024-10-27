import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is my subscription account-based or device-based?",
      answer:
        "Your subscription is account-based, so you can access it on multiple devices as long as you're logged in.",
    },
    {
      question:
        "Can I use any photo for the room interior or does it need to meet certain requirements?",
      answer:
        "The photo should be well-lit and clearly show the room's dimensions for the AI to work effectively.",
    },
    {
      question: "What is the difference between the free and paid options?",
      answer:
        "The free option allows limited design ideas, while the paid version includes full access to all design styles and customization features.",
    },
    {
      question:
        "How long does it take for the AI to change the room's interior?",
      answer:
        "It typically takes just a few seconds, depending on the complexity of the room and your internet connection.",
    },
    {
      question:
        "Can I share the images I create using the app on social media?",
      answer:
        "Yes, you can share your creations on social media to showcase your designs!",
    },
    {
      question:
        "Are the styles available for selection limited to a certain number?",
      answer:
        "There are multiple styles available, and the number may vary depending on your subscription plan.",
    },
  ];

  return (
    <div
      style={{
        background: "var(--bg-header)",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="center-me" style={{ margin: "24px" }}>
        <h1 className="navName">Frequently Asked Questions</h1>
        <p>You have questions, we have answers.</p>
      </div>
      <div className="faq-box">
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.question}
                <span className="arrow">&#9660;</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
