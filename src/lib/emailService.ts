export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  message?: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const response = await fetch('https://formspree.io/f/mkopzonk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Nicht angegeben',
        address: formData.address || 'Nicht angegeben',
        message: formData.message || 'Keine Nachricht',
      }),
    });

    const result = await response.json();
    return result.ok === true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};
