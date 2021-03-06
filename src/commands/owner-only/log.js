import logger from '@greencoast/logger';
import CustomCommand from '../../classes/extensions/CustomCommand';
import { guildSettingKeys } from '../../common/constants';

class LogCommand extends CustomCommand {
  constructor(client) {
    super(client, {
      name: 'log',
      emoji: ':pencil:',
      memberName: 'log',
      group: 'owner-only',
      description: 'Enable or disable the logging of support channels.',
      examples: [`${client.commandPrefix}log enable`, `${client.commandPrefix}log disable`],
      guildOnly: false,
      ownerOnly: true,
      argsType: 'multiple'
    });
  }

  handleEnable(message) {
    const previousValue = this.client.provider.get(message.guild, guildSettingKeys.log);

    if (previousValue) {
      message.reply('Logging is already enabled.');
      return;
    }

    this.client.provider.set(message.guild, guildSettingKeys.log, true);
    message.reply("Logging is now enabled. Chat log files will be saved in the bot's data folder.");
    logger.info(`Logging has been enabled for ${message.guild.name}.`);
  }

  handleDisable(message) {
    const previousValue = this.client.provider.get(message.guild, guildSettingKeys.log);

    if (!previousValue) {
      message.reply('Logging is already disabled.');
      return;
    }

    this.client.provider.set(message.guild, guildSettingKeys.log, false);
    message.reply('Logging is now disabled. Chat logs will not be saved.');
    logger.info(`Logging has been disabled for ${message.guild.name}.`);
  }

  run(message, [option]) {
    super.run(message);
    
    if (option === 'enable') {
      return this.handleEnable(message);
    }

    if (option === 'disable') {
      return this.handleDisable(message);
    }

    message.reply('Invalid argument, please use either: **enable** or **disable**.');
  }
}

export default LogCommand;
