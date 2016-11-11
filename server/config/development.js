'use strict';

module.exports = {
    mysql: "mysql://root:password@123@localhost/wedding_gram?reconnect=true",
    aws: {
        id: "AKIAIWKXTGYCOTZW6QYA",
        key: "xFOWIuR0hMbQvsodFa5VenHWwnNf3fDibyjMpZIb",
        url: "https://nus-stackup.s3.amazonaws.com",
        bucket: "nus-stackup",
        region: "ap-southeast-1"
    },
    port: 3000,
    seed: true,
    linkedin_key: "81xv9l7ppiocvz",
    Linkedin_secret: "LIhcEze930Dx5RmZ",
    Linkedin_callback_url: "http://localhost:3000/oauth/linkedin/callback",
    GooglePlus_key: "552301539640-morchf1e4ig6q7gtfje4fl7l35i99uiv.apps.googleusercontent.com",
    GooglePlus_secret: "JbU_KW4qhXGv8eS7_j8p7f-t",
    GooglePlus_callback_url: "http://localhost:3000/oauth/google/callback",
    Facebook_key: "1774952232780596",
    Facebook_secret: "bbd0cddf9a4605175f4d6fdfc951491e",
    Facebook_callback_url: "http://localhost:3000/oauth/facebook/callback",
    Twitter_key: "IsK3ZwAeez0hMD2Eo7GVjz8sm",
    Twitter_secret: "fiB5McI42sQxb6Q8aOYnlW2n2xSt5cgnLiVNcAlYyT7xCRhZXd",
    Twitter_callback_url: "http://localhost:3000/oauth/twitter/callback",
    Wechat_AppId: "1",
    Wechat_Name: "1",
    Wechat_AppSecret: "1",
    Wechat_Callback_Url: "http://localhost:3000/oauth/wechat/callback"
};
