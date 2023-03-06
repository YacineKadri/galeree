import React from 'react';
// import './index.html';
import './ReadyPlayerMe.css';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
  } from '@chakra-ui/react'

const ReadyPlayerMe = () => {
    // const subdomain = 'galeree';
    //     const frame = document.getElementById('frame');
    //     console.log(frame)

      

    //     window.addEventListener('message', subscribe);
    //     document.addEventListener('message', subscribe);

    //     function subscribe(event) {
    //         const json = parse(event);
    //         console.log(json.eventName)

    //         if (json?.source !== 'readyplayerme') {
    //             return;
    //         }

    //         // Susbribe to all events sent from Ready Player Me once frame is ready
    //         if (json.eventName === 'v1.frame.ready') {
    //             frame.contentWindow.postMessage(
    //                 JSON.stringify({
    //                     target: 'readyplayerme',
    //                     type: 'subscribe',
    //                     eventName: 'v1.**'
    //                 }),
    //                 '*'
    //             );
    //         }

    //         // Get avatar GLB URL
    //         if (json.eventName === 'v1.avatar.exported') {
    //             console.log(`Avatar URL: ${json.data.url}`);
    //             document.getElementById('avatarUrl').innerHTML = `Avatar URL: ${json.data.url}`;
    //             document.getElementById('frame').hidden = true;
    //         }

    //         // Get user id
    //         if (json.eventName === 'v1.user.set') {
    //             console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
    //         }
    //     }

    //     function parse(event) {
    //         try {
    //             return JSON.parse(event.data);
    //         } catch (error) {
    //             return null;
    //         }
    //     }

    //     function displayIframe() {
    //         document.getElementById('frame').hidden = false;
    //     }
       const src = "https://galeree.readyplayer.me/avatar?frameApi"
       const { isOpen, onOpen, onClose } = useDisclosure()

       function getAvatar() {
          fetch(src, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                },
                })
                .then((res) => res.json())
                .then((avatar) => {
                    console.log(avatar)
                }
                )
        }
       

    return (

          <>
    
          <Button onClick={onOpen}>My Character</Button>
      
          <Modal isOpen={isOpen} onClose={onClose} size='full'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Your Character</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <div className='avatar-creator'>
<iframe id="frame" title="Ready Player Me" width="100%" height="100%" src={src} allowFullScreen></iframe>
        </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
    );
}

export default ReadyPlayerMe;
