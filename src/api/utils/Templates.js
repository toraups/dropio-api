import env from "../../config/env.js";

class EmailTemplates {
  static verifyEmail(name, verifyUrl) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f9fb;
          }
          table {
            width: 100%;
            background-color: #f7f9fb;
            padding: 20px 0;
          }
          .email-container {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            margin: 0 auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          .email-header {
            background-color: #007bff;
            padding: 12px 20px;
            text-align: center;
            color: white;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .email-body {
            padding: 30px 20px;
            text-align: center;
          }
          .email-body h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 15px;
          }
          .email-body p {
            color: #555;
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 20px;
          }
          .email-body .cta-button {
            background-color: #007bff;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 16px;
            display: inline-block;
            margin: 20px 0;
          }
          .email-footer {
            background-color: #f4f7fc;
            padding: 15px 20px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #e0e7f1;
          }
          .email-footer a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <td align="center">
              <div class="email-container">
                <!-- Header -->
                <div class="email-header">
                  Dropio
                </div>

                <!-- Body -->
                <div class="email-body">
                  <h1>Hello ${name},</h1>
                  <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>

                  <a href="${verifyUrl}" class="cta-button">Verify Email</a>

                  <p>This link will expire in 1 hour.</p>
                  <p>If you did not create an account with us, please ignore this email.</p>
                </div>

                <!-- Footer -->
                <div class="email-footer">
                  <p>&copy; ${new Date().getFullYear()} Dropio. All rights reserved.</p>
                  <p><a href="${env.core.client_url}">Visit our website</a></p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  static forgotPassword(name, resetUrl) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Forgot Your Password?</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f9fb;
          }
          table {
            width: 100%;
            background-color: #f7f9fb;
            padding: 20px 0;
          }
          .email-container {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            margin: 0 auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          .email-header {
            background-color: #007bff;
            padding: 12px 20px;
            text-align: center;
            color: white;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .email-body {
            padding: 30px 20px;
            text-align: center;
          }
          .email-body h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 15px;
          }
          .email-body p {
            color: #555;
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 20px;
          }
          .email-body .cta-button {
            background-color: #007bff;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 16px;
            display: inline-block;
            margin: 20px 0;
          }
          .email-footer {
            background-color: #f4f7fc;
            padding: 15px 20px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #e0e7f1;
          }
          .email-footer a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <td align="center">
              <div class="email-container">
                <!-- Header -->
                <div class="email-header">
                  Dropio
                </div>

                <!-- Body -->
                <div class="email-body">
                  <h1>Password Reset Requested</h1>
                  <p>Hi ${name},</p>
                  <p>We received a request to reset your password. You can reset your password by clicking the button below:</p>

                  <a href="${resetUrl}" class="cta-button">Reset Password</a>

                  <p>If you did not request this, you can ignore this email.</p>
                </div>

                <!-- Footer -->
                <div class="email-footer">
                  <p>&copy; ${new Date().getFullYear()} Dropio. All rights reserved.</p>
                  <p><a href="${env.core.client_url}">Visit our website</a></p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  static resetPassword(name) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Password Reset Successful</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f9fb;
          }
          table {
            width: 100%;
            background-color: #f7f9fb;
            padding: 20px 0;
          }
          .email-container {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            margin: 0 auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          .email-header {
            background-color: #007bff;
            padding: 12px 20px;
            text-align: center;
            color: white;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .email-body {
            padding: 30px 20px;
            text-align: center;
          }
          .email-body h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 15px;
          }
          .email-body p {
            color: #555;
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 20px;
          }
          .email-body .cta-button {
            background-color: #007bff;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 16px;
            display: inline-block;
            margin: 20px 0;
          }
          .email-footer {
            background-color: #f4f7fc;
            padding: 15px 20px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #e0e7f1;
          }
          .email-footer a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <td align="center">
              <div class="email-container">
                <!-- Header -->
                <div class="email-header">
                  Dropio
                </div>

                <!-- Body -->
                <div class="email-body">
                  <h1>Your Password Has Been Reset</h1>
                  <p>Hi ${name},</p>
                  <p>Your password has been successfully reset. You can now log in with your new password.</p>

                  <p>If you did not initiate this request, please contact our support team immediately.</p>
                </div>

                <!-- Footer -->
                <div class="email-footer">
                  <p>&copy; ${new Date().getFullYear()} Dropio. All rights reserved.</p>
                  <p><a href="${env.core.client_url}">Visit our website</a></p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }
}

export default EmailTemplates;
