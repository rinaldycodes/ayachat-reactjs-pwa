import {  ref, child, get, set } from "firebase/database";
import { db_app } from "../configs/firebaseConfig";
import { generateRandomString, getCurrentTime } from "../helper/GlobalFunctions";
import { getDataLogin } from "../helper/SessionLogin";
import { getCurrentUserInfo, getRandomCharacters500 } from "./UserApi";


export const checkIsMember = async (chat_id,user_id) => {
    var currTimestamp = Date.now();
    const dbRef = ref(db_app);

    try {
        const snapshot = await get(child(dbRef, 'chat_app/chats/'+chat_id+'/members/'+user_id));

        if (snapshot.exists()) {
        //   console.log('Yes Im member');
          return true;
        } else {
        //   console.log('No data available');
          return false;
        }
    }   catch (error) {
        console.error(error);
        return error;
    }
}


export const sendChat = async (chat_id,user_id, message) => {

    try {
        const currentTimestamp = Date.now();
        const currentTime = getCurrentTime();

        const user_login = await getCurrentUserInfo();
        // console.log('user_login', user_login)

        set(ref(db_app, '/chat_app/chats/'+chat_id+'/messages/'+currentTimestamp), {
            message: message,
            sender_id: user_login.uid,
            sys_created_on : currentTime
        })

        return '200';
    }   catch (error) {
        console.error(error);
        return error;
    }


}



export const createGroup = async (group_name, group_type) => {
    const randomString = generateRandomString(11)
    const user_id = getDataLogin('uid');
    // const user_login = await getCurrentUserInfo();
    // const user_id = ;

    try {
        const currentTimestamp = Date.now();
        const currentTime = getCurrentTime();

        set(ref(db_app, '/chat_app/chats/'+randomString), {
            name: group_name,
            group_type: group_type,
            sys_created_on : currentTime,
            sys_created_time : currentTimestamp,
        })

        setTimeout(() => {
            createGroupMember(randomString, user_id, 'founder')
        }, 3000);

        return '200';
    }   catch (error) {
        console.error(error);
        return error;
    }
}

export const createPrivateChat = async (user_other_id) => {
    const randomString = generateRandomString(11)
    const user_id = getDataLogin('uid');
    // const user_login = await getCurrentUserInfo();
    // const user_id = ;

    try {
        const currentTimestamp = Date.now();
        const currentTime = getCurrentTime();

        set(ref(db_app, '/chat_app/chats/'+randomString), {
            name: user_id+'_'+user_other_id,
            group_type: 'private chat',
            sys_created_on : currentTime,
            sys_created_time : currentTimestamp,
            user_1: user_id,
            user_2: user_other_id,
        })

        setTimeout(() => {
            createGroupMember(randomString, user_id, 'founder')
            // createGroupMember(randomString, user_other_id, 'member')
        }, 3000);

        return randomString;
    }   catch (error) {
        console.error(error);
        return '400';
    }
}


export const createGroupMember = async (chat_id, user_id, position) => {
    const randomString = generateRandomString(11)

    try {
        const currentTimestamp = Date.now();
        const currentTime = getCurrentTime();

        set(ref(db_app, '/chat_app/chats/'+chat_id+'/members/'+user_id), {
            position: position,
            member_at : currentTimestamp,
        })

        return '200';
    }   catch (error) {
        console.error(error);
        return error;
    }
}


export const saveRegister = async (user_id, email, alias_name, age, gender) => {
    const randomString = generateRandomString(11)

    try {
        const currentTimestamp = Date.now();
        const currentTime = getCurrentTime();
        const character_id = await getRandomCharacters500();

        set(ref(db_app, '/chat_app/users/'+user_id), {
            alias_name: alias_name,
            email: email,
            age: age,
            gender: gender,
            character: character_id,
            point: 0,
            coin: 0,
            sys_created_on : currentTime,
            sys_created_time : currentTimestamp,
        })

        return '200';
    }   catch (error) {
        console.error(error);
        return error;
    }
}


export const getUserInfo2 = async (user_id) => {
    const dbRef = ref(db_app);

    try {
        const snapshot = await get(child(dbRef, 'chat_app/users/'+user_id));

        if (snapshot.exists()) {
            const res = snapshot.val()
        //   console.log('Yes Im member', snapshot.val().alias_name);
          return res;
        } else {
        //   console.log('No data available');
          return false;
        }
    }   catch (error) {
        console.error(error);
        return error;
    }
}


export const getChatInfo = async (chat_id) => {
    const dbRef = ref(db_app);

    try {
        const snapshot = await get(child(dbRef, 'chat_app/chats/'+chat_id));

        if (snapshot.exists()) {
            const res = snapshot.val()
        //   console.log('Yes Im member', snapshot.val().alias_name);
          return res;
        } else {
        //   console.log('No data available');
          return false;
        }
    }   catch (error) {
        console.error(error);
        return error;
    }
}
