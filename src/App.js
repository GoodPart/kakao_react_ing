import React, { Component, setState } from 'react';
import KakaoLogin from 'react-kakao-login';
import Kakao from 'kakaojs'
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Main from './components/main'
import Login from './components/login'


class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      id: '',
      name : '',
      profileImg : ''
    }
  };

  bringProfile = () => {
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
  toMSGForMe = () => {
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

  kakaoAuth = ()=> {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/oauth',
      throughTalk: true
      
    });
    console.log()
  }
  

  logOut =() => {
    Kakao.Auth.logout(function(res) {
      console.log("logout", res)
    })
  }
  navi=()=> {
    Kakao.Navi.start({
      name: "현대백화점 판교점",
      x: 127.11205203011632,
      y: 37.39279717586919,
      coordType: 'wgs84'
  });
  }
  logOutExfire = () => {
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

  loginAuth = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/oauth',
      //한번 정보동의 및 회원가입하면 다음부터 별도의 동의없이 간편 로그인 기능임
      scope: 'account_email'
      // throughTalk: true
    });
  }

  logIn =() => {
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
  }


  failKakao = err => {
    console.error(err)
  }
  
  


  render() {
    return(
      <>

<Router>
      <div>
        <ul>

          <li>
            {/* <Link to="/">로그인</Link> */}
            <Link to="/main">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>

        {/* <h1 onClick={this.logIn}>
          로그인
        </h1>

        <h2 onClick={this.bringProfile}>
          정보가져오기
        </h2>

        <h2 onClick={this.toMSGForMe}>
          메세지 전송
        </h2>

        <h1 onClick={this.navi}>
          <img
            src="https://developers.kakao.com/assets/img/about/buttons/navi/kakaonavi_btn_medium.png"
          />
          
        </h1>
        
        <h1 onClick={this.logOut}>
          로그아웃
        </h1>
        <h1 onClick={this.logOutExfire}>
          연결 해제
        </h1> */}
          
          
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/main">
            <Main />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          
        </Switch>
      </div>
    </Router>
        {/* <KakaoLogin
        // jsKey ="fa6268b3473d1204cc1d4768c22761e3"
        buttonText = "Kakao"
        onSuccess={this.responseKakao}
        onFailure={this.failKakao}
        getProfile="true"
        /> */}

        
      </>
    )
  }
  
  
}



export default App;
