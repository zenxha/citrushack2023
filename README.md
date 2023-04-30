# 🍊 Citrus Hack 2023 🍊
## Tuneshare - A place to share ideas through sound

## Rest API
- Documentation can be found [here](/docs/api.md)
## Contributors:

- Komay Sugiyama
- Cole Miller (Got banned on github LOL)
- Scott Barrios
- William(Dongyeon) Kim


# Project Story

## Inspiration
We all know how important audio is in our daily lives. Whether it's communicating ideas, expressing ourselves through music (singing or playing an instrument), or simply having fun with friends, audio has become an essential part of our social interactions. We wanted to create a platform that could bring all these ideas together and make it easy for people to share and discover new content. Our goal was to create a platform that is accessible to everyone and rewards quality content with upvotes.
## What it does
TuneShare is a platform that allows users to upload and share audio files with ease. Users can even record audio directly on the site using their microphone. The uploaded content is stored in our database and can be accessed by anyone. The platform features a browse page where users can easily find and share content via link or URL.
## How we built it
We built TuneShare using express.js as our backend engine and mongoose as our database. We used ejs as our templating engine to communicate between the frontend and backend. Additionally, we implemented a REST API for database actions. We used external packages such as Wavesurfer to enhance the visual appeal of our audio interface.
## Challenges we ran into
One of the biggest challenges we encountered was the lack of reusable component-based frontend. We had to figure out ways to link our audio scripts to our frontend written in HTML, which took up a lot of time. Going forward, we plan to use Next.js paired with React for projects that rely heavily on reusable components.
## Accomplishments that we're proud of
Despite the challenges we faced, we are proud of what we accomplished as a team of two. One of our members was unexpectedly suspended from Github, which made the task even more challenging. It was the first time we worked with ejs, and we were able to make it work efficiently. Connecting our server to a MongoDB server and interacting with it through our own API was also a significant achievement.
## What we learned
We learned the importance of using React for apps with a high reliance on components. As said earlier, with React, we could have created an audio player component that we could customize and reuse throughout our application.
## What's next for TuneShare
We plan to add a login and authentication feature along with dashboards so that users can easily access their own recordings. Additionally, we plan to add more advanced features such as the ability to add effects like pitch shifting, reverb, radio filters, and more to the audio that users want to share.
