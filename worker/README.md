# Square booking worker

This small Cloudflare Worker lets the website chat show real open times from
Square and book them onto the Square calendar. It holds the Square access token so
the token never appears in the public website.

## One-time setup

1. **Get a Square access token**
   - Go to <https://developer.squareup.com/apps> and sign in with the Seaside Haven Square login.
   - Click **Create app** and name it `Seaside Haven Website`.
   - Open the app, switch the toggle at the top from **Sandbox** to **Production**, open **Credentials**, and copy the **Production Access token**.
   - Keep it private. Don't email it or paste it into a chat.

2. **Create the worker**
   - Sign up or log in at <https://dash.cloudflare.com> (the free plan is enough).
   - Go to **Workers & Pages → Create → Create Worker**, name it `seaside-booking`, and click **Deploy**.
   - Click **Edit code**, delete what's there, paste everything from `worker/square-booking.js`, and click **Deploy**.

3. **Add the token**
   - In the worker, go to **Settings → Variables and Secrets → Add**.
   - Type: **Secret**. Name: `SQUARE_TOKEN`. Value: the token from step 1. Save and deploy.

4. **Connect the website**
   - Copy the worker address (looks like `https://seaside-booking.<your-name>.workers.dev`).
   - Put it in `chat.js` as `const BOOKING_API = "https://seaside-booking.<your-name>.workers.dev";`

Check it: opening `<worker address>/services` in a browser should list your services.

## Hosting on Render instead

The same code runs as a small Node server (`worker/server.js`):

- Build command: `echo ok`  (no packages to install)
- Start command: `node worker/server.js`
- Environment variable: `SQUARE_TOKEN` = the token from step 1 (add it in the Render dashboard under **Environment**)

Render's free plan sleeps after 15 minutes without traffic, so the first request after a quiet spell
can take up to a minute. The Starter plan stays awake.

## How it behaves

- `GET /services` lists the Square services that are bookable online.
- `GET /availability?variation=<id>&days=10` returns open times, in the location's time zone.
- `POST /book` finds or creates the customer in Square, then creates the booking.
  The job address and details go in the booking's customer note.

If Square can't be reached or a time gets taken, the chat falls back to emailing a
booking request, so customers always get through.
