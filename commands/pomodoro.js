const seconds = 2;
let counter = 5;

const getText = () => {return `Timer set!, left ${counter} minutes`}

async function updateCounter (msg, message) 
{
    const {voice} = message.member
    if (counter > 0) {
        msg.edit(getText())
        counter -=1
        setTimeout(() => {updateCounter(msg, message)}, 1000 * seconds)
    }
    else if (counter == 0) {
        if (voice.channelID){ voice.channel.leave()}
        msg.edit('Pomodoro Ended!, do something else')
        return    
    }
}

module.exports = {
    name: 'pomodoro',
    async execute (message, args) {
        const msg = await message.channel.send(getText())
        const { voice } = message.member
        if (voice.channelID){voice.channel.join()}
        updateCounter(msg, message)
    }
}