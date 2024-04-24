import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {

  //index
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['urlfoto', 'filename']
      }
    });
        res.json(alunos);
  }

  // store
  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      const { id, nome, sobrenome, email, idade, peso, altura } = novoAluno;
      return res.json({ id, nome, sobrenome, email, idade, peso, altura });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((erro) => erro.message)
      });
    }
  }

  // show
  async show(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          erros: ['Faltou ID do aluno para o show']
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['urlfoto', 'filename']
        }
      });

      if(!aluno) {
        return res.status(400).json({
          erros: ['Aluno não existe para o show']
        });
      }

      return res.json(aluno);

    } catch (e) {
      return res.status(400).json({
        erros: e.errors.map((err) => err.message)
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          erros: ['Faltou ID do aluno']
        });
      }

      const aluno = await Aluno.findByPk(id);

      if(!aluno) {
        return res.status(400).json({
          erros: ['Aluno não existe']
        });
      }

      await aluno.destroy();

      return res.json({
        apagado: true
      });

    } catch (e) {
      return res.status(400).json({
        erros: e.errors.map((err) => err.message)
      });
    }
  }

  // update
  async update(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          erros: ['Faltou ID do aluno']
        });
      }

      const aluno = await Aluno.findByPk(id);

      if(!aluno) {
        return res.status(400).json({
          erros: ['Aluno não existe']
        });
      }

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);

    } catch (e) {
      return res.status(400).json({
        erros: e.errors.map((err) => err.message)
      });
    }
  }

}

export default new AlunoController();
