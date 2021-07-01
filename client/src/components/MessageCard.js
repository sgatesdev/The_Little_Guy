// import React from 'react';
// //add if statement for read or unread when socketio works
// export const MessageCard = ({ message }) => {
//     const { 
//         _id,
//         name,
//         image,
//         messages,
//     } = message;

//     return ( 
//         <>
//         <div class= "uk-card uk-grid-collapse uk-child-wifeth-1-1@s">
//             <div class="uk-card-media-left uk-cover-container">
//             <div class="uk-card-badge uk-label">UNREAD</div>
//                 <img src={image} alt="" class="uk-border-circle" />
//             </div>
//             <div>
//                 <div class="uk-card-body">
//                     <h3 class="uk-card-title">{name}</h3>
//                     <p class="uk-overflow-hidden"> { messages }</p>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// };