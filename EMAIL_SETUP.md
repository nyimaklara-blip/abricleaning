# Email Setup Guide for Abricleaning Contact Form

This document explains how to set up email functionality for the contact form to send emails to `abricleaning99@gmail.com`.

## Overview

The contact form has been integrated with **EmailJS**, a free email service that allows you to send emails directly from your frontend application without needing a backend server.

## Setup Steps

### Step 1: Create EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Create New Service**
3. Choose **Gmail** as the service provider
4. Enter a service name (e.g., "Abricleaning Gmail")
5. Connect your receiver email: `abricleaning99@gmail.com`
   - You'll need to create an [App Password](https://support.google.com/accounts/answer/185833) for Gmail
   - Steps:
     - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
     - Select "Mail" and "Windows Computer" (or your device)
     - Generate a password
     - Copy and paste it into EmailJS
6. Click **Create Service**
7. Copy your **Service ID** (looks like `service_xxxxxxxxx`)

### Step 3: Create Email Templates

#### Template 1: Business Notification (Required)

This template sends the contact form submission to the business email.

1. Go to **Email Templates**
2. Click **Create New Template**
3. Fill in the template details:
   - **Template Name**: `contact_form_notification`
   - **Subject**: `Neue Anfrage von {{from_name}}`
   - **HTML Content**:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Neue Kontaktanfrage</h2>
  
  <p><strong>Name:</strong> {{from_name}}</p>
  <p><strong>E-Mail:</strong> {{from_email}}</p>
  <p><strong>Telefon:</strong> {{phone}}</p>
  <p><strong>Adresse:</strong> {{address}}</p>
  
  <h3>Nachricht:</h3>
  <p>{{message}}</p>
  
  <hr>
  <p><small>Diese E-Mail wurde über das Kontaktformular der Website gesendet.</small></p>
</div>
```

4. Click **Save**
5. Copy your **Template ID** (looks like `template_xxxxxxxxx`)

#### Template 2: Confirmation Email (Optional)

This sends a confirmation email to the user who submitted the form.

1. Go to **Email Templates** and create another template
2. Fill in the template details:
   - **Template Name**: `contact_form_confirmation`
   - **Subject**: `Anfrage bestätigt - Abricleaning`
   - **HTML Content**:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Vielen Dank, {{user_name}}!</h2>
  
  <p>Ihre Anfrage wurde erfolgreich empfangen.</p>
  <p>Wir werden uns in Kürze mit Ihnen in Verbindung setzen.</p>
  
  <hr>
  <p>
    <strong>Abricleaning</strong><br>
    Vorwerk Kobold Beratung<br>
    Uster, Zürich Oberland
  </p>
</div>
```

3. Click **Save**
4. Copy your **Template ID**

### Step 4: Get Your Public Key

1. Go to **Account** settings in EmailJS
2. Find and copy your **Public Key** (looks like `xxxxxxxxxxxxxxxxxxxxxxxxx`)

### Step 5: Configure Environment Variables

1. Create a `.env.local` file in the project root (copy from `.env.local.example`)
2. Fill in the environment variables:

```env
# Supabase Configuration (existing)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx  # Business notification template
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_yyyyyyyyy  # Optional confirmation template
```

### Step 6: Install Dependencies

```bash
bun install
# or
npm install
```

### Step 7: Test the Form

1. Start the development server:
```bash
bun dev
# or
npm run dev
```

2. Navigate to the contact form section
3. Fill out the form and submit
4. You should receive an email at `abricleaning99@gmail.com`

## Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID | Yes |
| `VITE_EMAILJS_TEMPLATE_ID` | Template ID for business notification | Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key | Yes |
| `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID` | Template ID for user confirmation email | No |

## Production Deployment (Vercel)

1. Go to your Vercel project settings
2. Add environment variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID` (optional)
3. Deploy your project

## Troubleshooting

### Emails Not Sending

1. **Check Console Errors**: Open browser DevTools (F12) and check the console for errors
2. **Verify Credentials**: Ensure all environment variables are correctly set
3. **Check EmailJS Dashboard**: 
   - Go to **Logs** to see if there are any failures
   - Verify templates are correctly named
4. **Gmail Security**: 
   - Ensure you used an [App Password](https://support.google.com/accounts/answer/185833), not your regular password
   - Allow less secure apps in Gmail settings if using a regular password

### Quota Exceeded

- EmailJS free tier allows 200 emails per month
- If you need more, upgrade your plan at emailjs.com

## Code Structure

The email implementation consists of:

1. **[emailService.ts](../src/lib/emailService.ts)** - Email sending utility
2. **[BookingForm.tsx](../src/components/BookingForm.tsx)** - Updated form component
3. **.env.local** - Environment configuration file

## Form Data Structure

The contact form collects:
- **Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Address** (optional)
- **Message** (optional)
- **GDPR Agreement** (required checkbox)

All data is sent to the specified email template for processing.

## Support

For issues with EmailJS, visit:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/contact)
