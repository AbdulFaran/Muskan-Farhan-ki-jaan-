# Farhan ❤️ Muskan — Private AI + Private Calling

## What this version adds
- Welcome screen for Farhan & Muskan.
- Photo slots.
- AI chat.
- AI video-call style AI companion.
- **Private registered-user calling:** WebRTC audio/video call between registered IDs.
- Calls use a peer-to-peer media connection; Supabase Realtime is used for signaling.
- The UI is designed so the app can restrict calls to an approved pair (for example Farhan ↔ Muskan).

## Important: real registration + privacy
For a genuinely private app, registration and authorization must be enforced by the backend/database, not only by JavaScript.

Recommended Supabase setup:
1. Create a Supabase project.
2. Enable Auth (email/password or phone OTP).
3. Create a `profiles` table with the authenticated user's ID and a public `username`.
4. Create a `call_permissions` table containing only approved pairs.
5. Enable Row Level Security (RLS).
6. Allow a user to read/call only a permitted partner.
7. Put the Supabase project URL and **anon/publishable key** in `app-config.js`.
8. Never put `service_role` keys in the website.

The current front-end demonstrates the WebRTC call flow. The final authorization check should be added to the Supabase policies/database before using it as a privacy/security boundary.

## Real AI
The existing `/api/chat` endpoint uses `OPENAI_API_KEY` on the Vercel server. Keep that key in Vercel Environment Variables, not in browser code.

## Photos
The supplied Farhan and Muskan photos are already included as `public/farhan.jpg` and `public/muskan.jpg`. The welcome screen uses them automatically.

## Video call notes
WebRTC needs HTTPS in production (Vercel provides this). A TURN server is recommended for reliable calls across restrictive mobile networks; add its credentials to `iceServers` on the server/config side as appropriate.

This is a real browser audio/video call architecture, not a fake animation. Both registered users need camera/microphone permission.
