import React, { Component } from 'react';
import KakaoLogin from 'react-kakao-login';
import Kakao from 'kakaojs'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      id: '',
      name : '',
      provider: ''
    }
  };

  responseKakao = res => {
    this.setState({
      id: res,
      name: res
    })
    console.log('responseData',res)
  }
  

  logOut =() => {
    Kakao.Auth.logout(function(res) {
      console.log("logout", res)
    })
  }

  logIn =() => {
    Kakao.Auth.login({

      success :function(response) {
        console.log("res", response)
  
        // Kakao.Auth.getStatus(function(response){
  
        //   console.log("state : " +response);
  
        //   if(response.status === "connected"){
  
        //     Kakao.API.request({
  
        //       url:'/v2/user/me',
  
        //       success : function(respose) {
  
        //         var data= {
  
        //             user_id : response.user.id.toString(),
  
        //             type : "K"
  
        //         }
  
        //         // fn_login(data);
  
        //         // fn_kakao_logout();
  
        //       },
  
        //       fail : function(err) {
  
        //         console.log(err);
  
        //         return false;
  
        //       }
  
        //     });
  
        //   }
  
        // });
  
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
        {/* <KakaoLogin
        // jsKey ="fa6268b3473d1204cc1d4768c22761e3"
        buttonText = "Kakao"
        onSuccess={this.responseKakao}
        onFailure={this.failKakao}
        getProfile="true"
        /> */}

        <h1 onClick={this.logIn}>
          로그인
        </h1>
        

        <h1 onClick={this.logOut}>
          로그아웃
        </h1>
      </>
    )
  }
  
  
}



export default App;
