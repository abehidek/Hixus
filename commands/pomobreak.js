let counter = 10;
let seconds = 60;

const getText = () => {
    return `Break set!, left ${counter} minutes`}

const updateCounter = (msg, message) => {
    const {voice} = message.member
    if (counter > 0 ) {
        msg.edit(getText());
        counter -= 1;
        setTimeout( ()=> {
            updateCounter(msg, message)
        }, 1000 * seconds)
    }
    if (counter <= 0) {
        msg.edit(`Break ended!, time to work`,{
            tts: true
        })
        voice.channel.leave()
        return
    }
}

module.exports = {
    name: 'pomodoro',
    async execute(message, args){
        const msg = await message.channel.send(getText())
        const {voice} = message.member
        if (!voice.channelID){}
        else {
            voice.channel.join()
        }
        updateCounter(msg, message)
    }
}