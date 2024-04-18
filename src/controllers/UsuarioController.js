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
      const usuarios = await Usuario.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(usuarios);
    } catch (e) {
      return res.json(null);
    }
  }

  // show
  async show(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      const { id, nome, email } = usuario;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // update
  async update(req, res) {
    try {

      const usuario = await Usuario.findByPk(req.usuarioId);

      if(!usuario) {
        return res.status(400).json({
          errors: ['Usuário não encontrado']
        });
      }

      const novosDadosUsuario = await usuario.update(req.body);
      const { id, nome, email } = novosDadosUsuario;
      return res.json({ id, nome, email });

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

      const usuario = await Usuario.findByPk(req.usuarioId);

      if(!usuario) {
        return res.status(400).json({
          errors: ['Usuário não encontrado']
        });
      }

    await usuario.destroy();

      return res.json(null);

    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((erro) => erro.message)
      });
    }
  }

}

export default new UsuarioController();
