import React, { Component, setState } from 'react';
// import KakaoLogin from 'react-kakao-login';
import Kakao from 'kakaojs'
// import './App.css';
// import axios from 'axios'
// import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';


function login({history}) {
//   constructor(props) {
//     super(props);
//     this.state= {
//       id: '',
//       name : '',
//       profileImg : ''
//     }
//   };

const bringProfile = () => {
    Kakao.API.request({
      url: '/v2/user/me',
      success: function(response) {
        // this.state.setState({
             console.log(response.properties.nickname)
             console.log(response.properties.profile_image)
             alert(response.properties.nickname)
          // })
          console.log(response);
      },
      fail: function(error) {
          console.log(error);
      }
  });
  }

  //나에게 메세지 보내기
  const toMSGForMe = () => {
    Kakao.Link.createDefaultButton({
      container: '#CONTAINER_ID',
      objectType: 'feed',
      content: {
        title: '디저트 사진',
        description: '아메리카노, 빵, 케익',
        imageUrl:
          'http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          androidExecParams: 'test',
        },
      },
      social: {
        likeCount: 10,
        commentCount: 20,
        sharedCount: 30,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
          },
        },
        {
          title: '앱으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
          },
        },
      ]
    });
  }

  const kakaoAuth = ()=> {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/oauth',
      throughTalk: true
      
    });
    console.log()
  }
  

  const logOut =() => {
    Kakao.Auth.logout(function(res) {
      console.log("logout", res)
    })
  }
  const navi=()=> {
    Kakao.Navi.start({
      name: "현대백화점 판교점",
      x: 127.11205203011632,
      y: 37.39279717586919,
      coordType: 'wgs84'
  });
  }
  const logOutExfire = () => {
    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function(response) {
        console.log(response);
      },
      fail: function(error) {
        console.log(error);
      },
    });
  }

  const loginAuth = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/oauth',
      //한번 정보동의 및 회원가입하면 다음부터 별도의 동의없이 간편 로그인 기능임
      scope: 'account_email'
      // throughTalk: true
    });
  }

  const logIn =() => {
    //카카오 로그인 시작
    Kakao.Auth.login({
      success: function(res) {
        alert('로그인 성공' )
        
        // console.log("res", res)

        Kakao.API.request({
          url:'/v2/user/me',
          success : res => {
            const kakao_account = res.kakao_account;
            const userInfo = {
                nickname : kakao_account.profile.nickname,
                email : kakao_account.email,
                password : '',
                account_type : 2,
            }

            




          

            

            //  axios.post(`http://localhost:5000`,{
            //      email : userInfo.email,
            //      nickname : userInfo.nickname
            //  })
            //  .then(res => {
            //     console.log(res);
            //     console.log("데이터베이스에 회원 정보가 있음!");
            //  })
            //  .catch(err => {
            //      console.log(err);
            //     console.log("데이터베이스에 회원 정보가 없음!");
            //  })
            // console.log(userInfo);
            // alert("로그인 성공!");
            // // this.$bvModal.hide("bv-modal-example");
        },
        fail : error => {
            // this.$router.push("/errorPage");
            console.log(error);
        }
        })


      },
      fail : function(err) {
  
        console.log(err);
  
        // fn_kakao_logout();
  
        return false;
  
      }
      
  
    });
    return console.log("good")
  }


  const failKakao = err => {
    console.error(err)
  }
  

    return(
      <>
        <h1 onClick={logIn}>
          로그인
        </h1>

        <h2 onClick={bringProfile}>
          정보가져오기
        </h2>

        <h2 onClick={toMSGForMe}>
          메세지 전송
        </h2>

        {/* <h1 onClick={this.navi}>
          <img
            src="https://developers.kakao.com/assets/img/about/buttons/navi/kakaonavi_btn_medium.png"
          />
         
        </h1> */}
        
        <h1 onClick={logOut}>
          로그아웃
        </h1>
        <h1 onClick={logOutExfire}>
          연결 해제
        </h1>

        
      </>
    )
  
  
  
}



export default login;
