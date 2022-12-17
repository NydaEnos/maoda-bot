// const config = require("./config.json");
const Danbooru = require('danbooru');
const random = require('random')
const { Client, Intents, MessageAttachment } = require('discord.js');
const axios= require('axios')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const dotenv = require("dotenv")
const prefix = "!!";
const booru = new Danbooru()

var lastIdPost = ""
dotenv.config()
client.on("messageCreate", async (message) => {
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    if (command === "random") {
        const posts = await booru.posts({ tags: 'damao_yu' , limit: '200'})
            // Select a random post from posts array
        const index = random.int((min = 0), (max = 200))

        const post = posts[index]
        
        // Get post's url
        const url = booru.url(post.file_url)
        let res = await axios.get(url.href)
        const attachment = new MessageAttachment(url.href)
        let char_name = post.tag_string_character
        const contentLength = res.headers['content-length']
        
        let fileInMb = parseFloat(contentLength) / (1024 ** 2)
        console.log(attachment)
        // Send content + image file if file < 8Mb
        if (fileInMb > 8) {
            await message.channel.send({content: `Maoda-sama random image : \n${char_name} \n${url.href}`});

        }

        else {
            await message.channel.send({content: `Maoda-sama random image : \n${char_name}`, files: [attachment] });
        }
    }

    else if (command === "last") {
        
        booru.posts({ tags: 'damao_yu' }).then(async (posts) => {
            // Select last image
            const post = posts[0]
            const url = booru.url(post.file_url)
            let res = await axios.get(url.href)
            const attachment = new MessageAttachment(url.href)
            let char_name = post.tag_string_character
            const contentLength = res.headers['content-length']
            
            let fileInMb = parseFloat(contentLength) / (1024 ** 2)
            
            // Send content + image file if file < 8Mb
            if (fileInMb > 8) {
                await message.channel.send({content: `Maoda-sama last image : \n${char_name} \n${url.href} \n(file is too big)`});

            }

            else {
                await message.channel.send({content: `Maoda-sama last image : \n${char_name}`, files: [attachment] });
            }
            lastIdPost = post.id

        })
    }
    

    else if (command === "new") {

        if (!args.length) {
            booru.posts({ tags: 'damao_yu' }).then(async (posts) => {
                // Select last image
                const post = posts[0]
                if (lastIdPost == post.id) {
                    await message.channel.send({content: "No new image from Maoda-sama :cry:" })
                }
                else {
                    const url = booru.url(post.file_url)
                    const attachment = new MessageAttachment(url.href)
                    let res = await axios.get(url.href)
                    let char_name = post.tag_string_character
                    const contentLength = res.headers['content-length']
                
                    let fileInMb = parseFloat(contentLength) / (1024 ** 2)
                    
                    // Send content + image file if file < 8Mb
                    if (fileInMb > 8) {
                        await message.channel.send({content: `Maoda-sama last image : \n${char_name} \n${url.href} \n(file is too big)`});
        
                    }
        
                    else {
                        await message.channel.send({content: `Maoda-sama last image : \n${char_name}`, files: [attachment] });
                    }
                    lastIdPost = post.id
                }
            })
        }
        else {
            const usrInput = Integer.parseInt(args[0])
            for (let i = 0; i < usrInput; i++) {
                booru.posts({ tags: 'damao_yu' }).then(async (posts) => {
                    
                        const post = posts[0]
                        const url = booru.url(post.file_url)
                        const attachment = new MessageAttachment(url.href)
                        let res = await axios.get(url.href)
                        let char_name = post.tag_string_character
                        const contentLength = res.headers['content-length']
                    
                        let fileInMb = parseFloat(contentLength) / (1024 ** 2)
                        
                        // Send content + image file if file < 8Mb
                        if (fileInMb > 8) {
                            await message.channel.send({content: `Maoda-sama last image : \n${char_name} \n${url.href} \n(file is too big)`});
            
                        }
            
                        else {
                            await message.channel.send({content: `Maoda-sama last image : \n${char_name}`, files: [attachment] });
                        }
                    
                })
            }
        }
    }


    else if (command === "help") {
        message.channel.send({content: `All available commands : \n!!new : check if there is a new image from Maoda-sama \n!!help : get all commands \n!!random : return a random image from Maoda-sama \n!!last : return last image from Maoda-sama \n!!search : search for a specific image of Maoda-sama (WIP)` });
    }
});





client.login(process.env.BOT_TOKEN);