import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  notification: false,
  notePadData: [ 
    {
    id: 1,
    name: 'Thailand' ,
    image: require('../../Assets/Images/8.jpeg'),
    Notes: [
      {
        id: 1,
        title: 'Shopping mall',
        description: 'Hellow how are u',
        date: '23 May',
        image: require('../../Assets/Images/20.jpg'),
    },
      {
        id: 2,
        title: 'Food Court',
        description: 'Hi Are u There But I didnt',
        date: '15 jun',
        image: require('../../Assets/Images/16.jpg'),
    },
      {
        id: 3,
        title: 'Chad Griffton',
        description: 'u improvement The pet Show',
        date: '10 Aug',
        image:require('../../Assets/Images/17.jpg'),
      },
      {
        id: 4,
        title: 'Glen Guzman',
        description: 'Thats pretty Your Fine',
        date: '4 Dec',
        image: require('../../Assets/Images/18.jpg'),
      },
      {
        id: 5,
        title: 'Cora Bush',
        description: 'Hellow how are u',
        date: '1 Sep',
        image:require('../../Assets/Images/19.jpg'),
      },
    ],
  },
  {
    id: 2,
    name: 'Central America',
    image: require('../../Assets/Images/9.jpeg'),
    Notes: [
      {
        id: 1,
        title: 'Emma Balley',
        description: 'Hellow how are u',
        date: '23 May',
        image: require('../../Assets/Images/20.jpg'),
      },
    ],
  },
  {
    id: 3,
    name: 'Cambodia',
    image:  require('../../Assets/Images/10.jpeg'),
    Notes: [
      {
        id: 1,
        title: 'Emma Balley',
        description: 'Hellow how are u',
        date: '23 May',
        image: require('../../Assets/Images/20.jpg'),
      },
      {
        id: 2,
        title: 'Madge Gomez',
        description: 'Hi Are u There But I didnt',
        date: '15 jun',
        image : require('../../Assets/Images/16.jpg')
      },
      {
        id: 3,
        title: 'Chad Griffton',
        description: 'u improvement The pet Show',
        date: '10 Aug',
        image:require('../../Assets/Images/17.jpg'),
      },
      {
        id: 4,
        title: 'Glen Guzman',
        description: 'Thats pretty Your Fine',
        date: '4 Dec',
        image: require('../../Assets/Images/18.jpg'),
      },
      {
        id: 5,
        title: 'Cora Bush',
        description: 'Hellow how are u',
        date: '1 Sep',
        image:require('../../Assets/Images/19.jpg'),
      },
    ],
  }],
  WishList:[],
  id: 0,
  prefrences: [],


 
  selectedRole: '',
};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setCategoryProperties(state, action) {
      state.categoryProperties = action?.payload;
      // console.log("reduxxxx", state.categoryProperties);
    },
    setUserData(state, action) {
      state.userData = action?.payload;
      // state.userData = action?.payload?.userData;
    },
    setUserLogOut(state, action) {
      state.userData = {};
    },
    setServiceCategories(state, action) {
      state.categories = action?.payload;
    },
    setFinanceBreakDown(state, action) {
      state.financeBreakDown = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },
    saveToWishList(state,action){
      console.log("DATAew",action.payload)
      
      state.WishList.push(action.payload);
    },
    setPrefrences(state, action){
      if(state.prefrences.includes(action.payload)){
        // console.log('condition 1')
        state.prefrences = state.prefrences.filter(asset=> asset != action.payload)
      }else{
        // console.log('condition 2')

        state.prefrences.push(action.payload)
      }
    },

    setNotePadData(state, action) {
      console.log('here paylaod=========>>>>>>>>>>>>>', action.payload);
      state.notePadData = [
        ...state.notePadData,
        {...action.payload, id: state.notePadData.length+1},
      ];
    },
    setFiles(state, action) {
      console.log('here paylaod set files=========>>>>>>>>>>>>>', action.payload);
      const tempData = state.notePadData.findIndex(item => {
        return item?.id == action.payload.storyId;
      });
      if (tempData != -1) {
        console.log("🚀 ~ file: common.js:198 ~ setFiles ~ tempData:", tempData)
        console.log('Here');
        const tempData2 = state.notePadData[tempData]?.Notes?.findIndex(item => {
          return item.id == action.payload.id;
        });
        if (tempData2 != -1) {
          console.log("🚀 ~ file: common.js:203 ~ setFiles ~ tempData2:", tempData2 ,  state.notePadData[tempData].Notes[tempData2].description , action.payload.description)
          console.log('data 2')
          // state.notePadData[]
          state.notePadData[tempData].Notes[tempData2].description = action.payload.description
          state.notePadData[tempData].Notes[tempData2].title = action.payload.title
          // tempData2.title = action.payload.title;
          // tempData2.description = action.payload.description;
          // tempData2.image = action.payload.image;
          // tempData2.date = action.payload.date ;
          console.log("🚀 ~ file: common.js:212 ~ setFiles ~ tempData2:", tempData2 ,  state.notePadData[tempData].Notes[tempData2].description )
            
        } else {
          console.log('data 3')
          state.notePadData[tempData].Notes.push({
            id:state.notePadData[tempData].Notes.length+1,
            title: action.payload.title,
            description: action.payload.description,
            image: action.payload.image,
            date:action.payload.date
          });
        }
      }
    },
    deleteFolders(state, action) {
      // console.log('reduxxx',action.payload)
      // console.log('Notepad data====>>>>', state.notePadData)
      // console.log('item ',action.payload.some(i=>i?.name == 'yes'))
      state.notePadData = state.notePadData.filter(item =>
        action.payload.some(i => i?.name != item?.name),
      );
      // console.log('Notepad data====>>>>', state.notePadData)
      // console.log('reduxxx out')
    },
  },
});

export const {
  setUserData,
  setUserLogOut,
  setServiceCategories,
  setCategoryProperties,
  setFinanceBreakDown,
  setNotification,
  setSelectedRole,
  setNotePadData,
  deleteFolders,
  setFiles,
  saveToWishList,
  setPrefrences,
} = CommonSlice.actions;

export default CommonSlice.reducer;
