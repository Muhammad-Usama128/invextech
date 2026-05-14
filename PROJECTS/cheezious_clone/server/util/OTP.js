import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

// Twilio typically requires an Account SID and an Auth Token.
// You have TWILIO_API_KEY, which is either used as the Auth Token or as an API Key with the Account SID.
// Make sure to add TWILIO_ACCOUNT_SID and TWILIO_PHONE_NUMBER to your .env file as well.
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'your_account_sid_here';
const authToken = process.env.TWILIO_API_KEY; // Using API Key from .env as requested

/**
 * Generates and sends a 6-digit OTP to the specified phone number using Twilio.
 * 
 * @param {string} phoneNumber - The destination phone number (e.g., '+923001234567')
 * @returns {Promise<string>} The generated OTP
 */
export const sendOTP = async (phoneNumber) => {
    try {
        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Initialize Twilio client
        // Note: You must run `npm install twilio` in the server directory before this will work.
        const client = twilio(accountSid, authToken);

        // Send SMS
        const message = await client.messages.create({
            body: `Your Cheezious verification code is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER || '+1234567890', // The Twilio phone number
            to: phoneNumber
        });

        console.log(`[Twilio] OTP sent successfully to ${phoneNumber}. Message SID: ${message.sid}`);
        
        // Return the OTP so you can receive it where you call this function
        return otp;
    } catch (error) {
        console.error('[Twilio] Failed to send OTP:', error.message);
        throw error;
    }
};

// ==========================================
// HOW TO TEST THIS FUNCTION ISOLATED:
// ==========================================
// 1. Run: npm install twilio
// 2. Add to your .env file:
//    TWILIO_ACCOUNT_SID=your_account_sid
//    TWILIO_PHONE_NUMBER=your_twilio_number
// 3. Uncomment the code below and run `node util/OTP.js` to test.
//
// sendOTP('+923000000000') // Replace with your verified Twilio phone number
//   .then(otp => console.log('Returned OTP:', otp))
//   .catch(err => console.error(err));
