const {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder
} = require("discord.js");
const {
  Translate
} = require("../../process_tools");

module.exports = async (queue, track) => {
  if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;

  const EmojiState = client.config.app.enableEmojis;
  const emojis = client.config.emojis;

  const channel = queue.metadata.channel;

  // Clear all messages in the channel
  await channel.bulkDelete(100);

  const embed = new EmbedBuilder()
    .setAuthor({
      name: await Translate(
        `Started playing ${track.title} in ${queue.channel.name} 🎧`
      ),
      iconURL: track.thumbnail,
    })
    .setColor("#2f3136")
    .setThumbnail(track.thumbnail)
    .addFields({
      name: "Title",
      value: track.title,
      inline: true
    }, {
      name: "Channel",
      value: queue.channel.name,
      inline: true
    })
    .setFooter({
      text: "Enjoy your music!",
      iconURL: track.thumbnail,
    });

  const back = new ButtonBuilder()
    .setLabel(EmojiState ? emojis.back : 'Back')
    .setCustomId('back')
    .setStyle('Primary');

  const skip = new ButtonBuilder()
    .setLabel(EmojiState ? emojis.skip : 'Skip')
    .setCustomId('skip')
    .setStyle('Primary');

  const resumepause = new ButtonBuilder()
    .setLabel(EmojiState ? emojis.ResumePause : 'Resume & Pause')
    .setCustomId('resume&pause')
    .setStyle('Danger');

  const loop = new ButtonBuilder()
    .setLabel(EmojiState ? emojis.loop : 'Loop')
    .setCustomId('loop')
    .setStyle('Danger');

  const lyrics = new ButtonBuilder()
    .setLabel(EmojiState ? emojis.lirik : 'Lyrics')
    .setCustomId("lyrics")
    .setStyle("Secondary");

  const row1 = new ActionRowBuilder().addComponents(
    back,
    loop,
    resumepause,
    skip,
    lyrics
  );

  channel.send({
    embeds: [embed],
    components: [row1]
  });
};
