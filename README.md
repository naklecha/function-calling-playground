## Fireworks Function Calling

![demo](https://github.com/naklecha/function-calling-example/blob/main/public/demo.png?raw=true)

### Setup
```bash
npm install
```

Place your fireworks API key in the `.env` file.
```bash
FIREWORKS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Start your server, by running:
```bash
npm run dev
```


#### Additional Setup (optional)

1. Function calling is a really useful tool to run automation tasks
2. In this setup we configure a Zapier webhook with the function calling to automate a bunch of Google services like our email & calendar.
3. Start by cloning this Zapier workflow: [link to Zapier workflow](https://github.com/naklecha/function-calling-example/blob/main/public/zapier.png)
4. We use function calling to call your Zapier webhook
