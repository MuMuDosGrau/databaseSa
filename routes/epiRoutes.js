import express from 'express';
import { 
  cadastrarEPI, 
  listarEPI, 
  removerEPI, 
  cadastrarFuncionario, 
  listarFuncionario, 
  removerFuncionario, 
  registrarRetirada, 
  registrarDevolucao, 
  mostrarRetiradas, 
  mostrarDevolucoes, 
  exibirHistorico, 
  alterarEPI,
  alterarFuncionario
} from '../Controllers/Epi.js';

const router = express.Router();

router.post('/epi', cadastrarEPI);
router.get('/epi/listar', listarEPI);
router.put('/epi/:id', alterarEPI);
router.delete('/epi/:id', removerEPI); 

router.post('/funcionario', cadastrarFuncionario);
router.get('/funcionario/listar', listarFuncionario);
router.put('/funcionario/:id', alterarFuncionario);
router.delete('/funcionario/:id', removerFuncionario);

router.post('/historico/registrarRetirada', registrarRetirada);
router.post('/historico/registrarDevolucao', registrarDevolucao);

router.get('/historico/retiradas', mostrarRetiradas);
router.get('/historico/devolucoes', mostrarDevolucoes);
router.get('/historico', exibirHistorico);

export default router;
