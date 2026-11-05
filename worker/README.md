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

## Booking on Square's free Appointments plan

The free plan won't take bookings made with the personal access token ("seller-level").
It does take bookings made as the customer ("buyer-level"), which needs an OAuth token
from the same developer app:

1. In the developer app, switch to **Production**, open **OAuth**, set the Redirect URL to
   `https://seaside-booking.onrender.com/oauth/callback`, and save.
2. Copy the **Application ID** and **Application secret** into Render as
   `SQUARE_APP_ID` and `SQUARE_APP_SECRET`.
3. Open `https://seaside-booking.onrender.com/oauth/start`, sign in to Square, and click **Allow**.
   The page that comes back shows a refresh token. Save it in Render as `SQUARE_REFRESH_TOKEN`.

The server swaps the refresh token for a fresh access token on its own. `/health` says
`"booking": "buyer"` once this is set up.

Render's free plan sleeps after 15 minutes without traffic, so the first request after a quiet spell
can take up to a minute. The Starter plan stays awake.

## Deposits, quote requests and review requests

These are set in Render under **Environment**. Each one is optional.

| Name | What it does |
|---|---|
| `DEPOSIT_PERCENT` | Deposit for online bookings, as a % of the service price. Default 25. `0` turns deposits off. |
| `DEPOSIT_MIN` | Smallest deposit in dollars. Default 25. |
| `RESEND_API_KEY` | Lets the server send email through resend.com (free up to 3,000 a month). |
| `EMAIL_FROM` | Who the email is from, e.g. `Seaside Haven <info@seasidehavenllc.com>`. The domain must be verified in Resend. |
| `NOTIFY_EMAIL` | Where quote request alerts go. Default info@seasidehavenllc.com. |
| `REVIEW_URL` | Your Google review link (Google Business Profile → **Ask for reviews**). |
| `TASK_SECRET` | Any long random password. Put the same value in GitHub → Settings → Secrets and variables → Actions as `TASK_SECRET`. |

- **Deposits:** after an online booking, the server creates a Square invoice for the deposit and
  publishes it. Square emails it, takes the card, and sends a reminder the next day. The chat
  shows a "Pay deposit" button too. Needs `SQUARE_TOKEN`.
- **Quote requests:** the Get a Quote page saves each request on the customer in Square (note +
  the "Website quote requests" customer group) and, with Resend set up, emails you an alert.
- **Review requests:** the "Ask for reviews" GitHub Action runs every evening. Customers whose
  visit ended in the last day (and wasn't cancelled) get an email with your review link.

## How it behaves

- `GET /services` lists the Square services that are bookable online.
- `GET /availability?variation=<id>&days=10` returns open times, in the location's time zone.
- `POST /book` finds or creates the customer in Square, then creates the booking.
  The job address and details go in the booking's customer note. Then it sends the deposit invoice.
- `POST /quote` saves a quote request in Square.
- `POST /tasks/review-requests` sends review requests (needs `TASK_SECRET`).

If Square can't be reached or a time gets taken, the chat falls back to emailing a
booking request, so customers always get through.
