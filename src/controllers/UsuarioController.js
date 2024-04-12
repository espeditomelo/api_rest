import Usuario from '../models/Usuario';

class UsuarioController {

  async store(req, res) {

    try {
      const novoUsuario = await Usuario.create(req.body);

      const { id, nome, email } = novoUsuario;

      return res.json( {id, nome, email} );


    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((erro) => erro.message)
      });
    };

  }
}

export default new UsuarioController();
