import React from 'react'
import {Exhibit} from '@readyplayerme/visage'
import './AvatarChat.css'


export default function AvatarChat() {


  
  async function sayHello() {
    const client = new InworldClient()
      // Get key and secret from the integrations page.
      .setApiKey({
        key: 'FKU20gQij8Ba50jqzBOsfdIr02UeX8fL',
        secret: '0VEzCtmxs4GdIJ2yDhT7HwcdwrbBLwTeZ7D4swpOvURYzEOPrMmcDUaqZ8F5cuS2',
      })
      // Setup a user name.
      // It allows character to call you by name.
      .setUser({ fullName: 'Your name' })
      // Setup required capabilities.
      // In this case you can receive character emotions.
      .setConfiguration({
        capabilities: { audio: true, emotions: true },
      })
      // Use a full character name.
      // It should be like workspaces/{WORKSPACE_NAME}/characters/{CHARACTER_NAME}.
      // Or like workspaces/{WORKSPACE_NAME}/scenes/{SCENE_NAME}.
      .setScene(process.env.INWORLD_SCENE!)
      // Attach handlers
      .setOnError((err: Error) => console.error(err))
      .setOnMessage((msg: InworldPacket) => {
        console.log(msg);
  
        // Close connection.
        connection.close();
      });
  
    // Finish connection configuration.
    const connection = client.build();
  
    // Send your message to a character.
    await connection.sendText('Hello');
  }
  
  sayHello();
 

  return (
    <div className='avatar-rendering'>
        <Exhibit modelSrc='https://models.readyplayer.me/6404cebcce7f75d51cdd2d7a.glb'  />
    </div>
  )
}
