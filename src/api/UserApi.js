import {  ref, child, get, set, limitToLast, query,  orderByChild, equalTo } from "firebase/database";
import { db_app } from "../configs/firebaseConfig";
import {  getCurrentTime } from "../helper/GlobalFunctions";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import secureLocalStorage from "react-secure-storage";

const auth = getAuth();
const dbRef = ref(db_app);


export const handleLogout = () => {
  signOut(auth)
    .then(() => {
      secureLocalStorage.clear();
      // User signed out successfully
      console.log('User signed out');
    })
    .catch((error) => {
      // Handle sign out errors
      console.error('Sign out error:', error);
    });
};


export const checkLoginStatus = async () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          resolve(true);
        } else {
          // No user is signed in
          resolve(false);
        }
      }, (error) => {
        reject(error);
      });
    });
}

export const getCurrentUserInfo = async () => {

    try {
        const snapshot = await get(child(dbRef, 'chat_app/users/'));

        if (snapshot.exists()) {
            const res = snapshot.val()
        //   console.log('Yes Im member', snapshot.val().alias_name);
            return new Promise((resolve, reject) => {
                onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in

                    // console.log('ress filter', res[user.uid])
                    const rdb_user = res[user.uid];

                    rdb_user.uid = user.uid;
                    
                    resolve(rdb_user);
                } else {
                    // No user is signed in
                    resolve(false);
                }
                }, (error) => {
                reject(error);
                });
            });
        } else {
        //   console.log('No data available');
          return false;
        }
    }   catch (error) {
        console.error(error);
        return error;
    }
    

}


export const getUserInfo = async (user_id) => {

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

  export const getCurrentUserLoginStatus = async () => {
      try {
          const loggedIn = await checkLoginStatus();
          if (loggedIn) {
            console.log("User is currently logged in");
          } else {
            console.log("User is currently logged out");
          }
      } catch (error) {
          console.error("Error checking login status:", error);
      }

  }
  

export const updateUser = async (user_id, new_key,new_value) => {
    const dbRef = ref(db_app);


    try {
        const currentTimestamp = Date.now();
        const currentTime = getCurrentTime();

        const snapshotUser = get(child(dbRef, 'chat_app/users/'+user_id))
        .then( (snapshotUser) => {
            const user = snapshotUser.val();
            user[new_key] = new_value;
            user['sys_updated_on'] = currentTimestamp;
            set(ref(db_app, '/chat_app/users/'+user_id), user)
        }).catch( (e) => {
            console.log('e', e)
        })

        return '200';
    }   catch (error) {
        console.error(error);
        return error;
    }
}

export const getCharacters = async (chat_id,user_id) => {
    var currTimestamp = Date.now();
    const dbRef = ref(db_app);

    try {
        // const queryData = query(ref(db_app, 'chat_app/characters'), orderByChild('point'), equalTo(500),);
        const snapshot = await limitToLast(1).get(child(dbRef, 'chat_app/characters'));

        // onValue( queryData, (snapshot) => {
        //     const data = snapshot.val();
        //     console.log('queryData',data);
        // })


        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log('get data', data);
            return data;
        } else {
          console.log('No data available');
          return false;
        }
    }   catch (error) {
        console.error(error);
        return error;
    }
}


export const getRandomCharacters500 = async (chat_id, user_id) => {
    try {
      const dbRef = ref(db_app);
      const queryData = query(
        ref(db_app, 'chat_app/characters'),
        orderByChild('point'),
        equalTo(500)
      );
  
      const snapshot = await get(queryData);
  
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Remove the first element (null) from the array
        const cleanedData = data.slice(1);
  
        // Get a random index within the cleanedData array length
        const randomIndex = Math.floor(Math.random() * cleanedData.length);
  
        // Get the random object from the cleanedData array
        const randomObject = cleanedData[randomIndex];
  
        // Get the random key by using Object.keys and accessing the element at the random index
        const randomKey = Object.keys(data)[randomIndex];
  
        // Return the random object or key
        return randomKey; // or return randomKey;
      } else {
        console.log('No data available');
        return false;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
};
  