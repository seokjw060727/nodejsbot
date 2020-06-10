const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzE5MDk3NzA1Mjk2ODIyMzEz.XuDx9Q.wZakcCWaCU-zxlQpVJl6DltTbwc';

client.on('ready', () => {
  console.log('Bot ready...');
  client.user.setPresence({ game: { name: '게임페인서버 접속중!                 ' }, status: 'online' })
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '!서버상태') {
    return message.reply('현재 서버상태는' + client.ping + 'ms 입니다!');
  }

  if(message.content.startsWith('!공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

client.login(token);