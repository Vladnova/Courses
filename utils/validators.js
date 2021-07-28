const {body, validationResult}=require('express-validator/check');



exports.registerValidators=[
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password', 'Пароль должен быть минимум 6 символов' ).isLength({min:6, max:56}).isAlphanumeric(),
    body('name').isLength({min:3}).withMessage('Имя должно быть минимум 3 символа'),
    body('confirm').custom((value, {req})=>{
        if(value!==req.body.password){
            throw new Error('Пароли должны совпадать ')
        }
        return true;
    })
]