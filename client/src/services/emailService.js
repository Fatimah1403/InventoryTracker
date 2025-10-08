
import emailjs from "@emailjs/browser";

export const sendOutOfStockEmail = async (product) => {
    try {

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            product_name: product.name,
            product_category: product.category,
            previous_quantity: product.quantity,
            timestamp: new Date().toLocaleString(),
            to_email: 'fattyhassan14@gmail.com'
          };

          const response = await emailjs.send(
            serviceId,
            templateId,
            templateParams,
            publicKey
        );
        console.log('Email sent successfully:', response);
        return true;
        
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
        
    }
}
    