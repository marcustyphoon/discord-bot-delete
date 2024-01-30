# /create with Cloudflare Workers

A [slash-create](https://npm.im/slash-create) template, using [Cloudflare Workers](https://workers.cloudflare.com). Based off of [Snazzah/slash-create-worker](https://github.com/Snazzah/slash-create-worker), but with a Github Actions workflow to automatically deploy (the repository serves as a single source of truth).

Commands are synced to Discord on every push using [Snazzah/slash-up](https://github.com/Snazzah/slash-up) and bot code is deployed to Cloudflare using [cloudflare/wrangler-action](https://github.com/cloudflare/wrangler-action)

## Getting Started

After using this template, update the project name in `wrangler.toml` (and `package.json`). This name will be used for your project deployment in the Cloudflare dashboard and in your worker URL.

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
