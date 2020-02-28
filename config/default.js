module.exports = {
    serverPort: 8080,
    clientPort: 8080,
    "thrift": {
        "poolOptions": {
          "env": "prod",
          "localAppKey": "com.sankuai.movie.fe.lego",
          "timeout": 8000,
          "unified": true,
          "retry": {
            "retries": 0,
            "minTimeout": 3000,
            "maxTimeout": 10000,
            "randomize": false
          }
        },
        "servers": {
          "promotion": {
              "poolOptions": {
                  "remoteAppKey": "com.sankuai.promotioncenter.admin",
                  "serviceList": [{ "ip": "10.24.193.240", "port": 9950 }]
              },
              "serviceNamePrefix": "com.maoyan.promotion.export.service",
              "service": "TActivityAdminRemoteService"
          }
        }
      },
}