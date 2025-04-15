# itsup-backend for Vercel

This is a serverless function using OpenAI's GPT model, deployed via Vercel.

Endpoint:
```
POST /api/generate
```

Body:
```json
{
  "message": "こんにちは"
}
```
Returns a GPT-generated reply.
