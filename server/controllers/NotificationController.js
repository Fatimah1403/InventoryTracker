import sendEmail from "../utils/sendEmail.js";

export const sendOutOfStockAlert = async (req, res) => {
  try {
    const { name, category, previousQuantity } = req.body;

    const timestamp = new Date().toLocaleString();

    const htmlMessage = `
      <h2>Product Out of Stock</h2>
      <p><strong>Product:</strong> ${name}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Last Quantity:</strong> ${previousQuantity}</p>
      <p><strong>Time:</strong> ${timestamp}</p>
      <p>Please restock this item as soon as possible.</p>
    `;

    await sendEmail({
      email:  process.env.ADMIN_EMAIL,
      subject: `Out of Stock Alert - ${name}`,
      message: htmlMessage,
    });

    res.status(200).json({ message: "Out-of-stock email sent" });

  } catch (error) {
    console.error("Out-of-stock email error:", error);
    res.status(500).json({ message: "Failed to send out-of-stock email", error: error.message });
  }
};
