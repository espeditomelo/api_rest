import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';

class TokenController {
  async store(req, res) {
    const { email = '', password = ''} = req.body;

    if(!email || !password) {
      return res.status(401).json({
        erros: ['Credenciais inválidas']
      });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if(!usuario) {
      return res.status(401).json({
        erros: ['Usuário não existe']
      });
    }


    if(!(await usuario.isPasswordValid(password))){
      return res.status(401).json({
        erros: ['Senha inválida']
      });
    }

    const { id } = usuario;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    });

    return res.json({ token });
  }
}

export default new TokenController();
