# Steps to reproduce

* Install Node.js - https://nodejs.org/en/download
* Run `npm install`
* Run the server - `npm run server`
* Run `npm run test` or `npm run test:ui`
* Observe same tests passing or failing depending on whether `page.route` touches headers or not (look at `/tests/cookie.spec.ts`)

Chromium: cookie is not properly unset (expected not to see the cookie here):
<img width="1559" alt="Image" src="https://github.com/user-attachments/assets/cb85ff20-8793-4d58-9f8f-8c20f6abce0f" />

Firefox: cookie is not properly set (expected to see the cookie here):
<img width="1559" alt="Image" src="https://github.com/user-attachments/assets/6c6bf177-43db-48c3-9932-b8d304ace429" />
