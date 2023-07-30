module.exports = {
  devServer: {
    proxy: "http://192.168.0.17:80",
    public: '0.0.0.0:8080',
    hot: true,
    disableHostCheck: true,
    allowedHosts: [
      'localhost',
      'sifon-fronted.onrender.com',
    ],
  }
};
