# Discord Bot Example: Delete command

Want to allow your users to delete messages in a channel/based on some specific criteria or without also giving them the ability to pin? Okay, I dunno why that would be the case.

Whatever. This bot adds a command to the "apps" menu on a message that deletes it. Created with [slash-create](https://npm.im/slash-create) on [Cloudflare Workers](https://workers.cloudflare.com).

---

Create a Discord application with a bot user at [https://discord.com/developers/applications](https://discord.com/developers/applications) (see https://discord.com/developers/docs/tutorials/hosting-on-cloudflare-workers).

Install dependencies using pnpm:

```sh
pnpm install
```

Upload repository secrets to the Github dashboard:

```env
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN

DISCORD_APP_ID
DISCORD_PUBLIC_KEY
DISCORD_BOT_TOKEN

# optional
DEVELOPMENT_GUILD_ID
```

Once you have deployed your worker, go to the "general information" page of your discord application and set its interactions endpoint URL to the Cloudflare worker URL, e.g. `https://discord-bot-cloudflare-slash.your-subdomain.workers.dev`.

> Note: When you create a command, make sure to include it in the array of commands in `./src/commands/index.ts`.

### Local Development

For faster development without deploying each change, you may run the bot code on your local machine using `wrangler` and connect it to Discord using a free `ngrok` tunnel. Run `wrangler login` and follow the prompts to login to your Cloudflare account, and copy `.env.example` to `.dev.vars` and fill in the secrets.

Open three terminals: one for `pnpm dev`, one for `pnpm ngrok`, and one for running `pnpm sync:dev` each time you change a command's metadata (name, options, etc). Go to the "general information" page of your discord application and set its interactions endpoint URL to the ngrok tunnel.

Using `DEVELOPMENT_GUILD_ID` and testing in a single server is recommended, as server-specific commands sync instantly, while a bot's commands that can be used in any server update with a 1 hour cooldown/delay.
