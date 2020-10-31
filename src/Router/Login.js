import React from 'react'
import Kakao from 'kakaojs'

function Login() {

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
    Kakao.API.request({
    url: '/v2/api/talk/memo/default/send',
    data: {
        template_object: {
        object_type: 'feed',
        content: {
            title: '카카오톡 링크 4.0',
            description: '디폴트 템플릿 FEED',
            image_url:
            'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
            link: {
            web_url: 'https://developers.kakao.com',
            mobile_web_url: 'https://developers.kakao.com',
            },
        },
        social: {
            like_count: 100,
            comment_count: 200,
        },
        button_title: '바로 확인',
        },
    },
    success: function(response) {
        console.log(response);
    },
    fail: function(error) {
        console.log(error);
    }
    });
  };

//   kakaoAuth = ()=> {
//     Kakao.Auth.authorize({
//       redirectUri: 'http://localhost:3000/oauth',
//       throughTalk: true
      
//     });
//     console.log()
//   }
  

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

//   loginAuth = () => {
//     Kakao.Auth.authorize({
//       redirectUri: 'http://localhost:3000/oauth',
//       //한번 정보동의 및 회원가입하면 다음부터 별도의 동의없이 간편 로그인 기능임
//       throughTalk: true
//     });
//   }

  const logIn =() => {
    //카카오 로그인 시작
    Kakao.Auth.login({
      // scope: 'account_email,gender',
      throughTalk: true,
      success: function(response) {
          console.log(response);
      },
      fail: function(error) {
          console.log(error);
      }
  });
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
        
                <h1 onClick={navi}>
                  <img
                    src="https://developers.kakao.com/assets/img/about/buttons/navi/kakaonavi_btn_medium.png"
                  />
                  {/* 네비 */}
                </h1>
                
                <h1 onClick={logOut}>
                  로그아웃
                </h1>
                <h1 onClick={logOutExfire}>
                  연결 해제
                </h1>
              </>
            )
}

export default Login
