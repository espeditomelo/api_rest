import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {

    const novoAluno = await Aluno.create({
      nome: 'Maria',
      sobrenome: 'José',
      email: 'mj@gmail.com',
      idade: 59,
      peso: 76,
      altura: 1.67
    });

    res.json({
      novoAluno
    });
  }
}

export default new HomeController();
