class EmailTemplates {
  static verifyEmail(name, verifyUrl) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Verify Your Email</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 20px 0;">
          <tr>
            <td align="center">
              
              <table width="100%" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="background:#4f46e5; padding:20px; text-align:center; color:#ffffff; font-size:20px; font-weight:bold;">
                    Dropio
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px;">
                    <h2 style="margin:0 0 10px; color:#111827;">Hello ${name},</h2>
                    
                    <p style="margin:0 0 20px; color:#4b5563; line-height:1.5;">
                      Thanks for signing up! Please verify your email address by clicking the button below.
                    </p>

                    <table cellpadding="0" cellspacing="0" style="margin:20px 0;">
                      <tr>
                        <td align="center">
                          <a href="${verifyUrl}" 
                             style="background:#4f46e5; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block; font-weight:bold;">
                            Verify Email
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 10px; color:#6b7280; font-size:14px;">
                      This link will expire in 1 hour.
                    </p>

                    <p style="margin:0; color:#9ca3af; font-size:12px;">
                      If you didn’t create an account, you can safely ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#9ca3af;">
                    © ${new Date().getFullYear()} Dropio. All rights reserved.
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }
}

export default EmailTemplates;
