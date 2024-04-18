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

  // index
  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      console.log('usuarioId', req.usuarioId);
      console.log('usuarioEmail', req.usuarioEmail);
      return res.json(usuarios);
    } catch (e) {
      return res.json(null);
    }
  }

  // show
  async show(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      return res.json(usuario);
    } catch (e) {
      return res.json(null);
    }
  }

  // update
  async update(req, res) {
    try {

      if(!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado']
        });
      }

      const usuario = await Usuario.findByPk(req.params.id);

      if(!usuario) {
        return res.status(400).json({
          errors: ['Usuário não encontrado']
        });
      }

      const novosDadosUsuario = await usuario.update(req.body);

      return res.json(novosDadosUsuario);

    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((erro) => erro.message)
      });
    }
  }

  // delete
  async delete(req, res) {
    try {

      if(!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado']
        });
      }

      const usuario = await Usuario.findByPk(req.params.id);

      if(!usuario) {
        return res.status(400).json({
          errors: ['Usuário não encontrado']
        });
      }

    await usuario.destroy();

      return res.json(usuario);

    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((erro) => erro.message)
      });
    }
  }

}

export default new UsuarioController();
