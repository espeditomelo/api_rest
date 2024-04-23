import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');


class FotoController {
  // talvez tenha que remover esse async
  async store(req, res) {
    return upload(req, res, async (error) => {
      if(error) {
        return res.status(400).json({
          erros: [error.code]
        });
      }

      const { originalname, filename } = req.file;
      const { aluno_id } = req.body;
      const foto = await Foto.create({ originalname, filename, aluno_id });

      return res.json(foto);
    });
  }
}

export default new FotoController();
