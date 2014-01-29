module.export={
  'Login':function (test){
    test.open('http://localhost:3000/')
      .assert.title().is('Blog', 'It has title')
      .type('#username', 'oi')
      .type('#password', 'oi')
      .submit('.button')
      .wait(500)
      .screenshot('screenshot/login/ok.jpg')
      end()
      .done();
  }
}
