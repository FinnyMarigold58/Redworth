const { MessageEmbed } = require("discord.js")

module.exports = {
  userPermissions: ["ADMINISTRATOR"],
  command: {
    name: "embed",
    description: "Create a embed",
    options: [
      {
        type: "STRING",
        name: "title",
        required: true,
        description: "Title for embed"
      },
      {
        type: "STRING",
        name: "description",
        required: true,
        description: "Description for embed"
      },
      {
        type: "STRING",
        name: "color",
        required: false,
        description: "Color for embed"
      },
      {
        type: "CHANNEL",
        name: "channel",
        required: false,
        description: "Channel to send message to",
        channel_types: [0]
      },
    ]
  },
  run: async (interaction, client) => {
    let channel = interaction.options.getChannel("channel")
    let title = interaction.options.getString("title")
    let description = interaction.options.getString("description")
    let color = interaction.options.getString("color")

    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
    
    const hexRegex = /^#([0-9a-f]{3}){1,2}$/i;
    if (color && hexRegex.test(color)) {
      embed.setColor(color)
    }

    if (channel) {
      channel.send({embeds: [embed]})
      interaction.reply({content: "Sent", ephemeral: true})
    } else {
      interaction.channel.send({embeds: [embed]})
      interaction.reply({ content: "Sent", ephemeral: true})
    }
  }
}