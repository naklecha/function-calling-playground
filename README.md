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
1. Zapier a powerful tool for automating tasks and integrating different systems.
2. In this setup, we will configure a Zapier webhook to automate actions in response to certain events.
3. Start by creating a Zapier account if you don't have one already.
4. Set up a new Zap in Zapier.
5. Add a new action step and search for "Webhooks by Zapier".
6. Select "Webhooks by Zapier" as the action app and choose the desired action to perform.
7. Configure the action step settings, including any required parameters or data.
8. In the webhook URL field on the website, enter the URL provided by Zapier for your webhook.
9. At the end your Zap should look something like this: [example Zapier workflow](https://github.com/naklecha/function-calling-playground/blob/main/public/zapier.png)