import {
  ApplicationCommandType,
  CommandContext,
  SlashCommand,
  SlashCreator,
} from 'slash-create/web';

export default class DeleteCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      type: ApplicationCommandType.MESSAGE,
      name: 'Delete this message',
    });
  }

  async run(ctx: CommandContext) {
    const message = ctx.targetMessage!;

    const allowedChannels = ['1158300511284514876']; // obviously you wouldn't hardcode this

    if (allowedChannels.includes(message.channelID)) {
      try {
        await ctx.creator.requestHandler.request(
          'DELETE',
          `/channels/${message.channelID}/messages/${message.id}`,
          { auth: true },
        );
        await ctx.send({
          content: `Successfully deleted target message!`,
          ephemeral: true,
        });
      } catch (e) {
        await ctx.send({
          content: `Bot failed to delete target message!`,
          ephemeral: true,
        });
        throw e;
      }
    } else {
      await ctx.send({
        content: `This bot isn't allowed to delete messages in this channel!`,
        ephemeral: true,
      });
    }
  }
}
