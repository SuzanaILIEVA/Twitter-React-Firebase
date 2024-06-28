import React from 'react'
import UserInfo from './UserInfo';
import Dropdown from './Dropdown';
import Content from './Content';
import Buttons from './Buttons';
import { auth } from '../../firebase';

const Post = ({tweet}) => {
    // console.log(tweet.user.id);
    // console.log(auth.currentUser.uid);

    const isOwn = tweet.user.id === auth.currentUser.uid

  return (
    <div className='flex gap-3 py-6 px-3 border-b border-zinc-600'>
        {tweet.user.photo ? <img className='rounded-full w-12 h-12' src={tweet.user.photo} alt={tweet.user.name} /> : <img className='rounded-full w-12 h-12' src="/public/default-avatarr.jpg"/> }
      

     <div className='w-full'>
     <div className='flex justify-between'>
        <UserInfo tweet={tweet}/>

        {isOwn &&   <Dropdown tweet={tweet} />}
       
      </div>

        <Content tweet={tweet}/>
        <Buttons tweet={tweet}/>

     </div>
    </div>
  )
}

export default Post
