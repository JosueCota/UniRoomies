# UniRoomies
UniRoomies is a full-stack app made to help university and college students find roommates and housing. UniRoomies strives to provide students with a safe, comfortable, and efficient roommate selection process to increase student wellness. By strictly catering to students, it garners a closer-knit community of individuals in similar circumstances, yielding better compatibility between roommates.

## Features
### Roommate and Room Listings
We offer users essential information about potential roommates and available rooms, helping you find the best match. Additionally, our customizable filters allow you to easily refine your search by location, pricing, or both, ensuring a more personalized and streamlined experience.
![RoommateRoomList](https://github.com/user-attachments/assets/fdd73635-84c7-4d59-a228-736530032119)

### Real Time One-To-One Chatting
To foster connections, we also give users the ability to message each other, enabling direct communication to discuss whether they’d like to room together or inquire further about the available room.  
![ChatsPage](https://github.com/user-attachments/assets/edde5841-a2ae-444e-8336-326d3e2e5118)


## Local Installation
Prerequesites For Installation:
  - Node
  - MYSQL
  - Brevo Email
  
To get started, you will need to download the files within this repository and unzip them. Open two terminals, navigate into the frontend folder in one and the server folder in the other. You will then type ``npm i`` to install dependencies into both terminals. You will also need to create an AWS account, set up an S3 Bucket, and make a user with appropriate permissions to allow for uploading and deletion of S3 Bucket objects.

Now create a file named ``.env`` in both the server and frontend folders. Include all environment variables listed and their values:
  | Server Variarbles | Frontend Variables | 
  :------------------:|:-------------------------:
![image](https://github.com/user-attachments/assets/ea4348d0-02d3-485d-aac5-fcb40998ae6c) | VITE_BACKEND_URL

Finally, after all previous steps have been completed, run the command ``npm start`` for the server and ``npm run dev`` for the frontend!
