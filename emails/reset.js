const keys = require("../keys");


module.exports=function(email, token){
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Востановлениу доступа",
        html: `
        <h1>Вы забыли пароль?</h1>
        <p>Если нет, то проигнорируйте даное письмо </p>
        <p>Иначе нажмите нв ссылку ниже  </p>
        <a href="${keys.BASE_URL}/auth/password/${token}">Востановить доступ</a>
        <hr/>
        <a href="${keys.BASE_URL}">Магазин курсов</a>
        `,
      };
}