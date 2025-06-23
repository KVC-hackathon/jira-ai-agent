{
    "id": "conf-otp-001",
    "title": "OTP Verification Feature Design",
    "content": "This Confluence page outlines the design and implementation details of the OTP (One-Time Password) verification feature. The OTP is used for authenticating users via SMS or email. \n\n**Key Components:**\n- OTP Generation: Securely generate a random 6-digit numeric code.\n- Delivery Method: Send OTP via SMS (Twilio) or email (SendGrid).\n- Expiration: OTPs expire after 5 minutes.\n- Validation: Users input the OTP, which is verified against a temporary server-side store (Redis).\n- Retry Limit: Users have up to 3 attempts before locking the session for security.\n\n**Security Notes:**\n- Rate limiting is applied to prevent brute force attacks.\n- OTPs are hashed using SHA-256 before storage.\n\n**Endpoints:**\n- `POST /auth/request-otp`: Initiates the OTP delivery.\n- `POST /auth/verify-otp`: Verifies the user-submitted OTP.\n\nThis feature is crucial for two-factor authentication and account recovery flows.",
    "author": "Jane Smith",
    "created_at": "2023-10-01T12:00:00Z",
    "type": "confluence",
    "url": "https://jira.com/confluence/01"
  }
  