# Hatsuku
a bot for discord made with nodejs :)

## Requirements
* **Node.js V14.0.0 or Above**

## How to Use?
You Need to Edit this File First Before Running the Bot, otherwise you get an Error
```
Hatsuku_Owner.json.example [Locate at "stuff" directory]
env.example
```
For **Hatsuku_Owner.json.example**:
Rename the file from ***"Hatsuku_Owner.json.example"*** to ***"Hatsuku_Owner.json"*** (Without --> "")
and open it with Notepad or Notepad++ and Replace it With Your Discord Information
```
{
  "ownerInfo": {
    "name": "Please Put Your Name Right Here", [Optional!] You Can Use any Name you Want
    "id": "Your Discord ID", [Optional!] Put Your Discord Account ID Right Here
    "ownerDescription": "Tell About Your Self or whatever you want to say (This Will Use in 'About' commands as 'SelfHosted')" [You Can either Change it or Not, is not Optional]
  }
}
```
For **env.example**:
Rename the file from ***"env.example"*** to ***".env"*** (without name and "", just .env)
open it with Notepad or Notepad++ and Replace With This Example Below
```
TOKEN= Put Your Bot Token Right Here, No Space and No "" (You can get the bot token on https://discord.com/developers)
PREFIX= This is use to call the bot, the default prefix is ">" you can change it whatever you want
DATABASE= Put the Database URI Here,Use to connect a Database Currently this Bot only support MongoDB

#If You Want to play music you need to have Lavalink install on your computer
#You can get Lavalink Right Here https://github.com/Frederikam/Lavalink
#If You already Have it Replace this with Your Lavalink Setting
LAVA_HOST=Put your Lavalink Host here
LAVA_PORT=Your Lavalink Port
LAVA_PASSWORD=Your Lavalink Password
```
If You Already Follow all Step Above,Now you Can run the Bot By typing
**npm install** (to install required packages) and **npm start** to run the bot
## License
This Project Is License Under ***ISC*** meaning You can do Whatever You Want with this Code in this Project
## Note
This Project is ~~Still Under development, sooo is not 100% Completed~~ Completed
